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
    let isMounted = true;

    // Timeout guard so loading state never gets stuck
    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 4000);

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Auth getSession error:", err);
        if (isMounted) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      let { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      // Si le profil n'existe pas (ex: erreur de trigger lors de l'inscription)
      if (!data) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          // Tente de créer le profil manuellement
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                username: 'user_' + userId.substring(0, 8),
                display_name: userData.user.email?.split('@')[0] || 'Utilisateur',
              }
            ])
            .select()
            .maybeSingle();
          data = newProfile;
        }
      }

      setProfile(data);
    } catch (err) {
      console.error("fetchProfile error:", err);
    } finally {
      setLoading(false);
    }
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
