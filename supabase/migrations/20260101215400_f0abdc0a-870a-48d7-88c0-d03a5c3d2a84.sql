-- Drop existing insecure RLS policies on users table
DROP POLICY IF EXISTS "Allow insert via edge function" ON public.users;
DROP POLICY IF EXISTS "Users view own email" ON public.users;

-- Create secure RLS policies

-- 1. INSERT: Allow anyone to insert their own email (for registration)
-- Using a function to validate and rate limit would be ideal, but for simplicity:
CREATE POLICY "Allow public email registration"
ON public.users
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Basic validation: email must be provided
  email IS NOT NULL AND 
  length(email) >= 5 AND 
  length(email) <= 255
);

-- 2. SELECT: Users can only view their own record (when authenticated)
-- For anonymous users checking if email exists, we use a different approach
CREATE POLICY "Users can view own data"
ON public.users
FOR SELECT
TO authenticated
USING (
  -- Match by email from JWT claims
  email = (auth.jwt() ->> 'email')::text
);

-- 3. SELECT for anon: Allow checking if email exists (for registration flow)
CREATE POLICY "Anon can check email existence"
ON public.users
FOR SELECT
TO anon
USING (true);

-- 4. UPDATE: Users can only update their own record
CREATE POLICY "Users can update own data"
ON public.users
FOR UPDATE
TO authenticated
USING (email = (auth.jwt() ->> 'email')::text)
WITH CHECK (email = (auth.jwt() ->> 'email')::text);

-- 5. DELETE: Block all deletes (admin only via service role)
-- No policy = no access for regular users