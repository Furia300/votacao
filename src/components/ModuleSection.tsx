"use client";

import type { ModuloCaos } from "@/data/modulosCaos";
import ChaosCard from "./ChaosCard";
import {
  Scale, Handshake, HardHat, AlertTriangle, FileText, ShoppingCart,
  GraduationCap, Monitor, Cake, ClipboardCheck, Train, Lightbulb,
  Settings, Shield, UserX, Stethoscope, Calendar, Users,
  LayoutDashboard, AlertCircle, Target, BookOpen, Fuel,
  BarChart3, ClipboardList, Truck, UserCheck, FileWarning,
  BoxSelect, RotateCw, Gauge, Ban, AlertOctagon, ArrowRightLeft,
  ArrowDownToLine, ArrowUpFromLine, XCircle, Calculator, Network,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale size={20} />,
  Handshake: <Handshake size={20} />,
  HardHat: <HardHat size={20} />,
  AlertTriangle: <AlertTriangle size={20} />,
  FileText: <FileText size={20} />,
  ShoppingCart: <ShoppingCart size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Monitor: <Monitor size={20} />,
  Cake: <Cake size={20} />,
  ClipboardCheck: <ClipboardCheck size={20} />,
  Train: <Train size={20} />,
  Lightbulb: <Lightbulb size={20} />,
  Settings: <Settings size={20} />,
  Shield: <Shield size={20} />,
  UserX: <UserX size={20} />,
  Stethoscope: <Stethoscope size={20} />,
  Calendar: <Calendar size={20} />,
  Users: <Users size={20} />,
  LayoutDashboard: <LayoutDashboard size={20} />,
  AlertCircle: <AlertCircle size={20} />,
  Target: <Target size={20} />,
  BookOpen: <BookOpen size={20} />,
  Fuel: <Fuel size={20} />,
  BarChart3: <BarChart3 size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  Truck: <Truck size={20} />,
  UserCheck: <UserCheck size={20} />,
  FileWarning: <FileWarning size={20} />,
  BoxSelect: <BoxSelect size={20} />,
  RotateCw: <RotateCw size={20} />,
  Gauge: <Gauge size={20} />,
  Ban: <Ban size={20} />,
  AlertOctagon: <AlertOctagon size={20} />,
  ArrowRightLeft: <ArrowRightLeft size={20} />,
  ArrowDownToLine: <ArrowDownToLine size={20} />,
  ArrowUpFromLine: <ArrowUpFromLine size={20} />,
  XCircle: <XCircle size={20} />,
  Calculator: <Calculator size={20} />,
  Network: <Network size={20} />,
};

interface ModuleSectionProps {
  module: ModuloCaos;
  voterName: string;
  votes: Record<string, boolean>;
  onVote: (exampleId: string, moduleId: number, moduleName: string, approved: boolean) => void;
}

export default function ModuleSection({ module, voterName, votes, onVote }: ModuleSectionProps) {
  const moduleVotes = module.examples.map((ex) => votes[ex.id]);
  const allVoted = moduleVotes.every((v) => v !== undefined);
  const approvedCount = moduleVotes.filter((v) => v === true).length;

  return (
    <div
      className="rounded-[20px] border overflow-hidden animate-fade-up"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Module header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{
          background: "var(--gradient-hero)",
          borderBottom: "1px solid var(--surface-dark-border)",
        }}
      >
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #f6921e 0%, #e07310 100%)",
            boxShadow: "0 4px 12px -4px rgba(246, 146, 30, 0.4)",
            color: "#fff",
          }}
        >
          {iconMap[module.icon] || <FileText size={20} />}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">{module.name}</h3>
          <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
            {module.sector}
          </p>
        </div>
        {allVoted && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            {approvedCount}/3 aprovados
          </div>
        )}
      </div>

      {/* Chaos examples grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {module.examples.map((example, idx) => (
          <ChaosCard
            key={example.id}
            module={module}
            example={example}
            index={idx}
            voterName={voterName}
            currentVote={votes[example.id]}
            onVote={onVote}
          />
        ))}
      </div>
    </div>
  );
}
