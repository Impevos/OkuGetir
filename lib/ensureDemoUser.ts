import { getDemoUserProfileById } from '../src/lib/demoSession';
import { getSupabaseClient } from './supabaseClient';

/** Supabase'de demo kullanıcı yoksa profil satırını oluşturur (FK hatasını önler). */
export async function ensureDemoUserInSupabase(userId: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const profile = getDemoUserProfileById(userId);
  if (!profile) return;

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (existing) return;

  const { error } = await supabase.from('users').upsert(
    {
      id: profile.id,
      name: profile.name,
      email: profile.email,
    },
    { onConflict: 'id' },
  );

  if (error) throw new Error(error.message);
}
