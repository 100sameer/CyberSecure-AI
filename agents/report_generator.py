"""
Report Generator Agent for CyberSecure AI.
Converts structured security analysis into formal downloadable PDF security assessments.
"""

from typing import Dict, Any
from utils.report import generate_pdf_report
from utils.logger import logger

class ReportGeneratorAgent:
    def __init__(self):
        pass

    def generate_pdf(self, query: str, validated_data: Dict[str, Any]) -> str:
        """Compile security analysis into executive PDF report."""
        logger.info("[Report Generator Agent] Compiling ReportLab PDF document...")

        pdf_path = generate_pdf_report(
            title="Enterprise SOC Security Assessment",
            query=query,
            exec_summary=validated_data.get("executive_summary", "Summary not provided."),
            threat_analysis=validated_data.get("threat_analysis", "Analysis not provided."),
            risk_level=validated_data.get("risk_level", "HIGH"),
            business_impact=validated_data.get("business_impact", "Impact not provided."),
            mitigation=validated_data.get("mitigation", "Mitigation not provided."),
            recommendations=validated_data.get("recommendations", "Recommendations not provided."),
            confidence_score=validated_data.get("confidence", 85),
            owasp_mapping=validated_data.get("owasp_mapping", "N/A"),
            mitre_mapping=validated_data.get("mitre_mapping", "N/A"),
            references=validated_data.get("references", [])
        )

        return pdf_path
