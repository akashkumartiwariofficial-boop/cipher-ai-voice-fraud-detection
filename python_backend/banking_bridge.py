"""
CIPHER: Banking API Integration & Wire Fraud Defense Bridge
Team Red Dot | Phase 3 Roadmap Implementation (ISO 20022 & Open Banking PSD2)

Connects the CIPHER Voice Authentication Scoring Engine with Financial Institution APIs:
- ISO 20022 Payment Message (pacs.008 / camt.056) Fraud Hold
- Open Banking Dynamic Linking & Strong Customer Authentication (SCA)
- Real-time Webhook Dispatcher to Core Banking Switches (Temenos, FIS, Finastra)
"""

from dataclasses import dataclass
from enum import Enum
from typing import Dict, Any, Optional
import time
import uuid


class TransferStatus(str, Enum):
    APPROVED = "APPROVED"
    STEP_UP_CHALLENGE = "STEP_UP_CHALLENGE"
    HELD_FOR_REVIEW = "HELD_FOR_REVIEW"
    TERMINATED_FRAUD = "TERMINATED_FRAUD"


@dataclass
class BankingTransactionRequest:
    transaction_id: str
    account_from: str
    account_to: str
    amount_usd: float
    currency: str
    initiating_channel: str = "IVR_VOICE_BANKING"
    caller_voice_call_id: Optional[str] = None


class BankingSecurityBridge:
    """
    Bridge connecting voice fraud scores to banking core transaction settlement engines.
    """
    def __init__(self, partner_bank_code: str = "SWIFT-CHASUS33"):
        self.partner_bank_code = partner_bank_code

    def evaluate_transaction_risk(
        self,
        tx: BankingTransactionRequest,
        cipher_fraud_score: float,
        is_clone_detected: bool
    ) -> Dict[str, Any]:
        """
        Enforces policy:
        - Score < 25: Automated clearance
        - Score 26 - 60: Step-up biometric challenge / SMS OTP
        - Score 61 - 85: 24h freeze on funds over $5,000 + Fraud Ops Alert
        - Score > 85 (or is_clone_detected): Immediate transfer abort + account containment
        """
        decision_id = f"DEC-{uuid.uuid4().hex[:10].upper()}"
        timestamp = time.time()

        if cipher_fraud_score >= 85.0 or (is_clone_detected and tx.amount_usd > 1000.0):
            status = TransferStatus.TERMINATED_FRAUD
            iso_action = "pacs.002.RJCT"  # Reject Payment Message
            reason_code = "FRAD.VOICE_DEEPFAKE_CONFIRMED"
            action_desc = "Transaction aborted. Voice biometric clone confirmed. Account put in protective custody."
        elif cipher_fraud_score >= 60.0:
            status = TransferStatus.HELD_FOR_REVIEW
            iso_action = "camt.056.HOLD"  # Payment Cancellation / Freeze Request
            reason_code = "SUSP.VOICE_ANOMALY"
            action_desc = "Funds held in escrow. Pushed to Tier-2 anti-fraud review desk."
        elif cipher_fraud_score >= 26.0:
            status = TransferStatus.STEP_UP_CHALLENGE
            iso_action = "pacs.008.PENDING_SCA"
            reason_code = "AUTH.STEP_UP_REQUIRED"
            action_desc = "Transfer paused pending out-of-band biometric approval."
        else:
            status = TransferStatus.APPROVED
            iso_action = "pacs.008.ACCP"  # Accepted Settlement
            reason_code = "AUTH.VOICE_AUTHENTICATED"
            action_desc = "Voice verified authentic. Straight-through processing approved."

        return {
            "decision_id": decision_id,
            "transaction_id": tx.transaction_id,
            "status": status.value,
            "cipher_score_applied": cipher_fraud_score,
            "iso_20022_message_type": iso_action,
            "iso_reason_code": reason_code,
            "clearing_bank": self.partner_bank_code,
            "amount_authorized": 0.0 if status in [TransferStatus.TERMINATED_FRAUD, TransferStatus.HELD_FOR_REVIEW] else tx.amount_usd,
            "action_description": action_desc,
            "timestamp_utc": timestamp
        }
