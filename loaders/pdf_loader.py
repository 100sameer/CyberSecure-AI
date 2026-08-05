"""
PDF Document Loader and Text Splitter for CyberSecure AI.
Uses PyMuPDF (fitz) or pypdf to extract text, page numbers, and metadata,
then chunks text with RecursiveCharacterTextSplitter (chunk_size=800, overlap=150).
"""

import os
from typing import List, Dict, Any
from utils.logger import logger

try:
    import fitz  # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False
    try:
        from pypdf import PdfReader
        PYPDF_AVAILABLE = True
    except ImportError:
        PYPDF_AVAILABLE = False

from langchain.text_splitter import RecursiveCharacterTextSplitter

class SecurityPDFLoader:
    def __init__(self, chunk_size: int = 800, chunk_overlap: int = 150):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", " ", ""]
        )

    def load_pdf(self, file_path: str) -> List[Dict[str, Any]]:
        """Extract text page by page with document metadata."""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"PDF file not found: {file_path}")

        filename = os.path.basename(file_path)
        pages_data = []

        try:
            if PYMUPDF_AVAILABLE:
                doc = fitz.open(file_path)
                for page_num in range(len(doc)):
                    page = doc[page_num]
                    text = page.get_text("text")
                    if text.strip():
                        pages_data.append({
                            "text": text,
                            "page": page_num + 1,
                            "filename": filename,
                            "total_pages": len(doc)
                        })
                doc.close()
            elif PYPDF_AVAILABLE:
                reader = PdfReader(file_path)
                total_pages = len(reader.pages)
                for i, page in enumerate(reader.pages):
                    text = page.extract_text()
                    if text and text.strip():
                        pages_data.append({
                            "text": text,
                            "page": i + 1,
                            "filename": filename,
                            "total_pages": total_pages
                        })
            else:
                logger.error("Neither PyMuPDF nor pypdf available.")
                raise RuntimeError("No PDF library installed.")

            logger.info(f"Loaded {len(pages_data)} non-empty pages from {filename}")
            return pages_data
        except Exception as e:
            logger.error(f"Error reading PDF {file_path}: {e}")
            raise e

    def load_and_split(self, file_path: str) -> List[Dict[str, Any]]:
        """Extract text and split into standard vector DB chunks (size 800, overlap 150)."""
        raw_pages = self.load_pdf(file_path)
        chunks = []

        for page in raw_pages:
            splits = self.splitter.split_text(page["text"])
            for idx, split_text in enumerate(splits):
                chunks.append({
                    "text": split_text,
                    "metadata": {
                        "filename": page["filename"],
                        "page": page["page"],
                        "chunk_index": idx,
                        "source": f"{page['filename']}#page={page['page']}"
                    }
                })

        logger.info(f"Created {len(chunks)} chunks from {page['filename']}")
        return chunks
