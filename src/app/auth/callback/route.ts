import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.redirect(`${origin}/login?error=supabase_not_configured`)
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Add verified param to show success message on dashboard
      const redirectUrl = next.includes('?')
        ? `${origin}${next}&verified=true`
        : `${origin}${next}?verified=true`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
