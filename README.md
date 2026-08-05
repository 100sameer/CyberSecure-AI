# 🛡️ CyberSecure AI - Enterprise Multi-Agent Cyber Security Assistant

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/Python-3.11%2B-green.svg)](https://python.org)
[![LangGraph](https://img.shields.io/badge/Agentic-LangGraph-orange.svg)](https://langchain.com)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-cyan.svg)](Dockerfile)

**CyberSecure AI** is a production-ready, enterprise-grade AI Cyber Security Assistant designed for Security Operations Centers (SOC), incident response teams, penetration testers, and compliance officers. It enables security teams to ingest vulnerability reports, audit documents, firewall logs, and security policies, then perform grounded AI analysis using an intelligent Retrieval-Augmented Generation (RAG) system powered by multi-agent workflows.

---

## 🏗️ Architecture Diagram

```
+-------------------------------------------------------------------------------+
|                             CyberSecure AI System                             |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ User / SOC Analyst ]                                                       |
|           |                                                                   |
|           v                                                                   |
|  [ Enterprise Dashboard UI (React/Streamlit) ]                               |
|           |                                                                   |
|           v                                                                   |
|  [ REST API Layer (FastAPI / Express Node) ]                                   |
|           |                                                                   |
|           +---> [ Multi-Agent LangGraph Pipeline ]                            |
|                       |                                                       |
|                       +--> 1. Planner Agent (Query decomposition)             |
|                       +--> 2. Retriever Agent (ChromaDB Vector Store)        |
|                       +--> 3. Threat Intel Agent (CVE / CVSS Lookup)         |
|                       +--> 4. LLM Generation (Gemini 3.6 / Groq Llama 3.3)   |
|                       +--> 5. Validator Agent (Hallucination audit)          |
|                       +--> 6. Report Generator (ReportLab PDF)                |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## ⚡ Key Features

- **Multi-Agent LangGraph Workflow**: Autonomous cooperation between Planner, Retriever, Threat Intel, Validator, and Report Generator agents.
- **Grounded RAG Pipeline**: Uses ChromaDB persistent vector storage with chunking (800 chars, 150 overlap) and `sentence-transformers/all-MiniLM-L6-v2`.
- **Dual AI Provider Support**: Switch effortlessly between **Google Gemini** (Gemini 3.6 Flash / 3.1 Pro) and **Groq** (Llama 3.3 70B).
- **Executive Security PDF Reports**: One-click download of formal SOC Security Reports formatted with ReportLab.
- **OWASP & MITRE ATT&CK Mapping**: Automatic categorization of security findings against OWASP Top 10 and MITRE ATT&CK tactics & techniques.
- **CVE & Threat Intelligence Hub**: Look up CVSS scores, vulnerability mechanics, and vendor advisories.
- **SOC Enterprise Dashboard**: Live metrics, risk level gauges, recent incident logs, and interactive agent execution visualizer.

---

## 📂 Folder Structure

```
CyberSecureAI/
├── app.py                     # Streamlit frontend entry point
├── server.ts                  # Express server for Node runtime & Gemini proxy
├── requirements.txt           # Python dependencies
├── README.md                  # Technical documentation
├── Dockerfile                 # Container build file
├── docker-compose.yml         # Container orchestrator configuration
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore paths
├── assets/                    # Visual assets and logos
├── uploaded_docs/             # Storage for uploaded security PDFs
├── vector_db/                 # ChromaDB persistent store directory
├── reports/                   # Output folder for generated PDF reports
├── prompts/
│   └── prompts.py             # System prompts and agent templates
├── utils/
│   ├── helper.py              # Sanitation and formatting helpers
│   ├── report.py              # ReportLab PDF report builder
│   └── logger.py              # Structured SOC logger
├── loaders/
│   └── pdf_loader.py          # PyMuPDF document extraction & chunker
├── rag/
│   ├── embeddings.py          # Sentence-transformers embedding wrapper
│   ├── chroma_db.py           # ChromaDB persistent vector database manager
│   └── retriever.py           # Grounded context search retriever
├── agents/
│   ├── planner.py             # LangGraph Planner agent
│   ├── validator.py           # Quality & hallucination validator agent
│   └── report_generator.py    # PDF report authoring agent
├── graph/
│   └── workflow.py            # LangGraph multi-agent workflow orchestration
├── schemas/
│   └── security_schema.py     # Pydantic data models
├── api/
│   └── api.py                 # FastAPI backend server
└── tests/
    ├── test_rag.py            # RAG unit tests
    └── test_agents.py         # Agent workflow unit tests
```

---

## 🚀 Environment Variables

Copy `.env.example` to `.env` and fill in your API credentials:

```bash
# Google Gemini API Key (Required)
GEMINI_API_KEY="your-gemini-api-key"

# Groq API Key (Optional)
GROQ_API_KEY="your-groq-api-key"
```

---

## 💻 Running Locally

### Option 1: Full-Stack Web App (React + Express Server)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Python FastAPI & Streamlit
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI backend
uvicorn api.api:app --reload --port 8000

# Run Streamlit UI
streamlit run app.py
```

### Option 3: Docker Container Deployment
```bash
docker-compose up --build -d
```

---

## 📜 License

Licensed under the Apache License, Version 2.0.
