-- Create users table
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  continent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own data
CREATE POLICY "Users can view own data"
ON public.users
FOR SELECT
USING (true);

-- Policy: anyone can insert (for email gate)
CREATE POLICY "Anyone can insert"
ON public.users
FOR INSERT
WITH CHECK (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('forge-results', 'forge-results', true);

-- Storage policy: public read access
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'forge-results');

-- Storage policy: authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'forge-results');