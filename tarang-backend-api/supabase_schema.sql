-- Create the profiles table to store public user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  username TEXT UNIQUE,
  profile_picture_url TEXT,
  bio TEXT,
  email TEXT UNIQUE,
  roles TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user.';
COMMENT ON COLUMN public.profiles.id IS 'Links to the corresponding user in auth.users.';

-- Enable Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to see their own profile
CREATE POLICY "Users can see their own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);
  
-- Create a policy that allows users to see all profiles
CREATE POLICY "Users can see all profiles." ON public.profiles
  FOR SELECT USING (true);

-- Create a policy that allows users to insert their own profile
-- Note: The seed script uses the service_role key, which bypasses RLS.
-- This policy is for allowing users to create their own profile from the app if needed.
CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a policy that allows users to update their own profile
CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
