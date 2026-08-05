"""
Unit & Integration Tests for LangGraph Multi-Agent Workflow.
"""

import pytest
from agents.planner import PlannerAgent
from agents.validator import ValidatorAgent
from graph.workflow import CyberSecureWorkflow

def test_planner_agent():
    planner = PlannerAgent()
    plan = planner.plan("Assess Log4j vulnerability impact")
    assert "intent" in plan
    assert len(plan["steps"]) >= 4

def test_validator_agent():
    validator = ValidatorAgent()
    draft = {
        "executive_summary": "Log4j RCE vulnerability detected.",
        "risk_level": "CRITICAL",
        "confidence": 90
    }
    context = "Apache Log4j2 JNDI features allow RCE via user supplied input."
    res = validator.validate("Log4j assessment", context, draft)
    assert res["is_valid"] is True
    assert res["confidence_score"] > 80

def test_workflow_execution():
    workflow = CyberSecureWorkflow()
    result = workflow.run("Firewall rules audit for PCI DSS")
    assert result["current_step"] == "END"
    assert "validated_response" in result
