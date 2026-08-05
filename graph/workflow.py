"""
LangGraph Workflow Engine for CyberSecure AI Multi-Agent Pipeline.
Orchestrates: START -> Planner -> Retriever -> Threat Intel -> LLM Generation -> Validator -> Report Generator -> END.
"""

from typing import Dict, Any, TypedDict, List
from agents.planner import PlannerAgent
from rag.retriever import SecurityRetriever
from agents.validator import ValidatorAgent
from agents.report_generator import ReportGeneratorAgent
from utils.logger import logger

class AgentState(TypedDict):
    query: str
    model_provider: str
    plan: Dict[str, Any]
    retrieved_context: str
    sources: List[Dict[str, Any]]
    cve_data: List[Dict[str, Any]]
    draft_response: Dict[str, Any]
    validated_response: Dict[str, Any]
    pdf_report_path: str
    current_step: str

class CyberSecureWorkflow:
    def __init__(self, retriever: SecurityRetriever = None):
        self.planner = PlannerAgent()
        self.retriever = retriever or SecurityRetriever()
        self.validator = ValidatorAgent()
        self.report_generator = ReportGeneratorAgent()

    def run(self, query: str, model_provider: str = "gemini", custom_llm_handler=None) -> Dict[str, Any]:
        """Execute the complete multi-agent workflow sequentially."""
        logger.info(f"=== Starting CyberSecure Multi-Agent Pipeline for Query: '{query}' ===")

        # State initialization
        state: AgentState = {
            "query": query,
            "model_provider": model_provider,
            "plan": {},
            "retrieved_context": "",
            "sources": [],
            "cve_data": [],
            "draft_response": {},
            "validated_response": {},
            "pdf_report_path": "",
            "current_step": "START"
        }

        # Step 1: Planner Agent
        state["current_step"] = "PLANNER"
        state["plan"] = self.planner.plan(query)

        # Step 2: Retriever Agent
        state["current_step"] = "RETRIEVER"
        retrieval = self.retriever.retrieve_grounded_context(query)
        state["retrieved_context"] = retrieval["formatted_context"]
        state["sources"] = retrieval["sources"]

        # Step 3: Threat Intelligence Lookup
        state["current_step"] = "THREAT_INTEL"
        # Mock/live threat lookup if CVE mentioned
        if "cve" in query.lower() or "log4j" in query.lower() or "spring4shell" in query.lower():
            state["cve_data"] = [{
                "cve_id": "CVE-2021-44228",
                "cvss": 10.0,
                "severity": "CRITICAL",
                "summary": "Log4j RCE vulnerability in Apache Log4j2 JNDI feature.",
                "mitre": "T1190 Exploit Public-Facing Application"
            }]

        # Step 4: LLM Generation
        state["current_step"] = "LLM_GENERATION"
        if custom_llm_handler:
            state["draft_response"] = custom_llm_handler(query, state["retrieved_context"])
        else:
            state["draft_response"] = self._default_mock_llm(query, state["retrieved_context"])

        # Step 5: Validator Agent
        state["current_step"] = "VALIDATOR"
        val_res = self.validator.validate(query, state["retrieved_context"], state["draft_response"])
        state["validated_response"] = val_res["validated_response"]

        # Step 6: Security Report Generator
        state["current_step"] = "REPORT_GENERATOR"
        try:
            state["pdf_report_path"] = self.report_generator.generate_pdf(query, state["validated_response"])
        except Exception as e:
            logger.error(f"PDF generation error in workflow: {e}")
            state["pdf_report_path"] = ""

        state["current_step"] = "END"
        logger.info("=== Multi-Agent Pipeline Completed Successfully ===")
        return state

    def _default_mock_llm(self, query: str, context: str) -> Dict[str, Any]:
        return {
            "executive_summary": f"Security review completed for request: {query}. Grounded context analyzed.",
            "threat_analysis": f"Detailed vulnerability Mechanics identified in retrieved policies. Context preview: {context[:300]}...",
            "risk_level": "HIGH",
            "business_impact": "Potential unauthorized data access, service disruption, or regulatory audit non-compliance.",
            "mitigation": "1. Isolate affected subnet.\n2. Apply zero-day patch advisory.\n3. Update firewall ingress rules.",
            "recommendations": "1. Implement multi-factor authentication across admin endpoints.\n2. Enable EDR telemetry monitoring.",
            "confidence": 88,
            "owasp_mapping": "A06:2021-Vulnerable and Outdated Components",
            "mitre_mapping": "T1190 Exploit Public-Facing Application",
            "references": ["SOC-Playbook-2025.pdf", "NIST-SP-800-53-R5.pdf"]
        }
