"use client";

import { useAuth } from "@/lib/auth";
import { Vote, LogOut, Plus, Trophy } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { user, signOut } = useAuth();

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #f6921e 0%, #e07310 100%)",
              boxShadow: "0 4px 12px -4px rgba(246, 146, 30, 0.4)",
            }}
          >
            <Vote size={20} color="#fff" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight" style={{ color: "var(--foreground)" }}>
              Votação <span style={{ color: "var(--primary)" }}>FIPS</span>
            </h1>
            <p className="text-[11px] font-medium" style={{ color: "var(--foreground-muted)" }}>
              Centro de Aprovação de Projetos
            </p>
          </div>
        </Link>

        {/* Actions + User */}
        <div className="flex items-center gap-3">
          <Link
            href="/vencedores"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: "rgba(0,198,76,0.1)",
              color: "var(--success)",
              textDecoration: "none",
              border: "1px solid rgba(0,198,76,0.2)",
            }}
          >
            <Trophy size={14} />
            Vencedores
          </Link>
          <Link
            href="/projeto/novo"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: "var(--fips-cyan)",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 12px -4px rgba(60, 169, 201, 0.4)",
            }}
          >
            <Plus size={14} />
            Novo Projeto
          </Link>

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
