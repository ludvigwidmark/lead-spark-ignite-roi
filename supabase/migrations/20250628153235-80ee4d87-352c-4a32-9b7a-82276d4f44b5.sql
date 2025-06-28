
-- Add columns to user_leads table to store call information
ALTER TABLE public.user_leads 
ADD COLUMN status TEXT DEFAULT 'pending',
ADD COLUMN call_duration INTEGER,
ADD COLUMN transcript TEXT,
ADD COLUMN meeting_booked BOOLEAN DEFAULT false,
ADD COLUMN qualified BOOLEAN,
ADD COLUMN call_completed_at TIMESTAMP WITH TIME ZONE;

-- Create an index on status for better query performance
CREATE INDEX idx_user_leads_status ON public.user_leads(status);
