"use client";

import { useAuth } from "@/lib/auth";
import { Flame, BarChart3, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  totalModules: number;
  totalExamples: number;
}

export default function Header({ totalModules, totalExamples }: HeaderProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const userAvatar = user?.user_metadata?.avatar_url || "";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

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

        {/* Nav + User */}
        <div className="flex items-center gap-3">
          {/* Nav tabs */}
          <nav className="hidden sm:flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-muted)" }}>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: pathname === "/" ? "var(--bg-card)" : "transparent",
                color: pathname === "/" ? "var(--foreground)" : "var(--foreground-muted)",
                boxShadow: pathname === "/" ? "var(--shadow-sm)" : "none",
              }}
            >
              Votacao
            </Link>
            <Link
              href="/painel"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: pathname === "/painel" ? "var(--bg-card)" : "transparent",
                color: pathname === "/painel" ? "var(--foreground)" : "var(--foreground-muted)",
                boxShadow: pathname === "/painel" ? "var(--shadow-sm)" : "none",
              }}
            >
              <BarChart3 size={13} />
              Painel
            </Link>
          </nav>

          {/* User pill */}
          {user && (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "var(--primary-50)", border: "1px solid rgba(246, 146, 30, 0.2)" }}
              >
                {userAvatar ? (
                  <img src={userAvatar} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #f6921e, #e07310)" }}
                  >
                    {userInitials}
                  </div>
                )}
                <span className="text-[11px] font-semibold hidden md:inline" style={{ color: "var(--foreground)" }}>
                  {userName}
                </span>
              </div>

              <button
                onClick={signOut}
                className="p-2 rounded-lg transition-all cursor-pointer"
                style={{ color: "var(--foreground-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--error)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-subtle)"; }}
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
