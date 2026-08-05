import * as pdfjsLib from "pdfjs-dist";

// Set worker source for pdf.js using Vite asset URL resolution
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
} catch {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

/**
 * Extracts raw text content from a PDF file page by page using pdfjs-dist.
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => item.str || "")
        .filter((str: string) => str.trim().length > 0);
      
      const pageText = pageStrings.join(" ");
      if (pageText.trim()) {
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
    }
    
    return fullText.trim() || `[PDF "${file.name}" contained no selectable text or OCR is required]`;
  } catch (error: any) {
    console.error("PDF Parsing error:", error);
    throw new Error(`Failed to read PDF file "${file.name}": ${error?.message || "Invalid or encrypted PDF"}`);
  }
}

/**
 * Reads text content from any supported file (.pdf, .txt, .md, .json, .csv, .log).
 */
export async function readDocumentFile(file: File): Promise<{ filename: string; content: string }> {
  const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
  
  if (isPdf) {
    const text = await extractTextFromPDF(file);
    return {
      filename: file.name,
      content: text
    };
  } else {
    // Standard text formats
    const text = await file.text();
    return {
      filename: file.name,
      content: text
    };
  }
}
