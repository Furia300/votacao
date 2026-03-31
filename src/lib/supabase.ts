import type { SupabaseClient } from '@supabase/supabase-js';

export interface Vote {
  id?: string;
  example_id: string;
  module_id: number;
  module_name: string;
  voter_name: string;
  voter_email: string;
  voter_avatar?: string;
  approved: boolean;
  created_at?: string;
}

export async function submitVote(supabase: SupabaseClient, vote: Omit<Vote, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('votes')
    .upsert(
      {
        example_id: vote.example_id,
        module_id: vote.module_id,
        module_name: vote.module_name,
        voter_name: vote.voter_name,
        voter_email: vote.voter_email,
        voter_avatar: vote.voter_avatar || null,
        approved: vote.approved,
      },
      { onConflict: 'example_id,voter_email' }
    )
    .select();

  if (error) throw error;
  return data;
}

export async function getVotes(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Vote[];
}

export async function getMyVotes(supabase: SupabaseClient, email: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('voter_email', email)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Vote[];
}

export async function getAllVotesGroupedByUser(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const grouped: Record<string, { name: string; email: string; avatar?: string; votes: Vote[] }> = {};

  (data as Vote[] || []).forEach((vote) => {
    if (!grouped[vote.voter_email]) {
      grouped[vote.voter_email] = {
        name: vote.voter_name,
        email: vote.voter_email,
        avatar: vote.voter_avatar,
        votes: [],
      };
    }
    grouped[vote.voter_email].votes.push(vote);
  });

  return grouped;
}
