"""
Retriever Module for CyberSecure AI RAG Pipeline.
Queries ChromaDB vector store, formats grounded context, and handles query expansion.
"""

from typing import List, Dict, Any
from rag.chroma_db import VectorDBManager
from utils.logger import logger

class SecurityRetriever:
    def __init__(self, vector_db: VectorDBManager = None):
        self.db = vector_db or VectorDBManager()

    def retrieve_grounded_context(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """Perform vector search and format grounded security context block."""
        results = self.db.similarity_search(query, top_k=top_k)
        
        if not results:
            return {
                "formatted_context": "No relevant security policy or vulnerability documents found in vector database.",
                "sources": [],
                "results_count": 0
            }

        formatted_blocks = []
        sources = []

        for idx, res in enumerate(results, 1):
            meta = res["metadata"]
            doc_name = meta.get("filename", "Unknown Doc")
            page = meta.get("page", 1)
            score = round(res.get("relevance_score", 0.0) * 100, 1)

            formatted_blocks.append(
                f"[Source #{idx}: {doc_name} | Page {page} | Relevance: {score}%]\n{res['text']}"
            )

            sources.append({
                "document": doc_name,
                "page": page,
                "relevance_score": score,
                "chunk": res["text"][:200] + "..."
            })

        full_context = "\n\n----------------------------------------\n\n".join(formatted_blocks)
        logger.info(f"Retrieved {len(results)} chunks for query: '{query[:50]}...'")

        return {
            "formatted_context": full_context,
            "sources": sources,
            "results_count": len(results)
        }
