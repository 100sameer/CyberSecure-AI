"""
Embedding Generator using sentence-transformers/all-MiniLM-L6-v2 or Google Gemini Embeddings.
Provides vector embedding representations for vector database storage and retrieval.
"""

from typing import List
from utils.logger import logger

class SecurityEmbeddingGenerator:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.model_name = model_name
        self._model = None

    def _load_model(self):
        if self._model is None:
            try:
                from sentence_transformers import SentenceTransformer
                logger.info(f"Loading embedding model: {self.model_name}")
                self._model = SentenceTransformer(self.model_name)
            except Exception as e:
                logger.warning(f"Could not load SentenceTransformer ({e}). Falling back to lightweight hash embedding.")
                self._model = "fallback"

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Generate 384-dimensional dense vectors for document chunks."""
        self._load_model()
        if self._model != "fallback":
            embeddings = self._model.encode(texts, convert_to_numpy=True)
            return embeddings.tolist()
        else:
            return [self._pseudo_embedding(t) for t in texts]

    def embed_query(self, text: str) -> List[float]:
        """Generate embedding vector for search query."""
        return self.embed_documents([text])[0]

    def _pseudo_embedding(self, text: str, dim: int = 384) -> List[float]:
        """Deterministic fallback embedding vector if torch/sentence_transformers is not installed."""
        import hashlib
        import numpy as np
        seed = int(hashlib.md5(text.encode('utf-8')).hexdigest()[:8], 16)
        np.random.seed(seed)
        vec = np.random.normal(0, 1, dim)
        norm = np.linalg.norm(vec)
        return (vec / norm).tolist()
