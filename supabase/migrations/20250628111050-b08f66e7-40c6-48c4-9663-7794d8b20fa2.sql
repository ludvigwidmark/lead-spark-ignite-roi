
-- Create a leads table that's properly linked to users
CREATE TABLE public.user_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  last_contact TEXT DEFAULT 'Just added',
  next_action TEXT DEFAULT 'Initial Contact Needed',
  custom_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_leads ENABLE ROW LEVEL SECURITY;

-- Create policies so users can only see their own leads
CREATE POLICY "Users can view their own leads"
  ON public.user_leads
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads"
  ON public.user_leads
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads"
  ON public.user_leads
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads"
  ON public.user_leads
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.user_leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
