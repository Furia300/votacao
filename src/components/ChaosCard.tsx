"use client";

import { useState } from "react";
import type { ChaosExample, ModuloCaos } from "@/data/modulosCaos";
import {
  Check,
  X,
  FileText,
  AlertTriangle,
  ClipboardList,
  Scroll,
} from "lucide-react";

interface ChaosCardProps {
  module: ModuloCaos;
  example: ChaosExample;
  index: number;
  voterName: string;
  currentVote?: boolean;
  onVote: (exampleId: string, moduleId: number, moduleName: string, approved: boolean) => void;
}

const chaosIcons = [
  <Scroll key="scroll" size={20} />,
  <ClipboardList key="clip" size={20} />,
  <FileText key="file" size={20} />,
];

export default function ChaosCard({
  module,
  example,
  index,
  voterName,
  currentVote,
  onVote,
}: ChaosCardProps) {
  const [hovering, setHovering] = useState(false);

  const isApproved = currentVote === true;
  const isRejected = currentVote === false;

  return (
    <div
      className="relative flex flex-col gap-3 p-5 rounded-[16px] border transition-all duration-300"
      style={{
        background: isApproved
          ? "rgba(0, 198, 76, 0.04)"
          : isRejected
          ? "rgba(239, 68, 68, 0.04)"
          : "var(--bg-card)",
        borderColor: isApproved
          ? "rgba(0, 198, 76, 0.3)"
          : isRejected
          ? "rgba(239, 68, 68, 0.3)"
          : "var(--border)",
        boxShadow: hovering
          ? "var(--shadow-card-hover)"
          : "var(--shadow-card)",
        transform: hovering ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Chaos icon */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--error)" }}
        >
          <AlertTriangle size={16} />
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "var(--error)" }}
        >
          Cenario {index + 1}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
        {example.title}
      </h4>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
        {example.description}
      </p>

      {/* Vote buttons */}
      {voterName && (
        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => onVote(example.id, module.id, module.name, true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: isApproved ? "var(--success)" : "rgba(0, 198, 76, 0.08)",
              color: isApproved ? "#fff" : "var(--success)",
              border: `1.5px solid ${isApproved ? "var(--success)" : "rgba(0, 198, 76, 0.25)"}`,
            }}
          >
            <Check size={14} />
            Aprovar
          </button>
          <button
            onClick={() => onVote(example.id, module.id, module.name, false)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: isRejected ? "var(--error)" : "rgba(239, 68, 68, 0.08)",
              color: isRejected ? "#fff" : "var(--error)",
              border: `1.5px solid ${isRejected ? "var(--error)" : "rgba(239, 68, 68, 0.25)"}`,
            }}
          >
            <X size={14} />
            Rejeitar
          </button>
        </div>
      )}

      {/* Status indicator */}
      {currentVote !== undefined && (
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: isApproved ? "var(--success)" : "var(--error)",
          }}
        >
          {isApproved ? <Check size={14} color="#fff" /> : <X size={14} color="#fff" />}
        </div>
      )}
    </div>
  );
}
