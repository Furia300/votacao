"use client";

import { modulosCaos } from "@/data/modulosCaos";
import { Check, X, BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface VotingPanelProps {
  votes: Record<string, boolean>;
  voterName: string;
}

export default function VotingPanel({ votes, voterName }: VotingPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const totalExamples = modulosCaos.length * 3;
  const votedCount = Object.keys(votes).length;
  const approvedCount = Object.values(votes).filter((v) => v === true).length;
  const rejectedCount = Object.values(votes).filter((v) => v === false).length;
  const pendingCount = totalExamples - votedCount;
  const progress = (votedCount / totalExamples) * 100;

  const approvedByModule = modulosCaos.map((m) => {
    const approved = m.examples.filter((ex) => votes[ex.id] === true);
    const rejected = m.examples.filter((ex) => votes[ex.id] === false);
    const pending = m.examples.filter((ex) => votes[ex.id] === undefined);
    return { module: m, approved, rejected, pending };
  });

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(0, 42, 104, 0.97)",
        backdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        maxHeight: expanded ? "70vh" : "auto",
      }}
    >
      {/* Summary bar */}
      <div
        className="flex items-center justify-between px-6 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} color="#f6921e" />
            <span className="text-white font-semibold text-sm">Painel de Votacao</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{ background: "rgba(0, 198, 76, 0.15)", color: "#00c64c" }}>
              <Check size={12} /> {approvedCount}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}>
              <X size={12} /> {rejectedCount}
            </div>
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {pendingCount} pendentes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #003b8f, #0090d0)",
                }}
              />
            </div>
            <span className="text-[11px] font-bold text-white">{Math.round(progress)}%</span>
          </div>

          {expanded ? (
            <ChevronDown size={18} color="rgba(255,255,255,0.6)" />
          ) : (
            <ChevronUp size={18} color="rgba(255,255,255,0.6)" />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="px-6 pb-4 overflow-y-auto"
          style={{ maxHeight: "calc(70vh - 52px)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
            {approvedByModule.map(({ module, approved, rejected, pending }) => (
              <div
                key={module.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{module.name}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{module.sector}</p>
                </div>
                <div className="flex gap-1">
                  {module.examples.map((ex, i) => {
                    const vote = votes[ex.id];
                    return (
                      <div
                        key={ex.id}
                        className="w-5 h-5 rounded-md flex items-center justify-center"
                        style={{
                          background:
                            vote === true
                              ? "rgba(0, 198, 76, 0.25)"
                              : vote === false
                              ? "rgba(239, 68, 68, 0.25)"
                              : "rgba(255,255,255,0.08)",
                        }}
                      >
                        {vote === true && <Check size={10} color="#00c64c" />}
                        {vote === false && <X size={10} color="#ef4444" />}
                        {vote === undefined && (
                          <span className="text-[8px] font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {i + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
