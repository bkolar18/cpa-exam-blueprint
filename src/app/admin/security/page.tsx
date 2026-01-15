import { createClient } from '@/lib/supabase/server';

interface SecurityEvent {
  id: string;
  event_type: string;
  severity: string;
  user_id: string | null;
  user_email: string | null;
  ip_address: string | null;
  endpoint: string | null;
  method: string | null;
  status_code: number | null;
  details: Record<string, unknown>;
  created_at: string;
}

interface CSPReport {
  id: string;
  violated_directive: string | null;
  blocked_uri: string | null;
  document_uri: string | null;
  created_at: string;
}

interface SecuritySummary {
  event_type: string;
  severity: string;
  count: number;
  last_occurrence: string;
}

async function getSecurityStats() {
  const supabase = await createClient();

  if (!supabase) {
    return {
      totalEvents24h: 0,
      highSeverityEvents: 0,
      rateLimitViolations: 0,
      authFailures: 0,
      cspViolations: 0,
    };
  }

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  // Get total events in last 24 hours
  const { count: totalEvents24h } = await supabase
    .from('security_events')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', twentyFourHoursAgo.toISOString());

  // Get high severity events
  const { count: highSeverityEvents } = await supabase
    .from('security_events')
    .select('*', { count: 'exact', head: true })
    .in('severity', ['high', 'critical'])
    .gte('created_at', twentyFourHoursAgo.toISOString());

  // Get rate limit violations
  const { count: rateLimitViolations } = await supabase
    .from('security_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'rate_limit_exceeded')
    .gte('created_at', twentyFourHoursAgo.toISOString());

  // Get auth failures
  const { count: authFailures } = await supabase
    .from('security_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'auth_failure')
    .gte('created_at', twentyFourHoursAgo.toISOString());

  // Get CSP violations
  const { count: cspViolations } = await supabase
    .from('csp_reports')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', twentyFourHoursAgo.toISOString());

  return {
    totalEvents24h: totalEvents24h || 0,
    highSeverityEvents: highSeverityEvents || 0,
    rateLimitViolations: rateLimitViolations || 0,
    authFailures: authFailures || 0,
    cspViolations: cspViolations || 0,
  };
}

async function getSecuritySummary(): Promise<SecuritySummary[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const { data } = await supabase
    .from('security_events')
    .select('event_type, severity')
    .gte('created_at', twentyFourHoursAgo.toISOString());

  if (!data) return [];

  // Group by event_type and severity
  const grouped = data.reduce((acc, event) => {
    const key = `${event.event_type}-${event.severity}`;
    if (!acc[key]) {
      acc[key] = {
        event_type: event.event_type,
        severity: event.severity,
        count: 0,
      };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { event_type: string; severity: string; count: number }>);

  return Object.values(grouped)
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const severityDiff = (severityOrder[a.severity as keyof typeof severityOrder] || 4) -
        (severityOrder[b.severity as keyof typeof severityOrder] || 4);
      if (severityDiff !== 0) return severityDiff;
      return b.count - a.count;
    })
    .map(item => ({ ...item, last_occurrence: '' }));
}

async function getRecentSecurityEvents(): Promise<SecurityEvent[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const { data } = await supabase
    .from('security_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  return (data as SecurityEvent[]) || [];
}

async function getTopOffenders() {
  const supabase = await createClient();

  if (!supabase) return [];

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const { data } = await supabase
    .from('security_events')
    .select('ip_address')
    .in('severity', ['high', 'critical'])
    .gte('created_at', twentyFourHoursAgo.toISOString())
    .not('ip_address', 'is', null);

  if (!data) return [];

  // Count by IP
  const ipCounts = data.reduce((acc, event) => {
    const ip = event.ip_address || 'unknown';
    acc[ip] = (acc[ip] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(ipCounts)
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

async function getRecentCSPViolations(): Promise<CSPReport[]> {
  const supabase = await createClient();

  if (!supabase) return [];

  const { data } = await supabase
    .from('csp_reports')
    .select('id, violated_directive, blocked_uri, document_uri, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return (data as CSPReport[]) || [];
}

export default async function SecurityDashboardPage() {
  const [stats, summary, recentEvents, topOffenders, cspViolations] = await Promise.all([
    getSecurityStats(),
    getSecuritySummary(),
    getRecentSecurityEvents(),
    getTopOffenders(),
    getRecentCSPViolations(),
  ]);

  const statCards = [
    {
      name: 'Events (24h)',
      value: stats.totalEvents24h,
      icon: ActivityIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'High Severity',
      value: stats.highSeverityEvents,
      icon: AlertIcon,
      color: 'bg-red-500',
      highlight: stats.highSeverityEvents > 0,
    },
    {
      name: 'Rate Limits',
      value: stats.rateLimitViolations,
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Auth Failures',
      value: stats.authFailures,
      icon: LockIcon,
      color: 'bg-orange-500',
    },
    {
      name: 'CSP Violations',
      value: stats.cspViolations,
      icon: ShieldIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
          Security Dashboard
        </h1>
        <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
          Monitor security events, rate limits, and potential threats
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className={`bg-white dark:bg-[var(--card)] rounded-xl border ${
              stat.highlight
                ? 'border-red-400 dark:border-red-600'
                : 'border-[var(--border)]'
            } p-4`}
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-[var(--muted)] dark:text-[var(--muted)]">
                  {stat.name}
                </p>
                <p className={`text-xl font-bold ${
                  stat.highlight ? 'text-red-600 dark:text-red-400' : 'text-[var(--foreground)] dark:text-white'
                }`}>
                  {stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Summary */}
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
            Event Summary (24h)
          </h2>

          {summary.length === 0 ? (
            <div className="text-center py-8">
              <ShieldCheckIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-[var(--muted)] dark:text-[var(--muted)]">
                No security events in the last 24 hours
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {summary.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50"
                >
                  <div className="flex items-center">
                    <SeverityBadge severity={item.severity} />
                    <span className="ml-3 text-sm text-[var(--foreground)] dark:text-white">
                      {formatEventType(item.event_type)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)] dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Offending IPs */}
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
            Top Offending IPs (24h)
          </h2>

          {topOffenders.length === 0 ? (
            <div className="text-center py-8">
              <ShieldCheckIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-[var(--muted)] dark:text-[var(--muted)]">
                No high-severity events from identifiable IPs
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {topOffenders.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50"
                >
                  <code className="text-sm text-[var(--foreground)] dark:text-white font-mono">
                    {item.ip}
                  </code>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {item.count} events
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
          Recent Security Events
        </h2>

        {recentEvents.length === 0 ? (
          <div className="text-center py-8">
            <ShieldCheckIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-[var(--muted)] dark:text-[var(--muted)]">
              No security events recorded yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Time</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Severity</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Event</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Endpoint</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">IP</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">User</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-[var(--border)]/50 hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]/30">
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] whitespace-nowrap">
                      {formatRelativeTime(event.created_at)}
                    </td>
                    <td className="py-3 px-2">
                      <SeverityBadge severity={event.severity} />
                    </td>
                    <td className="py-3 px-2 text-[var(--foreground)] dark:text-white">
                      {formatEventType(event.event_type)}
                    </td>
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] font-mono text-xs">
                      {event.endpoint || '-'}
                    </td>
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] font-mono text-xs">
                      {event.ip_address || '-'}
                    </td>
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] truncate max-w-[150px]">
                      {event.user_email || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CSP Violations */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
          Recent CSP Violations
        </h2>

        {cspViolations.length === 0 ? (
          <div className="text-center py-8">
            <ShieldCheckIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-[var(--muted)] dark:text-[var(--muted)]">
              No CSP violations recorded
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Time</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Directive</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Blocked URI</th>
                  <th className="text-left py-3 px-2 font-medium text-[var(--muted)] dark:text-[var(--muted)]">Document</th>
                </tr>
              </thead>
              <tbody>
                {cspViolations.map((report) => (
                  <tr key={report.id} className="border-b border-[var(--border)]/50 hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]/30">
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] whitespace-nowrap">
                      {formatRelativeTime(report.created_at)}
                    </td>
                    <td className="py-3 px-2 text-[var(--foreground)] dark:text-white font-mono text-xs">
                      {report.violated_directive || '-'}
                    </td>
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] font-mono text-xs truncate max-w-[200px]">
                      {report.blocked_uri || '-'}
                    </td>
                    <td className="py-3 px-2 text-[var(--muted)] dark:text-[var(--muted)] font-mono text-xs truncate max-w-[200px]">
                      {report.document_uri || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[severity] || colors.low}`}>
      {severity}
    </span>
  );
}

function formatEventType(type: string): string {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

// Icons
function ActivityIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function AlertIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}
