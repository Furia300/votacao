"use client";

import { useAuth } from "@/lib/auth";
import { Flame } from "lucide-react";

export default function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5" style={{ background: "#fff" }} />
      <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-5" style={{ background: "#fff" }} />

      <div
        className="relative w-full max-w-md rounded-[24px] p-8 animate-scale-in"
        style={{
          background: "var(--bg-card)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              boxShadow: "0 8px 24px -4px rgba(239, 68, 68, 0.4)",
            }}
          >
            <Flame size={32} color="#fff" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--error)" }}>ATO 1</span> — O Caos
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
              Apresentacao 3 Atos — FIPS
            </p>
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: "var(--bg-muted)", border: "1px solid var(--border-light)" }}
        >
          <p className="text-xs leading-relaxed text-center" style={{ color: "var(--foreground-muted)" }}>
            Faca login com seu Google corporativo para votar nos cenarios
            que melhor representam o caos do passado em cada setor.
            Sua identidade sera registrada em cada voto.
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
          style={{
            background: "var(--bg-card)",
            border: "2px solid var(--border)",
            color: "var(--foreground)",
            boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--fips-blue)";
            e.currentTarget.style.boxShadow = "var(--shadow-card)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Google icon */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? "Carregando..." : "Entrar com Google"}
        </button>

        <p className="text-center text-[10px] mt-4" style={{ color: "var(--foreground-subtle)" }}>
          44 modulos | 132 cenarios | Votacao em tempo real
        </p>
      </div>
    </div>
  );
}
