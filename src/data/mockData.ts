import { CVEItem } from "../types";

export const INITIAL_CVES: CVEItem[] = [
  {
    cve_id: "CVE-2021-44228",
    name: "Log4Shell - Apache Log4j RCE",
    cvss_score: 10.0,
    severity: "CRITICAL",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    summary: "Apache Log4j2 JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP endpoints.",
    affected_systems: ["Log4j2 <= 2.14.1", "Spring Boot", "Elasticsearch", "Solr"],
    mitre_technique: "T1190 - Exploit Public-Facing Application",
    remediation: "Upgrade Log4j to version 2.17.1+ or set system property log4j2.formatMsgNoLookups=true."
  },
  {
    cve_id: "CVE-2023-34362",
    name: "MOVEit Transfer Unauthenticated SQLi",
    cvss_score: 9.8,
    severity: "CRITICAL",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary: "SQL injection vulnerability in Progress MOVEit Transfer web application allowing unauthenticated remote attackers to execute database commands.",
    affected_systems: ["MOVEit Transfer < 2023.0.1"],
    mitre_technique: "T1190 - Exploit Public-Facing Application",
    remediation: "Apply official Progress hotfix immediately and review web server logs for human2.aspx uploads."
  },
  {
    cve_id: "CVE-2024-21626",
    name: "Leaky Vessels - runc Container Escape",
    cvss_score: 8.6,
    severity: "HIGH",
    vector: "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    summary: "Internal file descriptor leak in runc allows malicious containers to access the underlying host filesystem.",
    affected_systems: ["runc <= 1.1.11", "Docker Engine", "Kubernetes"],
    mitre_technique: "T1611 - Escape to Host",
    remediation: "Update container runtime package runc to 1.1.12 or newer."
  },
  {
    cve_id: "CVE-2023-4863",
    name: "WebP Heap Buffer Overflow",
    cvss_score: 8.8,
    severity: "HIGH",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H",
    summary: "Heap buffer overflow in libwebp allowing remote attackers to perform arbitrary code execution via crafted WebP images.",
    affected_systems: ["Google Chrome", "Mozilla Firefox", "Electron Apps"],
    mitre_technique: "T1203 - Exploitation for Client Execution",
    remediation: "Upgrade libwebp to 1.3.2+ across all client workstations and web renderers."
  }
];

export const MOCK_INCIDENT_ALERTS = [
  { id: "ALT-8021", time: "2 min ago", title: "Anomalous Outbound SSH Traffic", source: "Perimeter WAF", level: "HIGH" },
  { id: "ALT-8020", time: "14 min ago", title: "Failed Admin Root Authentication Spike", source: "Identity IAM", level: "MEDIUM" },
  { id: "ALT-8019", time: "38 min ago", title: "K8s Pod Security Context Violation", source: "Falco SIEM", level: "HIGH" },
  { id: "ALT-8018", time: "1 hr ago", title: "Unsanitized SQL Input Detected", source: "API Gateway", level: "CRITICAL" }
];
