import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Layers,
  Database,
  Search,
  CheckCircle2,
  Trash2,
  Sliders,
  Shield,
  FileCheck,
  FileCode,
  Loader2,
  AlertCircle
} from "lucide-react";
import { SystemStats } from "../types";
import { readDocumentFile } from "../utils/pdfReader";

interface DocumentsViewProps {
  stats: SystemStats;
  onUploadText: (filename: string, content: string) => void;
  onResetDb: () => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  stats,
  onUploadText,
  onResetDb
}) => {
  const [filenameInput, setFilenameInput] = useState("SecurityPolicy_2025.pdf");
  const [contentInput, setContentInput] = useState("");
  const [searchTestQuery, setSearchTestQuery] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [fileParseError, setFileParseError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsParsingFile(true);
    setFileParseError(null);
    try {
      const res = await readDocumentFile(file);
      setFilenameInput(res.filename);
      setContentInput(res.content);
      setUploadSuccess(`Successfully read "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Ready for vector ingestion!`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err: any) {
      setFileParseError(err.message || "Failed to process PDF/document file");
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.trim() || !filenameInput.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      onUploadText(filenameInput, contentInput);
      setIsUploading(false);
      setUploadSuccess(`Successfully indexed "${filenameInput}" into ChromaDB!`);
      setContentInput("");
      setTimeout(() => setUploadSuccess(null), 4000);
    }, 600);
  };

  const handleVectorSearchTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTestQuery.trim()) return;

    // Simulate search
    setTestResults([
      {
        filename: "OWASP-Top10-2025.pdf",
        page: 1,
        score: 94.2,
        text: "A01:2021-Broken Access Control: Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized disclosure, modification, or destruction."
      },
      {
        filename: "SOC-Incident-Response-Playbook.pdf",
        page: 5,
        score: 87.5,
        text: "Ransomware Containment Protocol: Immediately isolate infected host from local VLAN and Wi-Fi networks. Revoke active Kerberos and OAuth tokens."
      }
    ]);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Knowledge Base & Document RAG</h2>
          </div>
          <p className="text-xs text-slate-400">
            Upload security policies, vulnerability reports, and audit PDFs. Extracted text is split into chunks of 800 characters with 150 overlap for ChromaDB vector embeddings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-slate-400">Total Chunks: </span>
            <span className="font-bold text-emerald-400">{stats.total_chunks}</span>
          </div>
          <button
            onClick={onResetDb}
            className="px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Vector Store</span>
          </button>
        </div>
      </div>

      {/* Grid: Upload & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between font-bold text-slate-100 text-sm">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Ingest Security Document (.pdf, .txt, .md, .log)</span>
            </div>
            <span className="text-[11px] font-normal text-slate-400">Auto PDF Text Extraction</span>
          </div>

          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {fileParseError && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{fileParseError}</span>
            </div>
          )}

          {/* Drag & Drop File Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-3 text-center ${
              dragActive
                ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
                : "border-white/10 bg-black/30 hover:border-white/20 hover:bg-black/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.md,.json,.csv,.log"
              onChange={handleFileChange}
              className="hidden"
            />

            {isParsingFile ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                <span className="text-xs font-semibold text-emerald-300">Extracting text & pages from PDF...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200">
                    Drop your <span className="text-emerald-400">PDF</span> or Security Audit file here, or <span className="text-indigo-400 underline">browse</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Supports .pdf, .txt, .md, .json, .csv, and firewall .log files
                  </p>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Title / Filename
              </label>
              <input
                type="text"
                value={filenameInput}
                onChange={(e) => setFilenameInput(e.target.value)}
                placeholder="e.g., Firewall_Rule_Audit_2025.pdf"
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Extracted Document Content ({contentInput.length.toLocaleString()} characters)
                </label>
                {contentInput && (
                  <button
                    type="button"
                    onClick={() => setContentInput("")}
                    className="text-[10px] text-slate-400 hover:text-red-400 transition-colors"
                  >
                    Clear Text
                  </button>
                )}
              </div>
              <textarea
                rows={6}
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder="Content will automatically be extracted from your PDF, or you can manually paste security policy text here..."
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none font-mono leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={!contentInput.trim() || isUploading || isParsingFile}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isUploading ? "Chunking & Embedding into Vector Store..." : "Process & Add to ChromaDB Vector Store"}</span>
            </button>
          </form>
        </div>

        {/* Text Splitter Parameters Inspector */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Chunking Configuration</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold">Recursive Character Splitter</div>
              <p className="text-slate-300">
                Separators: <code className="text-emerald-400">["\n\n", "\n", " ", ""]</code>
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold">Chunk Size</div>
              <div className="text-lg font-bold text-emerald-400">800 Characters</div>
              <p className="text-slate-400 text-[11px]">Optimal for preserving vulnerability context integrity.</p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold">Chunk Overlap</div>
              <div className="text-lg font-bold text-indigo-400">150 Characters</div>
              <p className="text-slate-400 text-[11px]">Prevents semantic context fracture across chunk boundaries.</p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold">Embedding Model</div>
              <div className="text-emerald-400 font-mono font-semibold">all-MiniLM-L6-v2</div>
              <p className="text-slate-400 text-[11px]">384-dimensional dense vector embeddings.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vector DB Search Tester */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Vector Store Search Inspector</span>
          </div>
          <span className="text-xs text-slate-400">Test vector similarity retrieval</span>
        </div>

        <form onSubmit={handleVectorSearchTest} className="flex gap-3">
          <input
            type="text"
            value={searchTestQuery}
            onChange={(e) => setSearchTestQuery(e.target.value)}
            placeholder="Type search query to inspect top 5 vector matches (e.g. 'Ransomware isolation' or 'SSH security')..."
            className="flex-1 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Query Vectors</span>
          </button>
        </form>

        {testResults.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-400">Top Similarity Search Matches:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testResults.map((res, i) => (
                <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>📄 {res.filename} (Page {res.page})</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300">
                      {res.score}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{res.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
