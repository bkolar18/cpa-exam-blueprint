-- Fix: Ensure profile is automatically created on user signup
-- This trigger creates a profile row when a new user signs up via Supabase Auth
-- Without this, new users will get "Database Error" after signup

-- =============================================
-- 1. Create the function (if not exists, or replace)
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;  -- Prevent errors if profile somehow already exists
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 2. Drop existing trigger if it exists (to recreate cleanly)
-- =============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- =============================================
-- 3. Create the trigger
-- =============================================
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 4. Grant necessary permissions
-- =============================================
-- Ensure the function can insert into profiles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- =============================================
-- 5. Fix any orphaned auth.users without profiles
--    (users who signed up while trigger was missing)
-- =============================================
INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Verification query (run manually to confirm)
-- =============================================
-- SELECT tgname, tgrelid::regclass, proname
-- FROM pg_trigger t
-- JOIN pg_proc p ON t.tgfoid = p.oid
-- WHERE tgname = 'on_auth_user_created';
