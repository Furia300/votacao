"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  createProject,
  addProjectMember,
  createVotingItem,
  createVotingOption,
  createDocument,
} from "@/lib/supabase";
import LoginScreen from "@/components/LoginScreen";
import {
  Plus,
  Trash2,
  FileText,
  Image,
  Users,
  ArrowLeft,
  Sparkles,
  X,
  CheckSquare,
  List,
} from "lucide-react";

// ---------- local types ----------

interface LocalOption {
  label: string;
  description: string;
  image_url: string;
}

interface LocalVotingItem {
  title: string;
  description: string;
  type: "single_choice" | "image_select" | "approval";
  options: LocalOption[];
}

interface LocalDocument {
  title: string;
  content_md: string;
}

// ---------- style helpers ----------

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#fff",
  border: "2px solid var(--border, #e2e8f0)",
  borderRadius: 14,
  padding: "12px 16px",
  fontSize: 14,
  fontFamily: "Manrope, sans-serif",
  color: "var(--foreground)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
};

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card, #ffffff)",
  border: "1px solid var(--border, #e2e8f0)",
  borderRadius: 20,
  padding: 28,
  boxShadow: "var(--shadow-card)",
};

const primaryBtn: React.CSSProperties = {
  background: "var(--fips-cyan, #3ca9c9)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: 12,
  padding: "12px 24px",
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "Manrope, sans-serif",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const secondaryBtn: React.CSSProperties = {
  background: "var(--primary, #f6921e)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: 12,
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "Manrope, sans-serif",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const outlineBtn: React.CSSProperties = {
  background: "transparent",
  border: "2px solid var(--border, #e2e8f0)",
  color: "var(--primary, #f6921e)",
  fontWeight: 600,
  borderRadius: 12,
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "Manrope, sans-serif",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const dangerBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
  padding: 6,
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--foreground-muted)",
  marginBottom: 6,
  display: "block",
  fontFamily: "Manrope, sans-serif",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "var(--foreground)",
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 16,
  fontFamily: "Manrope, sans-serif",
};

// ---------- component ----------

export default function NovoProjetoPage() {
  const { user, loading, supabase } = useAuth();
  const router = useRouter();

  // Project info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Members
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  // Voting items
  const [votingItems, setVotingItems] = useState<LocalVotingItem[]>([]);

  // Documents
  const [documents, setDocuments] = useState<LocalDocument[]>([]);

  // Claude AI
  const [claudeInput, setClaudeInput] = useState("");

  // Submitting
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg, #f4f6fb)",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <p style={{ color: "var(--foreground-muted)" }}>Carregando...</p>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  const userEmail = user.email || "";
  const userName = user.user_metadata?.full_name || userEmail.split("@")[0];
  const userAvatar = user.user_metadata?.avatar_url || null;

  // ---------- members ----------

  function handleAddMember() {
    const email = memberEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) return;
    if (email === userEmail) return;
    if (members.includes(email)) return;
    setMembers((prev) => [...prev, email]);
    setMemberEmail("");
  }

  function handleRemoveMember(email: string) {
    setMembers((prev) => prev.filter((m) => m !== email));
  }

  // ---------- voting items ----------

  function addVotingItem() {
    setVotingItems((prev) => [
      ...prev,
      { title: "", description: "", type: "single_choice", options: [] },
    ]);
  }

  function updateVotingItem(idx: number, field: keyof LocalVotingItem, value: string) {
    setVotingItems((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        if (field === "type") {
          return { ...item, type: value as LocalVotingItem["type"], options: [] };
        }
        return { ...item, [field]: value };
      })
    );
  }

  function removeVotingItem(idx: number) {
    setVotingItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function addOption(itemIdx: number) {
    setVotingItems((prev) =>
      prev.map((item, i) =>
        i === itemIdx
          ? { ...item, options: [...item.options, { label: "", description: "", image_url: "" }] }
          : item
      )
    );
  }

  function updateOption(
    itemIdx: number,
    optIdx: number,
    field: keyof LocalOption,
    value: string
  ) {
    setVotingItems((prev) =>
      prev.map((item, i) =>
        i === itemIdx
          ? {
              ...item,
              options: item.options.map((opt, j) =>
                j === optIdx ? { ...opt, [field]: value } : opt
              ),
            }
          : item
      )
    );
  }

  function removeOption(itemIdx: number, optIdx: number) {
    setVotingItems((prev) =>
      prev.map((item, i) =>
        i === itemIdx
          ? { ...item, options: item.options.filter((_, j) => j !== optIdx) }
          : item
      )
    );
  }

  // ---------- documents ----------

  function addDocument() {
    setDocuments((prev) => [...prev, { title: "", content_md: "" }]);
  }

  function updateDocument(idx: number, field: keyof LocalDocument, value: string) {
    setDocuments((prev) =>
      prev.map((doc, i) => (i === idx ? { ...doc, [field]: value } : doc))
    );
  }

  function removeDocument(idx: number) {
    setDocuments((prev) => prev.filter((_, i) => i !== idx));
  }

  // ---------- submit ----------

  async function handleSubmit() {
    if (!supabase) return;
    if (!name.trim()) {
      alert("Informe o nome do projeto.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Create project
      const project = await createProject(supabase, {
        name: name.trim(),
        description: description.trim() || null,
        cover_image: coverImage.trim() || null,
        status: "draft",
        created_by_email: userEmail,
        created_by_name: userName,
        created_by_avatar: userAvatar,
      });

      // 2. Add owner
      await addProjectMember(supabase, {
        project_id: project.id,
        user_email: userEmail,
        user_name: userName,
        user_avatar: userAvatar,
        role: "owner",
      });

      // 3. Add members
      for (const email of members) {
        await addProjectMember(supabase, {
          project_id: project.id,
          user_email: email,
          user_name: email.split("@")[0],
          user_avatar: null,
          role: "voter",
        });
      }

      // 4. Create voting items + options
      for (let i = 0; i < votingItems.length; i++) {
        const vi = votingItems[i];
        if (!vi.title.trim()) continue;

        const createdItem = await createVotingItem(supabase, {
          project_id: project.id,
          title: vi.title.trim(),
          description: vi.description.trim() || null,
          type: vi.type,
          position: i,
        });

        for (let j = 0; j < vi.options.length; j++) {
          const opt = vi.options[j];
          if (!opt.label.trim()) continue;

          await createVotingOption(supabase, {
            item_id: createdItem.id,
            project_id: project.id,
            label: opt.label.trim(),
            description: opt.description.trim() || null,
            image_url: opt.image_url.trim() || null,
            position: j,
          });
        }
      }

      // 5. Create documents
      for (const doc of documents) {
        if (!doc.title.trim()) continue;
        await createDocument(supabase, {
          project_id: project.id,
          title: doc.title.trim(),
          content_md: doc.content_md || null,
          uploaded_by_email: userEmail,
          uploaded_by_name: userName,
        });
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar projeto. Verifique o console.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---------- render helpers ----------

  function renderTypeIcon(type: LocalVotingItem["type"]) {
    switch (type) {
      case "single_choice":
        return <List size={16} />;
      case "image_select":
        return <Image size={16} />;
      case "approval":
        return <CheckSquare size={16} />;
    }
  }

  function renderOptionFields(item: LocalVotingItem, itemIdx: number) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {item.options.map((opt, optIdx) => (
          <div
            key={optIdx}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              background: "var(--bg, #f4f6fb)",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <input
                style={inputStyle}
                placeholder="Label da opcao"
                value={opt.label}
                onChange={(e) => updateOption(itemIdx, optIdx, "label", e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {item.type === "single_choice" && (
                <input
                  style={inputStyle}
                  placeholder="Descricao (opcional)"
                  value={opt.description}
                  onChange={(e) =>
                    updateOption(itemIdx, optIdx, "description", e.target.value)
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              )}
              {item.type === "image_select" && (
                <input
                  style={inputStyle}
                  placeholder="URL da imagem"
                  value={opt.image_url}
                  onChange={(e) =>
                    updateOption(itemIdx, optIdx, "image_url", e.target.value)
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              )}
            </div>
            <button style={dangerBtn} onClick={() => removeOption(itemIdx, optIdx)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button style={outlineBtn} onClick={() => addOption(itemIdx)}>
          <Plus size={16} /> Adicionar opcao
        </button>
      </div>
    );
  }

  // ---------- focus / blur for inputs ----------

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "var(--fips-blue, #0090d0)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,144,208,0.12)";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "var(--border, #e2e8f0)";
    e.currentTarget.style.boxShadow = "none";
  }

  // ---------- main render ----------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg, #f4f6fb)",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "var(--bg-card, #ffffff)",
          borderBottom: "1px solid var(--border, #e2e8f0)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            ...outlineBtn,
            padding: "8px 14px",
          }}
        >
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          Novo Projeto de Votacao
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "32px 20px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* -------- Section: Project Info -------- */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <FileText size={20} style={{ color: "var(--fips-cyan, #3ca9c9)" }} />
            Informacoes do Projeto
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Nome do Projeto *</label>
              <input
                style={inputStyle}
                placeholder="Ex: Votacao de Design Q1 2026"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label style={labelStyle}>Descricao</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                placeholder="Descreva o objetivo deste projeto de votacao..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label style={labelStyle}>Imagem de Capa (URL, opcional)</label>
              <input
                style={inputStyle}
                placeholder="https://exemplo.com/imagem.jpg"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* -------- Section: Members -------- */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <Users size={20} style={{ color: "var(--primary, #f6921e)" }} />
            Membros
          </div>

          {/* Owner badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              padding: "10px 14px",
              background: "rgba(60, 169, 201, 0.08)",
              borderRadius: 12,
            }}
          >
            {userAvatar && (
              <img
                src={userAvatar}
                alt=""
                style={{ width: 28, height: 28, borderRadius: "50%" }}
              />
            )}
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
              {userName}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                background: "var(--fips-cyan, #3ca9c9)",
                borderRadius: 6,
                padding: "2px 8px",
                textTransform: "uppercase",
              }}
            >
              Owner
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--foreground-subtle, #7b8c96)",
                marginLeft: "auto",
              }}
            >
              {userEmail}
            </span>
          </div>

          {/* Add member input */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="email@exemplo.com"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button style={secondaryBtn} onClick={handleAddMember}>
              <Plus size={16} /> Adicionar
            </button>
          </div>

          {/* Member list */}
          {members.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {members.map((email) => (
                <div
                  key={email}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "var(--bg, #f4f6fb)",
                    borderRadius: 10,
                    fontSize: 14,
                    color: "var(--foreground)",
                  }}
                >
                  <span>{email}</span>
                  <button style={dangerBtn} onClick={() => handleRemoveMember(email)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {members.length === 0 && (
            <p
              style={{
                fontSize: 13,
                color: "var(--foreground-subtle, #7b8c96)",
                margin: 0,
              }}
            >
              Adicione os e-mails dos votantes. Eles serao vinculados ao projeto quando fizerem login.
            </p>
          )}
        </div>

        {/* -------- Section: Voting Items -------- */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <List size={20} style={{ color: "var(--fips-cyan, #3ca9c9)" }} />
            Itens de Votacao
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {votingItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--border, #e2e8f0)",
                  borderRadius: 16,
                  padding: 20,
                  background: "var(--bg, #f4f6fb)",
                }}
              >
                {/* Item header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--foreground)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {renderTypeIcon(item.type)} Item {idx + 1}
                  </span>
                  <button style={dangerBtn} onClick={() => removeVotingItem(idx)}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input
                    style={inputStyle}
                    placeholder="Titulo do item (ex: Escolha a imagem do quadrinho)"
                    value={item.title}
                    onChange={(e) => updateVotingItem(idx, "title", e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />

                  <input
                    style={inputStyle}
                    placeholder="Descricao (opcional)"
                    value={item.description}
                    onChange={(e) => updateVotingItem(idx, "description", e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />

                  <div>
                    <label style={labelStyle}>Tipo de Votacao</label>
                    <select
                      value={item.type}
                      onChange={(e) => updateVotingItem(idx, "type", e.target.value)}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "auto" as const,
                      }}
                    >
                      <option value="single_choice">Escolha unica (texto)</option>
                      <option value="image_select">Selecao de imagem</option>
                      <option value="approval">Aprovacao (aprovar/rejeitar)</option>
                    </select>
                  </div>

                  {/* Options */}
                  <div>
                    <label style={labelStyle}>Opcoes</label>
                    {renderOptionFields(item, idx)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            style={{ ...outlineBtn, marginTop: votingItems.length > 0 ? 16 : 0 }}
            onClick={addVotingItem}
          >
            <Plus size={16} /> Adicionar item de votacao
          </button>
        </div>

        {/* -------- Section: Documents -------- */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <FileText size={20} style={{ color: "var(--primary, #f6921e)" }} />
            Documentos
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {documents.map((doc, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--border, #e2e8f0)",
                  borderRadius: 16,
                  padding: 20,
                  background: "var(--bg, #f4f6fb)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}
                  >
                    Documento {idx + 1}
                  </span>
                  <button style={dangerBtn} onClick={() => removeDocument(idx)}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input
                    style={inputStyle}
                    placeholder="Titulo do documento"
                    value={doc.title}
                    onChange={(e) => updateDocument(idx, "title", e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                    placeholder="Cole o conteudo Markdown aqui..."
                    value={doc.content_md}
                    onChange={(e) => updateDocument(idx, "content_md", e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            style={{ ...outlineBtn, marginTop: documents.length > 0 ? 16 : 0 }}
            onClick={addDocument}
          >
            <Plus size={16} /> Adicionar documento
          </button>
        </div>

        {/* -------- Section: Claude AI -------- */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <Sparkles size={20} style={{ color: "#a855f7" }} />
            Gerar com Claude AI
          </div>

          <p
            style={{
              fontSize: 13,
              color: "var(--foreground-subtle, #7b8c96)",
              margin: "0 0 12px",
            }}
          >
            Cole um arquivo .md com o briefing do projeto. A IA pode gerar itens de votacao
            automaticamente.
          </p>

          <textarea
            style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
            placeholder="Cole o conteudo do arquivo .md aqui..."
            value={claudeInput}
            onChange={(e) => setClaudeInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <button
            style={{ ...secondaryBtn, marginTop: 12 }}
            onClick={() =>
              alert("Conecte a API Key do Claude nas configuracoes")
            }
          >
            <Sparkles size={16} /> Gerar Votacao com IA
          </button>
        </div>

        {/* -------- Submit -------- */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button style={outlineBtn} onClick={() => router.push("/")}>
            Cancelar
          </button>
          <button
            style={{
              ...primaryBtn,
              opacity: submitting ? 0.6 : 1,
              pointerEvents: submitting ? "none" : "auto",
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Criando..." : "Criar Projeto"}
          </button>
        </div>
      </div>
    </div>
  );
}
