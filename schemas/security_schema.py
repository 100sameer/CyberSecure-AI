"""
Pydantic Schemas for CyberSecure AI Output Validation & API Interfaces.
Guarantees strict schema output for security analysis responses.
"""

from typing import List, Optional
from pydantic import BaseModel, Field

class SecurityResponse(BaseModel):
    """Output Schema for Grounded Security Analysis."""
    executive_summary: str = Field(..., description="Executive summary for C-level leadership.")
    threat_analysis: str = Field(..., description="Technical breakdown of threat vectors and mechanics.")
    risk_level: str = Field(..., description="Risk level rating: CRITICAL | HIGH | MEDIUM | LOW | INFORMATIONAL")
    business_impact: str = Field(..., description="Potential operational, compliance, or financial impact.")
    mitigation: str = Field(..., description="Immediate technical containment and mitigation steps.")
    recommendations: str = Field(..., description="Long-term architectural and preventative recommendations.")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score percentage (0-100).")
    owasp_mapping: Optional[str] = Field("N/A", description="OWASP Top 10 Mapping")
    mitre_mapping: Optional[str] = Field("N/A", description="MITRE ATT&CK Mapping")
    references: List[str] = Field(default_factory=list, description="Source documents or CVE references.")

class QueryRequest(BaseModel):
    """User query request body for API endpoint."""
    query: str
    model_provider: str = Field("gemini", description="groq | gemini")
    model_name: str = Field("gemini-3.6-flash", description="Specific model ID")
    temperature: float = Field(0.2, ge=0.0, le=1.0)
    top_k_chunks: int = Field(5, ge=1, le=15)

class CVEInfo(BaseModel):
    """CVE Threat Intelligence model."""
    cve_id: str
    cvss_score: float
    severity: str
    summary: str
    vendor_advisory: str
    mitre_technique: str
