-- Supabase SQL para criar a tabela de votos
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  example_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  module_name TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(example_id, voter_name)
);

-- Habilitar RLS
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Politica para permitir leitura publica
CREATE POLICY "Allow public read" ON votes
  FOR SELECT USING (true);

-- Politica para permitir insercao publica
CREATE POLICY "Allow public insert" ON votes
  FOR INSERT WITH CHECK (true);

-- Politica para permitir update publico
CREATE POLICY "Allow public update" ON votes
  FOR UPDATE USING (true);

-- Indice para performance
CREATE INDEX idx_votes_example_id ON votes(example_id);
CREATE INDEX idx_votes_voter_name ON votes(voter_name);
