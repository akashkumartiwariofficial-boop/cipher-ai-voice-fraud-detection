"""
CIPHER: Automated Threat Alert & Incident Mitigation Dispatcher
Team Red Dot | Real-Time Threat Notification Engine

Features:
- Instant multi-channel alert dispatching to SecOps, Fraud Triage, and Telecom Gateways
- Automated mitigation triggers (SIP BYE call drops, ISO 20022 wire freezes, Step-Up MFA)
- Real-time subscriber queues and forensic event streaming
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional, Callable, Any
import time
import uuid


class AlertSeverity(str, Enum):
    INFO = "INFO"
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AutomatedActionType(str, Enum):
    SIP_BYE_CALL_DROP = "SIP_BYE_CALL_DROP"                  # Drops the SIP trunk session immediately
    STEP_UP_MFA = "STEP_UP_MFA"                              # Challenges caller with push token / hardware key
    BANKING_WIRE_FREEZE = "BANKING_WIRE_FREEZE"              # Places pending transactions on hold via PSD2 API
    ANALYST_ESCALATION = "ANALYST_ESCALATION"                # Pushes priority ticket to Fraud Operations Center
    PASSIVE_RECORDING_FLAG = "PASSIVE_RECORDING_FLAG"        # Tags stream for forensic legal archive


@dataclass
class ThreatAlert:
    alert_id: str
    call_id: str
    timestamp_utc: float
    severity: AlertSeverity
    fraud_score: float
    trigger_reason: str
    caller_masked: str
    telephony_route: str
    automated_actions: List[AutomatedActionType]
    stakeholder_notified: List[str]
    acknowledged: bool = False
    acknowledged_by: Optional[str] = None
    investigation_notes: Optional[str] = None


class ThreatAlertEngine:
    """
    Automated threat detection and real-time dispatcher.
    Dispatches alerts in sub-5ms to prevent wire fraud while call is in progress.
    """
    def __init__(self):
        self.active_alerts: List[ThreatAlert] = []
        self.subscribers: List[Callable[[ThreatAlert], None]] = []

    def register_subscriber(self, callback: Callable[[ThreatAlert], None]):
        self.subscribers.append(callback)

    def evaluate_and_dispatch(
        self,
        call_id: str,
        fraud_score: float,
        explainability: List[str],
        caller_masked: str,
        telephony_route: str,
        stir_shaken_fail: bool = False
    ) -> Optional[ThreatAlert]:
        """
        Evaluates fraud score against thresholds and triggers instant alerts and actions.
        """
        if fraud_score < 30.0 and not stir_shaken_fail:
            return None

        # Determine severity
        if fraud_score >= 85.0 or (fraud_score >= 70.0 and stir_shaken_fail):
            severity = AlertSeverity.CRITICAL
            actions = [
                AutomatedActionType.SIP_BYE_CALL_DROP,
                AutomatedActionType.BANKING_WIRE_FREEZE,
                AutomatedActionType.ANALYST_ESCALATION
            ]
            stakeholders = ["SecOps_PagerDuty", "Fraud_Swat_Team", "Telecom_SBC_Gateway", "Core_Banking_Switch"]
        elif fraud_score >= 60.0:
            severity = AlertSeverity.HIGH
            actions = [
                AutomatedActionType.STEP_UP_MFA,
                AutomatedActionType.BANKING_WIRE_FREEZE,
                AutomatedActionType.ANALYST_ESCALATION
            ]
            stakeholders = ["Fraud_Ops_Queue", "Call_Center_Supervisor"]
        else:
            severity = AlertSeverity.MEDIUM
            actions = [
                AutomatedActionType.STEP_UP_MFA,
                AutomatedActionType.PASSIVE_RECORDING_FLAG
            ]
            stakeholders = ["Monitoring_Dashboard"]

        alert = ThreatAlert(
            alert_id=f"ALT-{uuid.uuid4().hex[:8].upper()}",
            call_id=call_id,
            timestamp_utc=time.time(),
            severity=severity,
            fraud_score=fraud_score,
            trigger_reason="; ".join(explainability[:2]),
            caller_masked=caller_masked,
            telephony_route=telephony_route,
            automated_actions=actions,
            stakeholder_notified=stakeholders
        )

        self.active_alerts.insert(0, alert)
        # Notify connected WebSocket or webhook listeners
        for sub in self.subscribers:
            try:
                sub(alert)
            except Exception:
                pass

        return alert

    def acknowledge_alert(self, alert_id: str, actor: str, notes: str) -> bool:
        for alert in self.active_alerts:
            if alert.alert_id == alert_id:
                alert.acknowledged = True
                alert.acknowledged_by = actor
                alert.investigation_notes = notes
                return True
        return False
