import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getClientIP } from '@/lib/security/rate-limit';

interface CSPReport {
  'csp-report': {
    'document-uri'?: string;
    'referrer'?: string;
    'violated-directive'?: string;
    'effective-directive'?: string;
    'original-policy'?: string;
    'disposition'?: string;
    'blocked-uri'?: string;
    'status-code'?: number;
    'script-sample'?: string;
    'source-file'?: string;
    'line-number'?: number;
    'column-number'?: number;
  };
}

/**
 * POST /api/csp-report
 * Receives Content Security Policy violation reports
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // CSP reports are sent as application/csp-report or application/json
    if (!contentType.includes('csp-report') && !contentType.includes('json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const body: CSPReport = await request.json();
    const report = body['csp-report'];

    if (!report) {
      return NextResponse.json({ error: 'Invalid report format' }, { status: 400 });
    }

    const supabase = await createClient();

    if (supabase) {
      // Store the CSP violation report
      await supabase.from('csp_reports').insert({
        document_uri: report['document-uri'],
        referrer: report['referrer'],
        violated_directive: report['violated-directive'],
        effective_directive: report['effective-directive'],
        original_policy: report['original-policy']?.substring(0, 5000), // Truncate if too long
        disposition: report['disposition'],
        blocked_uri: report['blocked-uri'],
        status_code: report['status-code'],
        script_sample: report['script-sample']?.substring(0, 500),
        source_file: report['source-file'],
        line_number: report['line-number'],
        column_number: report['column-number'],
        user_agent: request.headers.get('user-agent'),
        ip_address: getClientIP(request),
      });
    }

    // Log to console for monitoring
    console.warn('CSP Violation:', {
      directive: report['violated-directive'],
      blockedUri: report['blocked-uri'],
      documentUri: report['document-uri'],
    });

    // Return 204 No Content (standard for reporting endpoints)
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('CSP report error:', error);
    // Still return success to avoid retry loops
    return new Response(null, { status: 204 });
  }
}

// Disable body parsing for CSP reports (they may have unusual content-type)
export const runtime = 'edge';
