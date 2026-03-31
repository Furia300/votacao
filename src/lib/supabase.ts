import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tsldyoygmcqlmqwqkjml.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabaseAnonKey) {
    throw new Error('Supabase anon key not configured');
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export interface Vote {
  id?: string;
  example_id: string;
  module_id: number;
  module_name: string;
  voter_name: string;
  approved: boolean;
  created_at?: string;
}

export async function submitVote(vote: Omit<Vote, 'id' | 'created_at'>) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('votes')
    .upsert(
      {
        example_id: vote.example_id,
        module_id: vote.module_id,
        module_name: vote.module_name,
        voter_name: vote.voter_name,
        approved: vote.approved,
      },
      { onConflict: 'example_id,voter_name' }
    )
    .select();

  if (error) throw error;
  return data;
}

export async function getVotes() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Vote[];
}

export async function getVoteSummary() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('votes')
    .select('example_id, module_id, module_name, approved');

  if (error) throw error;

  const summary: Record<string, { total: number; approved: number; module_id: number; module_name: string }> = {};

  (data || []).forEach((vote: { example_id: string; module_id: number; module_name: string; approved: boolean }) => {
    if (!summary[vote.example_id]) {
      summary[vote.example_id] = { total: 0, approved: 0, module_id: vote.module_id, module_name: vote.module_name };
    }
    summary[vote.example_id].total++;
    if (vote.approved) summary[vote.example_id].approved++;
  });

  return summary;
}
