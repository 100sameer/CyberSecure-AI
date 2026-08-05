"""
Helper utilities for CyberSecure AI.
Handles text sanitation, chunking formatting, risk badge colors, CVE lookups, and environment setup.
"""

import os
import re
from typing import Dict, Any, List

def sanitize_filename(filename: str) -> str:
    """Sanitize uploaded PDF filenames to prevent path traversal."""
    return re.sub(r'[^a-zA-Z0-9_\.-]', '_', filename)

def extract_cves_from_text(text: str) -> List[str]:
    """Extract CVE pattern matches (CVE-YYYY-NNNN) from input text."""
    pattern = r'CVE-\d{4}-\d{4,7}'
    matches = re.findall(pattern, text, re.IGNORECASE)
    return list(set([m.upper() for m in matches]))

def get_risk_color(risk_level: str) -> str:
    """Return hex color code for given security risk level."""
    level = risk_level.upper()
    colors = {
        "CRITICAL": "#EF4444",   # Red
        "HIGH": "#F97316",       # Orange
        "MEDIUM": "#F59E0B",     # Amber
        "LOW": "#10B981",        # Emerald
        "INFORMATIONAL": "#3B82F6" # Blue
    }
    return colors.get(level, "#6B7280")

def format_doc_metadata(doc_name: str, page: int, score: float) -> str:
    """Format citation metadata string for UI display."""
    return f"📄 {doc_name} (Page {page}) • Relevance: {round(score * 100, 1)}%"
