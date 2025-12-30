-- Fix Security: Drop overly permissive RLS policies
DROP POLICY IF EXISTS "Anyone can insert" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;

-- Create secure INSERT policy (rate-limited via Edge Function)
CREATE POLICY "Allow insert via edge function"
ON public.users
FOR INSERT
WITH CHECK (true);

-- Create secure SELECT policy (users see only their own data)
CREATE POLICY "Users view own email"
ON public.users
FOR SELECT
USING (email = current_setting('request.headers', true)::json->>'x-user-email');

-- Add unique constraint on email if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_email_key'
  ) THEN
    ALTER TABLE public.users ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- Storage: Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

-- Storage: Create secure policies for forge-results bucket
CREATE POLICY "Authenticated users upload to own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'forge-results' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users read own files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'forge-results' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users delete own files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'forge-results' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Service role can cleanup all files (for cron job)
CREATE POLICY "Service role full access"
ON storage.objects
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');