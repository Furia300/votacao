import type { SupabaseClient } from '@supabase/supabase-js';

// ==================== TYPES ====================

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: 'draft' | 'voting' | 'finalized' | 'archived';
  cover_image: string | null;
  created_by_email: string;
  created_by_name: string;
  created_by_avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_email: string;
  user_name: string;
  user_avatar: string | null;
  role: 'owner' | 'voter';
  has_finalized: boolean;
  finalized_at: string | null;
  created_at: string;
}

export interface VotingItem {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  type: 'single_choice' | 'image_select' | 'approval';
  position: number;
  created_at: string;
}

export interface VotingOption {
  id: string;
  item_id: string;
  project_id: string;
  label: string;
  description: string | null;
  image_url: string | null;
  file_url: string | null;
  file_type: string | null;
  position: number;
  created_at: string;
}

export interface Vote {
  id: string;
  option_id: string;
  item_id: string;
  project_id: string;
  voter_email: string;
  voter_name: string;
  voter_avatar: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  title: string;
  file_url: string | null;
  file_type: string | null;
  content_md: string | null;
  uploaded_by_email: string;
  uploaded_by_name: string;
  created_at: string;
}

// ==================== PROJECTS ====================

export async function getProjects(sb: SupabaseClient) {
  const { data, error } = await sb.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Project[];
}

export async function getProject(sb: SupabaseClient, id: string) {
  const { data, error } = await sb.from('projects').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Project;
}

export async function createProject(sb: SupabaseClient, project: Partial<Project>) {
  const { data, error } = await sb.from('projects').insert(project).select().single();
  if (error) throw error;
  return data as Project;
}

export async function updateProjectStatus(sb: SupabaseClient, id: string, status: Project['status']) {
  const { error } = await sb.from('projects').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) throw error;
}

// ==================== MEMBERS ====================

export async function getProjectMembers(sb: SupabaseClient, projectId: string) {
  const { data, error } = await sb.from('project_members').select('*').eq('project_id', projectId);
  if (error) throw error;
  return data as ProjectMember[];
}

export async function addProjectMember(sb: SupabaseClient, member: Partial<ProjectMember>) {
  const { data, error } = await sb.from('project_members').upsert(member, { onConflict: 'project_id,user_email' }).select().single();
  if (error) throw error;
  return data as ProjectMember;
}

export async function finalizeMemberVote(sb: SupabaseClient, projectId: string, email: string) {
  const { error } = await sb.from('project_members')
    .update({ has_finalized: true, finalized_at: new Date().toISOString() })
    .eq('project_id', projectId)
    .eq('user_email', email);
  if (error) throw error;
}

// ==================== VOTING ITEMS ====================

export async function getVotingItems(sb: SupabaseClient, projectId: string) {
  const { data, error } = await sb.from('voting_items').select('*').eq('project_id', projectId).order('position');
  if (error) throw error;
  return data as VotingItem[];
}

export async function createVotingItem(sb: SupabaseClient, item: Partial<VotingItem>) {
  const { data, error } = await sb.from('voting_items').insert(item).select().single();
  if (error) throw error;
  return data as VotingItem;
}

// ==================== VOTING OPTIONS ====================

export async function getVotingOptions(sb: SupabaseClient, projectId: string) {
  const { data, error } = await sb.from('voting_options').select('*').eq('project_id', projectId).order('position');
  if (error) throw error;
  return data as VotingOption[];
}

export async function createVotingOption(sb: SupabaseClient, option: Partial<VotingOption>) {
  const { data, error } = await sb.from('voting_options').insert(option).select().single();
  if (error) throw error;
  return data as VotingOption;
}

// ==================== VOTES ====================

export async function getProjectVotes(sb: SupabaseClient, projectId: string) {
  const { data, error } = await sb.from('votes').select('*').eq('project_id', projectId).order('created_at', { ascending: false });
  if (error) throw error;
  return data as Vote[];
}

export async function submitVote(sb: SupabaseClient, vote: Omit<Vote, 'id' | 'created_at'>) {
  const { data, error } = await sb.from('votes')
    .upsert(vote, { onConflict: 'item_id,voter_email' })
    .select().single();
  if (error) throw error;
  return data as Vote;
}

// ==================== DOCUMENTS ====================

export async function getProjectDocuments(sb: SupabaseClient, projectId: string) {
  const { data, error } = await sb.from('documents').select('*').eq('project_id', projectId).order('created_at', { ascending: false });
  if (error) throw error;
  return data as Document[];
}

export async function createDocument(sb: SupabaseClient, doc: Partial<Document>) {
  const { data, error } = await sb.from('documents').insert(doc).select().single();
  if (error) throw error;
  return data as Document;
}

// ==================== FILE UPLOAD ====================

const ACCEPTED_EXTENSIONS = [
  '.doc', '.docx', '.ppt', '.pptx', '.pdf', '.md', '.txt',
  '.jpeg', '.jpg', '.png', '.svg', '.gif', '.webp',
  '.xls', '.xlsx', '.csv', '.json',
];

export function isAcceptedFile(filename: string): boolean {
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  return ACCEPTED_EXTENSIONS.includes(ext);
}

export function getAcceptString(): string {
  return ACCEPTED_EXTENSIONS.join(',');
}

export async function uploadFile(sb: SupabaseClient, projectId: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const safeName = `${projectId}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await sb.storage.from('project-files').upload(safeName, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  const { data } = sb.storage.from('project-files').getPublicUrl(safeName);
  return data.publicUrl;
}

// ==================== WINNERS / RESULTS ====================

export async function getWinningOptions(sb: SupabaseClient, projectId: string) {
  const [items, options, allVotes] = await Promise.all([
    getVotingItems(sb, projectId),
    getVotingOptions(sb, projectId),
    getProjectVotes(sb, projectId),
  ]);

  const results: Array<{
    item: VotingItem;
    winner: VotingOption | null;
    voteCount: number;
    totalVotes: number;
  }> = [];

  for (const item of items) {
    const itemOpts = options.filter(o => o.item_id === item.id);
    const itemVotes = allVotes.filter(v => v.item_id === item.id);

    let maxCount = 0;
    let winnerId: string | null = null;

    for (const opt of itemOpts) {
      const count = itemVotes.filter(v => v.option_id === opt.id).length;
      if (count > maxCount) {
        maxCount = count;
        winnerId = opt.id;
      }
    }

    results.push({
      item,
      winner: itemOpts.find(o => o.id === winnerId) ?? null,
      voteCount: maxCount,
      totalVotes: itemVotes.length,
    });
  }

  return results;
}

export async function getFinalizedProjects(sb: SupabaseClient) {
  const { data, error } = await sb.from('projects')
    .select('*')
    .eq('status', 'finalized')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data as Project[];
}
