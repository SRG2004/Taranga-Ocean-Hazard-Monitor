-- Create hazards table
CREATE TABLE public.hazards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  media_urls TEXT[],
  reported_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.hazards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view hazards" ON public.hazards
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert hazards" ON public.hazards
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can update their own hazards" ON public.hazards
  FOR UPDATE USING (auth.uid() = reported_by);

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policies
CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
