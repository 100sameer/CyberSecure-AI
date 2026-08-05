"""
Persistent ChromaDB Vector Store for CyberSecure AI.
Handles adding documents, chunk indexing, persistence, and vector similarity search.
"""

import os
from typing import List, Dict, Any
from rag.embeddings import SecurityEmbeddingGenerator
from utils.logger import logger

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "vector_db")

class VectorDBManager:
    def __init__(self, collection_name: str = "security_knowledge"):
        self.collection_name = collection_name
        self.embedding_generator = SecurityEmbeddingGenerator()
        os.makedirs(DB_DIR, exist_ok=True)
        self.client = None
        self.collection = None
        self._init_db()

    def _init_db(self):
        try:
            import chromadb
            from chromadb.config import Settings
            self.client = chromadb.PersistentClient(path=DB_DIR)
            self.collection = self.client.get_or_create_collection(name=self.collection_name)
            logger.info(f"Initialized Persistent ChromaDB collection '{self.collection_name}' at {DB_DIR}")
        except Exception as e:
            logger.warning(f"ChromaDB persistent client error: {e}. Using in-memory fallback store.")
            self.client = None
            self._fallback_store = []

    def add_chunks(self, chunks: List[Dict[str, Any]]) -> int:
        """Add document chunks with metadata to ChromaDB persistent collection."""
        if not chunks:
            return 0

        texts = [c["text"] for c in chunks]
        metadatas = [c["metadata"] for c in chunks]
        ids = [f"id_{m['filename']}_p{m['page']}_c{m['chunk_index']}" for m in metadatas]

        embeddings = self.embedding_generator.embed_documents(texts)

        if self.collection:
            self.collection.upsert(
                documents=texts,
                embeddings=embeddings,
                metadatas=metadatas,
                ids=ids
            )
            logger.info(f"Upserted {len(chunks)} chunks into ChromaDB.")
        else:
            for text, meta, emb, cid in zip(texts, metadatas, embeddings, ids):
                self._fallback_store.append({
                    "id": cid,
                    "text": text,
                    "metadata": meta,
                    "embedding": emb
                })

        return len(chunks)

    def similarity_search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Retrieve top_k most relevant document chunks for given search query."""
        query_vec = self.embedding_generator.embed_query(query)

        if self.collection:
            count = self.collection.count()
            if count == 0:
                return []
            results = self.collection.query(
                query_embeddings=[query_vec],
                n_results=min(top_k, count)
            )
            docs = []
            if results and results.get("documents"):
                for doc_text, meta, dist in zip(results["documents"][0], results["metadatas"][0], results["distances"][0]):
                    # Distance to similarity conversion
                    sim_score = max(0.0, 1.0 - (dist / 2.0))
                    docs.append({
                        "text": doc_text,
                        "metadata": meta,
                        "relevance_score": sim_score
                    })
            return docs
        else:
            # Fallback cosine calculation
            import numpy as np
            q_arr = np.array(query_vec)
            scored = []
            for item in self._fallback_store:
                d_arr = np.array(item["embedding"])
                score = float(np.dot(q_arr, d_arr) / (np.linalg.norm(q_arr) * np.linalg.norm(d_arr) + 1e-8))
                scored.append({
                    "text": item["text"],
                    "metadata": item["metadata"],
                    "relevance_score": score
                })
            scored.sort(key=lambda x: x["relevance_score"], reverse=True)
            return scored[:top_k]

    def reset_db(self):
        """Clear all vectors from the ChromaDB collection."""
        if self.collection:
            try:
                self.client.delete_collection(self.collection_name)
                self.collection = self.client.get_or_create_collection(name=self.collection_name)
            except Exception as e:
                logger.error(f"Error resetting collection: {e}")
        else:
            self._fallback_store = []
        logger.info("ChromaDB persistent collection reset successfully.")

    def get_stats(self) -> Dict[str, Any]:
        """Return total chunks and document count stored."""
        if self.collection:
            cnt = self.collection.count()
            return {"total_chunks": cnt, "storage": "ChromaDB Persistent"}
        else:
            return {"total_chunks": len(self._fallback_store), "storage": "Memory Fallback"}
