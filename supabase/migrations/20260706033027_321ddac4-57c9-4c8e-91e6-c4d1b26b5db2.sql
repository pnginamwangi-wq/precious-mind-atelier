-- Ensure the signup trigger exists so every new auth user gets a profile and default role.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure the updated_at trigger exists on profiles for edits.
DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Backfill: any existing auth user missing a profile row gets one.
INSERT INTO public.profiles (id, display_name, avatar_url)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data ->> 'display_name', u.raw_user_meta_data ->> 'full_name', split_part(u.email, '@', 1)),
  u.raw_user_meta_data ->> 'avatar_url'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- Backfill: any existing auth user missing a role gets the default student role.
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'student'::app_role
FROM auth.users u
LEFT JOIN public.user_roles r ON r.user_id = u.id
WHERE r.user_id IS NULL;