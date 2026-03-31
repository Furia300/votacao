"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { modulosCaos, sectors } from "@/data/modulosCaos";
import { submitVote, getMyVotes } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import Header from "@/components/Header";
import ModuleSection from "@/components/ModuleSection";
import VotingPanel from "@/components/VotingPanel";
import LoginScreen from "@/components/LoginScreen";
import { Search, Filter } from "lucide-react";

export default function Home() {
  const { user, loading, supabase } = useAuth();
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [activeSector, setActiveSector] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const voterName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const voterEmail = user?.email || "";
  const voterAvatar = user?.user_metadata?.avatar_url || "";

  // Load existing votes for this user from Supabase
  useEffect(() => {
    if (!supabase || !voterEmail) return;

    (async () => {
      try {
        const myVotes = await getMyVotes(supabase, voterEmail);
        const votesMap: Record<string, boolean> = {};
        myVotes.forEach((v) => {
          votesMap[v.example_id] = v.approved;
        });
        setVotes(votesMap);
      } catch {
        // Supabase not ready
      }
    })();
  }, [supabase, voterEmail]);

  const handleVote = useCallback(
    async (exampleId: string, moduleId: number, moduleName: string, approved: boolean) => {
      if (!supabase || !voterEmail) return;

      // Toggle: if same vote, remove it
      const currentVote = votes[exampleId];
      const newApproved = currentVote === approved ? undefined : approved;

      if (newApproved === undefined) {
        setVotes((prev) => {
          const next = { ...prev };
          delete next[exampleId];
          return next;
        });
        return;
      }

      setVotes((prev) => ({ ...prev, [exampleId]: newApproved }));

      try {
        await submitVote(supabase, {
          example_id: exampleId,
          module_id: moduleId,
          module_name: moduleName,
          voter_name: voterName,
          voter_email: voterEmail,
          voter_avatar: voterAvatar,
          approved: newApproved,
        });
      } catch {
        // Supabase error, votes saved locally only
      }
    },
    [supabase, voterName, voterEmail, voterAvatar, votes]
  );

  const filteredModules = useMemo(() => {
    return modulosCaos.filter((m) => {
      const matchesSector = activeSector === "Todos" || m.sector === activeSector;
      const matchesSearch =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.examples.some(
          (ex) =>
            ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ex.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSector && matchesSearch;
    });
  }, [activeSector, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ paddingBottom: "60px" }}>
      <Header
        totalModules={modulosCaos.length}
        totalExamples={modulosCaos.length * 3}
      />

      {/* Hero Banner */}
      <div
        className="mx-4 sm:mx-6 mt-4 rounded-[20px] px-6 sm:px-8 py-8 relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold"
            style={{ background: "rgba(246, 146, 30, 0.2)", color: "#fdc24e" }}
          >
            FASE 1A — ANTES DA TRANSFORMACAO DIGITAL
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">
            Como era o caos em cada setor?
          </h2>
          <p className="text-sm max-w-2xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Cada modulo abaixo representa um sistema que foi criado no FIPS.
            Para cada um, existem 3 cenarios ilustrando como era o dia a dia
            antes da digitalizacao. Gestores: aprovem os cenarios que melhor
            representam a realidade passada.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: "#fff" }} />
        <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full opacity-5" style={{ background: "#fff" }} />
      </div>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 mt-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-subtle)" }} />
            <input
              type="text"
              placeholder="Buscar modulo, setor ou cenario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all"
              style={{ background: "var(--bg-card)", border: "2px solid var(--border)", color: "var(--foreground)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--fips-blue)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "var(--foreground-muted)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
              {filteredModules.length} de {modulosCaos.length} modulos
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {sectors.map((sector) => {
            const isActive = activeSector === sector;
            const count = sector === "Todos" ? modulosCaos.length : modulosCaos.filter((m) => m.sector === sector).length;
            return (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? "var(--primary)" : "var(--bg-card)",
                  color: isActive ? "#fff" : "var(--foreground-muted)",
                  border: `2px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                  boxShadow: isActive ? "var(--shadow-primary)" : "none",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
              >
                {sector} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Module list */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 flex flex-col gap-6 pb-8">
        {filteredModules.map((module) => (
          <ModuleSection
            key={module.id}
            module={module}
            voterName={voterName}
            votes={votes}
            onVote={handleVote}
          />
        ))}
        {filteredModules.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: "var(--foreground-muted)" }}>Nenhum modulo encontrado</p>
            <p className="text-sm mt-1" style={{ color: "var(--foreground-subtle)" }}>Tente outro filtro ou termo de busca</p>
          </div>
        )}
      </div>

      <VotingPanel votes={votes} voterName={voterName} />
    </div>
  );
}
