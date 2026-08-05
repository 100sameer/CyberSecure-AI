import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  FileText,
  Copy,
  Download,
  AlertOctagon,
  HelpCircle,
  Clock,
  Layers,
  FileCheck
} from "lucide-react";
import { ChatMessage, ModelProvider, RiskLevel } from "../types";
import { jsPDF } from "jspdf";

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  modelProvider: ModelProvider;
  selectedModel: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  modelProvider,
  selectedModel
}) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const getRiskBadgeColor = (risk?: RiskLevel) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-950/90 text-red-400 border-red-800 shadow-red-900/20";
      case "HIGH":
        return "bg-amber-950/90 text-amber-400 border-amber-800 shadow-amber-900/20";
      case "MEDIUM":
        return "bg-yellow-950/90 text-yellow-400 border-yellow-800 shadow-yellow-900/20";
      case "LOW":
        return "bg-emerald-950/90 text-emerald-400 border-emerald-800 shadow-emerald-900/20";
      default:
        return "bg-blue-950/90 text-blue-400 border-blue-800 shadow-blue-900/20";
    }
  };

  const exportToPdf = (msg: ChatMessage) => {
    if (!msg.analysis) return;
    const { analysis } = msg;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text("CyberSecure AI - Security Assessment", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Query: ${msg.text.slice(0, 70)}...`, 14, 28);
    doc.text(`Risk Level: ${analysis.risk_level} | AI Confidence: ${analysis.confidence}%`, 14, 34);
    doc.text(`OWASP: ${analysis.owasp_mapping} | MITRE: ${analysis.mitre_mapping}`, 14, 40);

    doc.setLineWidth(0.5);
    doc.setDrawColor(2, 132, 199);
    doc.line(14, 44, 196, 44);

    let y = 52;
    const addSection = (title: string, body: string) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(2, 132, 199);
      doc.text(title, 14, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      const splitText = doc.splitTextToSize(body, 180);
      doc.text(splitText, 14, y);
      y += splitText.length * 5 + 6;
    };

    addSection("1. Executive Summary", analysis.executive_summary);
    addSection("2. Technical Threat Analysis", analysis.threat_analysis);
    addSection("3. Business Impact", analysis.business_impact);
    addSection("4. Immediate Containment & Mitigation", analysis.mitigation);
    addSection("5. Recommendations", analysis.recommendations);

    doc.save(`CyberSecure_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Top Assistant Control Bar */}
      <div className="px-6 py-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-slate-200">
            SOC Assistant Operational • Model:{" "}
            <span className="text-emerald-400 font-mono">
              {modelProvider === "groq" ? "Groq (Llama 3.3 70B)" : "Gemini 3.6 Flash"}
            </span>
          </span>
        </div>
        <div className="text-slate-400 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> Grounded RAG Verified
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "agent" && (
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-emerald-500/20 font-bold">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div
              className={`max-w-3xl rounded-2xl p-5 space-y-4 shadow-xl ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-black/40 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md"
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between text-[11px] opacity-80 border-b border-white/10 pb-2">
                <span className="font-semibold">
                  {msg.sender === "user" ? "SOC Analyst Query" : "CyberSecure Multi-Agent Response"}
                </span>
                <span className="font-mono">{msg.timestamp}</span>
              </div>

              {/* Text content */}
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{msg.text}</p>

              {/* If Agent Response with Structured Analysis */}
              {msg.analysis && (
                <div className="space-y-4 pt-2 border-t border-white/10">
                  {/* Key Metrics Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className={`px-3 py-1 rounded-lg border text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5 ${getRiskBadgeColor(
                        msg.analysis.risk_level
                      )}`}
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>RISK LEVEL: {msg.analysis.risk_level}</span>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AI Confidence: {msg.analysis.confidence}%</span>
                    </div>

                    {msg.analysis.owasp_mapping && (
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-emerald-300 font-mono">
                        OWASP: {msg.analysis.owasp_mapping}
                      </div>
                    )}

                    {msg.analysis.mitre_mapping && (
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-indigo-300 font-mono">
                        MITRE: {msg.analysis.mitre_mapping}
                      </div>
                    )}
                  </div>

                  {/* Accordion Style Breakdown */}
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Executive Summary</div>
                      <p className="text-slate-300 leading-relaxed">{msg.analysis.executive_summary}</p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Technical Threat Analysis</div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.analysis.threat_analysis}</p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-red-400 uppercase tracking-wider text-[11px]">Business Impact</div>
                      <p className="text-slate-300 leading-relaxed">{msg.analysis.business_impact}</p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Immediate Mitigation</div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.analysis.mitigation}</p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">Recommendations</div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.analysis.recommendations}</p>
                    </div>
                  </div>

                  {/* Citation Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Grounded RAG Sources ({msg.sources.length} Documents)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.sources.map((src, i) => (
                          <div
                            key={i}
                            className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-[11px] space-y-1"
                          >
                            <div className="flex items-center justify-between text-emerald-300 font-medium">
                              <span>📄 {src.document} (P. {src.page})</span>
                              <span className="text-slate-400 text-[10px]">{src.relevance_score}% Rel</span>
                            </div>
                            <p className="text-slate-400 italic text-[10px] line-clamp-2">
                              "{src.chunk}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions: Export PDF */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => exportToPdf(msg)}
                      className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF Security Report</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-slate-200 shrink-0 font-bold text-xs">
                SOC
              </div>
            )}
          </div>
        ))}

        {/* Loading Multi-Agent Workflow State */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 animate-pulse font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div className="max-w-xl rounded-2xl p-5 bg-black/40 border border-emerald-500/40 space-y-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>LangGraph Multi-Agent Workflow Executing...</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Planner Agent: Formulated search queries & OWASP target framework</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Retriever Agent: Executed similarity search on ChromaDB</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. Threat Intel & LLM Generator: Synthesizing grounded findings...</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                  <span>4. Validator Agent: Factuality & hallucination audit</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-black/40 border-t border-white/10 flex items-center gap-3 backdrop-blur-md">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask CyberSecure AI (e.g., 'Assess zero-day RCE mitigation steps' or 'Audit firewall rules')..."
          disabled={isLoading}
          className="flex-1 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
