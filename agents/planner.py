"""
Planner Agent for CyberSecure AI.
Decomposes complex security queries into structured sub-tasks for Retriever and Threat Intel agents.
"""

import json
from typing import Dict, Any
from utils.logger import logger
from prompts.prompts import PLANNER_PROMPT

class PlannerAgent:
    def __init__(self, llm_client=None):
        self.llm_client = llm_client

    def plan(self, query: str, context_summary: str = "") -> Dict[str, Any]:
        """Generate structured sub-tasks for security analysis."""
        logger.info(f"[Planner Agent] Planning sub-tasks for query: '{query[:40]}...'")
        
        # Rule-based fallback if LLM client is offline
        plan_data = {
            "intent": "vulnerability_assessment" if "vuln" in query.lower() or "cve" in query.lower() else "general_secops",
            "document_search_queries": [
                query,
                f"security risk mitigation for {query}",
                f"compliance framework requirements {query}"
            ],
            "cve_lookups": [],
            "key_frameworks": ["OWASP Top 10", "NIST SP 800-53", "MITRE ATT&CK"],
            "steps": [
                "1. Planner: Formulate search keywords and identify target frameworks.",
                "2. Retriever: Perform vector similarity search across ChromaDB knowledge base.",
                "3. Threat Intel: Query vulnerability registries and CVSS metrics.",
                "4. LLM Generation: Formulate structured SOC security response.",
                "5. Validator: Perform factuality check and OWASP/MITRE mapping review."
            ]
        }

        return plan_data
