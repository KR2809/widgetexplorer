-- Create emails table for waitlist
CREATE TABLE IF NOT EXISTS emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  home_city VARCHAR(100),
  home_country VARCHAR(100),
  travel_interest VARCHAR(100),
  referred_by UUID REFERENCES emails(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_emails_email ON emails(email);

-- Create index on referred_by for faster lookups
CREATE INDEX IF NOT EXISTS idx_emails_referred_by ON emails(referred_by);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Allow insert for anyone (since this is a waitlist)
CREATE POLICY "Allow public insert" ON emails
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow read for service role only (for admin purposes)
CREATE POLICY "Allow service role read" ON emails
  FOR SELECT
  TO service_role
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_emails_updated_at
  BEFORE UPDATE ON emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
