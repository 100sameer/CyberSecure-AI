export type RiskLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFORMATIONAL";

export type ModelProvider = "gemini" | "groq";

export interface SecurityAnalysis {
  executive_summary: string;
  threat_analysis: string;
  risk_level: RiskLevel;
  business_impact: string;
  mitigation: string;
  recommendations: string;
  confidence: number;
  owasp_mapping: string;
  mitre_mapping: string;
  references: string[];
}

export interface GroundedSource {
  document: string;
  page: number;
  relevance_score: number;
  chunk: string;
}

export interface AgentStep {
  name: string;
  action: string;
  status: "pending" | "running" | "completed" | "error";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  analysis?: SecurityAnalysis;
  sources?: GroundedSource[];
  agentSteps?: AgentStep[];
  providerUsed?: ModelProvider;
}

export interface CVEItem {
  cve_id: string;
  name: string;
  cvss_score: number;
  severity: RiskLevel;
  vector: string;
  summary: string;
  affected_systems: string[];
  mitre_technique: string;
  remediation: string;
}

export interface VectorDoc {
  id: string;
  filename: string;
  page: number;
  text: string;
  source: string;
}

export interface SystemStats {
  total_chunks: number;
  total_documents: number;
  documents: string[];
  storage_type: string;
}
