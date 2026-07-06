CREATE TABLE public.institute_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_slug text NOT NULL,
  institute_name text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  background text,
  message text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT institute_inquiries_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT institute_inquiries_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT institute_inquiries_background_len CHECK (background IS NULL OR char_length(background) <= 400),
  CONSTRAINT institute_inquiries_message_len CHECK (message IS NULL OR char_length(message) <= 2000),
  CONSTRAINT institute_inquiries_slug_len CHECK (char_length(institute_slug) BETWEEN 1 AND 120)
);

GRANT INSERT ON public.institute_inquiries TO anon;
GRANT SELECT, INSERT ON public.institute_inquiries TO authenticated;
GRANT ALL ON public.institute_inquiries TO service_role;

ALTER TABLE public.institute_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry. If they are signed in, user_id must match their auth id (or be null).
CREATE POLICY "Anyone can submit an inquiry"
  ON public.institute_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Signed-in users can see their own inquiries.
CREATE POLICY "Users can view their own inquiries"
  ON public.institute_inquiries
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admins can view every inquiry.
CREATE POLICY "Admins can view all inquiries"
  ON public.institute_inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX institute_inquiries_institute_slug_idx ON public.institute_inquiries (institute_slug);
CREATE INDEX institute_inquiries_created_at_idx ON public.institute_inquiries (created_at DESC);