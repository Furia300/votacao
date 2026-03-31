"use client";

import { Flame, Eye } from "lucide-react";

interface HeaderProps {
  voterName: string;
  onNameChange: (name: string) => void;
  totalModules: number;
  totalExamples: number;
}

export default function Header({ voterName, onNameChange, totalModules, totalExamples }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              boxShadow: "0 4px 12px -4px rgba(239, 68, 68, 0.4)",
            }}
          >
            <Flame size={20} color="#fff" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--error)" }}>ATO 1</span> — O Caos
            </h1>
            <p className="text-[11px] font-medium" style={{ color: "var(--foreground-muted)" }}>
              {totalModules} modulos | {totalExamples} cenarios do passado
            </p>
          </div>
        </div>

        {/* Voter name input */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "var(--primary-50)", border: "1px solid rgba(246, 146, 30, 0.2)" }}>
            <Eye size={14} style={{ color: "var(--primary)" }} />
            <span className="text-[11px] font-semibold" style={{ color: "var(--primary)" }}>
              Aprovacao dos Gestores
            </span>
          </div>

          <input
            type="text"
            placeholder="Seu nome para votar..."
            value={voterName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-48 px-4 py-2 rounded-xl text-sm font-medium outline-none transition-all"
            style={{
              background: "var(--bg-card)",
              border: "2px solid var(--border)",
              color: "var(--foreground)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--fips-blue)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 144, 208, 0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>
    </header>
  );
}
