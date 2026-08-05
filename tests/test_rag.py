"""
Unit & Integration Tests for RAG Pipeline & ChromaDB operations.
"""

import os
import pytest
from loaders.pdf_loader import SecurityPDFLoader
from rag.embeddings import SecurityEmbeddingGenerator
from rag.chroma_db import VectorDBManager
from rag.retriever import SecurityRetriever

def test_embeddings_generation():
    generator = SecurityEmbeddingGenerator()
    vec = generator.embed_query("Firewall access control policy")
    assert len(vec) == 384
    assert isinstance(vec, list)

def test_vector_db_add_and_query():
    db = VectorDBManager(collection_name="test_collection")
    chunks = [
        {
            "text": "CRITICAL: Disable SSH root login and restrict port 22 access via VPN.",
            "metadata": {"filename": "test.pdf", "page": 1, "chunk_index": 0}
        }
    ]
    added = db.add_chunks(chunks)
    assert added == 1

    results = db.similarity_search("SSH root login policy", top_k=1)
    assert len(results) >= 1
    assert "SSH" in results[0]["text"]

def test_retriever_grounded_context():
    retriever = SecurityRetriever()
    res = retriever.retrieve_grounded_context("firewall configuration")
    assert "formatted_context" in res
    assert "sources" in res
