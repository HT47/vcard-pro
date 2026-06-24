import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
    setLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  return { user, session, profile, loading, signOut, refetchProfile: () => user && fetchProfile(user.id) };
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username.toLowerCase())
    .single();
  return !data;
}

export function isValidUsername(username: string): boolean {
  return /^[a-z0-9_-]{3,20}$/.test(username);
}
