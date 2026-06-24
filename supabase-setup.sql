-- ============================================================
-- VCard Pro — Supabase SQL Setup Complet
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. TABLE PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE VCARDS
CREATE TABLE IF NOT EXISTS public.vcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEX pour performances
CREATE INDEX IF NOT EXISTS vcards_user_id_idx ON public.vcards (user_id);
CREATE INDEX IF NOT EXISTS vcards_slug_idx ON public.vcards (slug);
CREATE INDEX IF NOT EXISTS vcards_primary_idx ON public.vcards (user_id, is_primary);
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles (username);

-- 4. ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vcards ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES PROFILES
DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_owner_insert" ON public.profiles;
CREATE POLICY "profiles_owner_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_owner_update" ON public.profiles;
CREATE POLICY "profiles_owner_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_owner_delete" ON public.profiles;
CREATE POLICY "profiles_owner_delete" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- 6. POLICIES VCARDS
DROP POLICY IF EXISTS "vcards_public_read" ON public.vcards;
CREATE POLICY "vcards_public_read" ON public.vcards
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "vcards_owner_insert" ON public.vcards;
CREATE POLICY "vcards_owner_insert" ON public.vcards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "vcards_owner_update" ON public.vcards;
CREATE POLICY "vcards_owner_update" ON public.vcards
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "vcards_owner_delete" ON public.vcards;
CREATE POLICY "vcards_owner_delete" ON public.vcards
  FOR DELETE USING (auth.uid() = user_id);

-- 7. STORAGE BUCKET pour avatars (exécuter si pas encore fait)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Policy storage: lecture publique
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Policy storage: upload par le propriétaire
DROP POLICY IF EXISTS "avatars_owner_upload" ON storage.objects;
CREATE POLICY "avatars_owner_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- 8. TRIGGER auto-updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS vcards_updated_at ON public.vcards;
CREATE TRIGGER vcards_updated_at
  BEFORE UPDATE ON public.vcards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- VERIFICATION : Doit retourner 'profiles' et 'vcards'
-- ============================================================
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('profiles', 'vcards');
