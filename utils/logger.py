"""
Enterprise Structured Logger for CyberSecure AI
Logs security actions, model invocations, RAG lookups, and errors with ISO timestamps.
"""

import logging
import sys
import os
from datetime import datetime

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "cybersecure_ai.log")

logger = logging.getLogger("CyberSecureAI")
logger.setLevel(logging.INFO)

formatter = logging.Formatter(
    '[%(asctime)s] [%(levelname)s] [%(name)s] [%(filename)s:%(lineno)d] - %(message)s'
)

# Console Handler
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# File Handler
file_handler = logging.FileHandler(LOG_FILE)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

def log_security_event(event_type: str, details: str, risk_level: str = "INFO"):
    """Log structured SOC security events."""
    logger.info(f"[SOC EVENT] [{event_type}] [Risk: {risk_level}] - {details}")

def log_error(context: str, error: Exception):
    """Log detailed exception stack with context."""
    logger.error(f"[ERROR in {context}] - {type(error).__name__}: {str(error)}")
