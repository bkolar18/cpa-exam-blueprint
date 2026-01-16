import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Handles email confirmation links from Supabase Auth
 * This endpoint processes the token_hash and type params from Supabase's magic links
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.redirect(`${origin}/login?error=supabase_not_configured`)
    }

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Email verified successfully - redirect to dashboard with success flag
      const redirectUrl = next.includes('?')
        ? `${origin}${next}&verified=true`
        : `${origin}${next}?verified=true`
      return NextResponse.redirect(redirectUrl)
    }

    // Handle specific error cases
    if (error.message.includes('expired')) {
      return NextResponse.redirect(`${origin}/login?error=link_expired`)
    }
    if (error.message.includes('invalid') || error.message.includes('already')) {
      return NextResponse.redirect(`${origin}/login?error=link_invalid`)
    }
  }

  // Invalid request - missing params or verification failed
  return NextResponse.redirect(`${origin}/login?error=verification_failed`)
}
