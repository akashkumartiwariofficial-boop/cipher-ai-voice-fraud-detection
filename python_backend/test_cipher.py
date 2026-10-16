"""
CIPHER Test Suite: Validating Models, Scoring Bounds, Encryption, RBAC, and PII
"""

import pytest
import time
from cipher_core import (
    CipherScoringEngine,
    CallMetadata,
    TelephonySignals,
    RiskTier
)
from security import (
    MultiLayerEncryption,
    PIIMinimizer,
    ImmutableAuditLogger,
    UserRole,
    SecurityContext
)
from alerts import ThreatAlertEngine, AlertSeverity
from banking_bridge import BankingSecurityBridge, BankingTransactionRequest


def test_scoring_bounds():
    """Verify that scoring engine strictly produces scores between 0 and 100."""
    engine = CipherScoringEngine()
    dummy_audio = b"\x00\x10" * 4000
    meta = CallMetadata("CALL-01", "SESS-01", "+14155550198", "+18005550199", "Sprint", "US")
    tel = TelephonySignals(jitter_ms=5.0, packet_loss_pct=0.1, stir_shaken_attestation="A")

    res = engine.process_call(dummy_audio, meta, tel)
    assert 0.0 <= res.fraud_score <= 100.0
    assert res.risk_tier in [RiskTier.LOW_RISK, RiskTier.SUSPICIOUS, RiskTier.HIGH_RISK, RiskTier.CRITICAL_FRAUD]
    assert len(res.cryptographic_digest) == 64


def test_encryption_roundtrip():
    """Verify AES-256 authenticated encryption and decryption."""
    crypto = MultiLayerEncryption()
    secret_text = "CONFIDENTIAL_VOICE_BIOMETRIC_DATA_HASH"
    envelope = crypto.encrypt_data(secret_text)
    
    assert envelope["cipher_algorithm"] == "AES-256-GCM"
    decrypted = crypto.decrypt_data(envelope)
    assert decrypted == secret_text


def test_pii_masking():
    """Verify E.164 phone number sanitization."""
    raw_phone = "+14155552671"
    masked = PIIMinimizer.mask_phone_number(raw_phone)
    assert masked == "+1 (415) ***-2671"
    assert "555" not in masked


def test_audit_integrity():
    """Verify SHA-256 immutable block chain detects no tampering."""
    logger = ImmutableAuditLogger()
    logger.log_event("TEST_EVENT_1", "analyst_1", UserRole.FRAUD_ANALYST, {"data": 123})
    logger.log_event("TEST_EVENT_2", "analyst_2", UserRole.SUPER_ADMIN, {"data": 456})
    
    is_valid, _ = logger.verify_integrity()
    assert is_valid is True


def test_rbac_enforcement():
    """Verify role permissions block unauthorized operations."""
    analyst_context = SecurityContext(actor="analyst", role=UserRole.FRAUD_ANALYST)
    analyst_context.enforce_permission("stream:verify")  # should pass

    with pytest.raises(PermissionError):
        analyst_context.enforce_permission("keys:rotate")  # should raise
