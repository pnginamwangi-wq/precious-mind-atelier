CREATE TABLE public.saved_institutes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institute_slug text NOT NULL,
  institute_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, institute_slug)
);

GRANT SELECT, INSERT, DELETE ON public.saved_institutes TO authenticated;
GRANT ALL ON public.saved_institutes TO service_role;

ALTER TABLE public.saved_institutes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved institutes"
  ON public.saved_institutes FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save institutes for themselves"
  ON public.saved_institutes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own saved institutes"
  ON public.saved_institutes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX saved_institutes_user_id_idx ON public.saved_institutes(user_id);