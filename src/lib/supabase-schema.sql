-- Supabase SQL para criar a tabela de votos
-- Execute este SQL no Supabase SQL Editor

-- Dropar tabela antiga se existir
DROP TABLE IF EXISTS votes;

CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  example_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  module_name TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  voter_email TEXT NOT NULL,
  voter_avatar TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(example_id, voter_email)
);

-- Habilitar RLS
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Politica para permitir leitura publica (todos sao admin)
CREATE POLICY "Allow public read" ON votes
  FOR SELECT USING (true);

-- Politica para permitir insercao publica
CREATE POLICY "Allow public insert" ON votes
  FOR INSERT WITH CHECK (true);

-- Politica para permitir update publico
CREATE POLICY "Allow public update" ON votes
  FOR UPDATE USING (true);

-- Indices para performance
CREATE INDEX idx_votes_example_id ON votes(example_id);
CREATE INDEX idx_votes_voter_email ON votes(voter_email);
CREATE INDEX idx_votes_created_at ON votes(created_at DESC);
