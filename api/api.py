"""
FastAPI Server for CyberSecure AI API Endpoints.
Exposes endpoints for PDF uploading, RAG querying, Multi-Agent workflow execution, CVE lookup, and report downloads.
"""

import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.security_schema import QueryRequest, SecurityResponse
from loaders.pdf_loader import SecurityPDFLoader
from rag.chroma_db import VectorDBManager
from graph.workflow import CyberSecureWorkflow
from utils.helper import sanitize_filename
from utils.logger import logger

app = FastAPI(
    title="CyberSecure AI API",
    description="Enterprise Multi-Agent Cyber Security Assistant REST API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_db = VectorDBManager()
workflow = CyberSecureWorkflow()
pdf_loader = SecurityPDFLoader(chunk_size=800, chunk_overlap=150)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploaded_docs")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def health_check():
    return {"status": "online", "system": "CyberSecure AI Enterprise Assistant", "version": "1.0.0"}

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF security documents are supported.")
    
    clean_name = sanitize_filename(file.filename)
    save_path = os.path.join(UPLOAD_DIR, clean_name)
    
    with open(save_path, "wb") as f:
        content = await file.read()
        f.write(content)
        
    chunks = pdf_loader.load_and_split(save_path)
    added_count = vector_db.add_chunks(chunks)
    
    return {
        "status": "success",
        "filename": clean_name,
        "chunks_indexed": added_count,
        "message": f"Successfully indexed {added_count} chunks into ChromaDB persistent database."
    }

@app.post("/api/query")
def run_security_query(req: QueryRequest):
    try:
        pipeline_result = workflow.run(req.query, model_provider=req.model_provider)
        return {
            "query": req.query,
            "provider": req.model_provider,
            "analysis": pipeline_result["validated_response"],
            "sources": pipeline_result["sources"],
            "report_pdf": pipeline_result["pdf_report_path"],
            "plan": pipeline_result["plan"]
        }
    except Exception as e:
        logger.error(f"Error executing security query: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/stats")
def get_db_stats():
    return vector_db.get_stats()

@app.post("/api/db/reset")
def reset_db():
    vector_db.reset_db()
    return {"status": "success", "message": "ChromaDB vector database reset successfully."}
