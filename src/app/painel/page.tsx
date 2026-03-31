"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/lib/auth";
import { getAllVotesGroupedByUser, type Vote } from "@/lib/supabase";
import { modulosCaos } from "@/data/modulosCaos";
import Header from "@/components/Header";
import LoginScreen from "@/components/LoginScreen";
import {
  Check, X, Clock, Users, BarChart3, Activity, ChevronDown, ChevronUp,
  TrendingUp, Search,
} from "lucide-react";

interface UserVoteGroup {
  name: string;
  email: string;
  avatar?: string;
  votes: Vote[];
}

export default function PainelPage() {
  const { user, loading, supabase } = useAuth();
  const [usersData, setUsersData] = useState<Record<string, UserVoteGroup>>({});
  const [allVotes, setAllVotes] = useState<Vote[]>([]);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    if (!supabase) return;
    setRefreshing(true);
    try {
      const grouped = await getAllVotesGroupedByUser(supabase);
      setUsersData(grouped);
      const flat: Vote[] = [];
      Object.values(grouped).forEach((g) => flat.push(...g.votes));
      setAllVotes(flat);
    } catch {
      // Supabase not ready
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 15s
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const stats = useMemo(() => {
    const totalVotes = allVotes.length;
    const approved = allVotes.filter((v) => v.approved).length;
    const rejected = allVotes.filter((v) => !v.approved).length;
    const totalUsers = Object.keys(usersData).length;
    const totalPossible = modulosCaos.length * 3;
    const avgProgress = totalUsers > 0
      ? Math.round(Object.values(usersData).reduce((acc, u) => acc + (u.votes.length / totalPossible) * 100, 0) / totalUsers)
      : 0;

    return { totalVotes, approved, rejected, totalUsers, avgProgress, totalPossible };
  }, [allVotes, usersData]);

  const recentActivity = useMemo(() => {
    return [...allVotes]
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 20);
  }, [allVotes]);

  // Find example title from data
  const getExampleTitle = (exampleId: string) => {
    for (const m of modulosCaos) {
      for (const ex of m.examples) {
        if (ex.id === exampleId) return ex.title;
      }
    }
    return exampleId;
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "agora";
    if (diffMin < 60) return `${diffMin}min atras`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h atras`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD}d atras`;
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return Object.values(usersData);
    return Object.values(usersData).filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [usersData, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>Carregando...</div>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header totalModules={modulosCaos.length} totalExamples={modulosCaos.length * 3} />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6">
        {/* Page title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
              Painel de Atividades
            </h2>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              Acompanhe em tempo real quem votou e em qual cenario
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={refreshing}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: "var(--fips-cyan)",
              color: "#fff",
              opacity: refreshing ? 0.6 : 1,
            }}
          >
            {refreshing ? "Atualizando..." : "Atualizar"}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total de Votos", value: stats.totalVotes, icon: <BarChart3 size={20} />, color: "#0090d0", borderColor: "#0090d0" },
            { label: "Aprovados", value: stats.approved, icon: <Check size={20} />, color: "#00c64c", borderColor: "#00c64c" },
            { label: "Rejeitados", value: stats.rejected, icon: <X size={20} />, color: "#ef4444", borderColor: "#ef4444" },
            { label: "Participantes", value: stats.totalUsers, icon: <Users size={20} />, color: "#f6921e", borderColor: "#f6921e" },
            { label: "Progresso Medio", value: `${stats.avgProgress}%`, icon: <TrendingUp size={20} />, color: "#003b8f", borderColor: "#003b8f" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="p-5 rounded-[20px]"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${kpi.borderColor}`,
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.borderColor}15`, color: kpi.color }}
                >
                  {kpi.icon}
                </div>
              </div>
              <p className="text-2xl font-extrabold" style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}>
                {kpi.value}
              </p>
              <p className="text-[11px] font-medium mt-1" style={{ color: "var(--foreground-muted)" }}>
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Users + votes */}
          <div className="lg:col-span-2">
            <div
              className="rounded-[20px] overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  <Users size={16} style={{ color: "var(--fips-blue)" }} />
                  <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    Votos por Usuario ({filteredUsers.length})
                  </h3>
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-subtle)" }} />
                  <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
                    style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                  />
                </div>
              </div>

              {/* User list */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>Nenhum voto registrado ainda</p>
                  </div>
                )}

                {filteredUsers.map((userData) => {
                  const isExpanded = expandedUser === userData.email;
                  const approved = userData.votes.filter((v) => v.approved).length;
                  const rejected = userData.votes.filter((v) => !v.approved).length;
                  const progress = Math.round((userData.votes.length / stats.totalPossible) * 100);
                  const initials = userData.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

                  return (
                    <div key={userData.email} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      {/* User summary row */}
                      <div
                        className="flex items-center gap-3 px-6 py-4 cursor-pointer transition-all"
                        onClick={() => setExpandedUser(isExpanded ? null : userData.email)}
                        style={{ background: isExpanded ? "var(--bg-muted)" : "transparent" }}
                      >
                        {/* Avatar */}
                        {userData.avatar ? (
                          <img src={userData.avatar} alt="" className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
                        ) : (
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "linear-gradient(135deg, #f6921e, #e07310)" }}
                          >
                            {initials}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{userData.name}</p>
                          <p className="text-[11px] truncate" style={{ color: "var(--foreground-subtle)" }}>{userData.email}</p>
                        </div>

                        {/* Stats badges */}
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ background: "rgba(0,198,76,0.1)", color: "#00c64c" }}>
                            <Check size={10} /> {approved}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                            <X size={10} /> {rejected}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(0,144,208,0.1)", color: "#0090d0" }}>
                            {progress}%
                          </span>
                        </div>

                        {isExpanded ? <ChevronUp size={16} style={{ color: "var(--foreground-subtle)" }} /> : <ChevronDown size={16} style={{ color: "var(--foreground-subtle)" }} />}
                      </div>

                      {/* Expanded: individual votes */}
                      {isExpanded && (
                        <div className="px-6 pb-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {userData.votes.map((vote) => (
                              <div
                                key={vote.id}
                                className="flex items-center gap-2 p-3 rounded-xl"
                                style={{
                                  background: vote.approved ? "rgba(0,198,76,0.04)" : "rgba(239,68,68,0.04)",
                                  border: `1px solid ${vote.approved ? "rgba(0,198,76,0.15)" : "rgba(239,68,68,0.15)"}`,
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                                  style={{ background: vote.approved ? "rgba(0,198,76,0.15)" : "rgba(239,68,68,0.15)" }}
                                >
                                  {vote.approved ? <Check size={11} color="#00c64c" /> : <X size={11} color="#ef4444" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-semibold truncate" style={{ color: "var(--foreground)" }}>
                                    {getExampleTitle(vote.example_id)}
                                  </p>
                                  <p className="text-[10px]" style={{ color: "var(--foreground-subtle)" }}>
                                    {vote.module_name} — {formatTime(vote.created_at)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Activity feed */}
          <div>
            <div
              className="rounded-[20px] overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  <Activity size={16} style={{ color: "var(--primary)" }} />
                  <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    Atividade Recente
                  </h3>
                </div>
              </div>

              <div className="max-h-[540px] overflow-y-auto">
                {recentActivity.length === 0 && (
                  <div className="text-center py-12">
                    <Clock size={24} style={{ color: "var(--foreground-subtle)", margin: "0 auto 8px" }} />
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>Nenhuma atividade ainda</p>
                  </div>
                )}

                {recentActivity.map((vote, i) => {
                  const initials = vote.voter_name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

                  return (
                    <div
                      key={vote.id || i}
                      className="flex items-start gap-3 px-5 py-3"
                      style={{ borderBottom: "1px solid var(--border-light)" }}
                    >
                      {vote.voter_avatar ? (
                        <img src={vote.voter_avatar} alt="" className="w-7 h-7 rounded-full mt-0.5" referrerPolicy="no-referrer" />
                      ) : (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white mt-0.5 flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #f6921e, #e07310)" }}
                        >
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] leading-snug" style={{ color: "var(--foreground)" }}>
                          <span className="font-semibold">{vote.voter_name.split(" ")[0]}</span>
                          {" "}
                          <span style={{ color: vote.approved ? "#00c64c" : "#ef4444" }}>
                            {vote.approved ? "aprovou" : "rejeitou"}
                          </span>
                          {" "}
                          <span className="font-medium">{getExampleTitle(vote.example_id)}</span>
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--foreground-subtle)" }}>
                          {vote.module_name} — {formatTime(vote.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
