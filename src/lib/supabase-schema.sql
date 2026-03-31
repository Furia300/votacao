-- =============================================
-- PLATAFORMA DE VOTACAO FIPS
-- Schema completo - Execute no Supabase SQL Editor
-- =============================================

-- Limpar tabelas antigas
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS voting_options CASCADE;
DROP TABLE IF EXISTS voting_items CASCADE;
DROP TABLE IF EXISTS project_members CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- =============================================
-- 1. PROJECTS
-- =============================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'voting', 'finalized', 'archived')),
  cover_image TEXT,
  created_by_email TEXT NOT NULL,
  created_by_name TEXT NOT NULL,
  created_by_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. PROJECT MEMBERS (quem vota)
-- =============================================
CREATE TABLE project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  role TEXT NOT NULL DEFAULT 'voter' CHECK (role IN ('owner', 'voter')),
  has_finalized BOOLEAN DEFAULT false,
  finalized_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_email)
);

-- =============================================
-- 3. VOTING ITEMS (cada item a ser votado)
-- =============================================
CREATE TABLE voting_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'single_choice' CHECK (type IN ('single_choice', 'image_select', 'approval')),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. VOTING OPTIONS (opcoes dentro de cada item)
-- =============================================
CREATE TABLE voting_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES voting_items(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  file_url TEXT,
  file_type TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. VOTES (1 voto por item por usuario)
-- =============================================
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES voting_options(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES voting_items(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  voter_email TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  voter_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(item_id, voter_email)
);

-- =============================================
-- 6. DOCUMENTS (PRDs, .md, anexos do projeto)
-- =============================================
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  content_md TEXT,
  uploaded_by_email TEXT NOT NULL,
  uploaded_by_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RLS (Row Level Security) - tudo publico (todos admin)
-- =============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_all" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON project_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON voting_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON voting_options FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON votes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON documents FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- INDICES
-- =============================================
CREATE INDEX idx_project_members_project ON project_members(project_id);
CREATE INDEX idx_project_members_email ON project_members(user_email);
CREATE INDEX idx_voting_items_project ON voting_items(project_id);
CREATE INDEX idx_voting_options_item ON voting_options(item_id);
CREATE INDEX idx_votes_item ON votes(item_id);
CREATE INDEX idx_votes_project ON votes(project_id);
CREATE INDEX idx_votes_voter ON votes(voter_email);
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_projects_status ON projects(status);
