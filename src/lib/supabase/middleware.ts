import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Simple pass-through - client-side handles all auth
  return NextResponse.next({ request })
}
