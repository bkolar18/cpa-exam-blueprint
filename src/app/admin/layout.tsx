import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  const isAdmin = adminEmails.includes(email.toLowerCase());

  // Debug logging (remove in production)
  console.log('[Admin Layout] Email check:', {
    userEmail: email,
    adminEmails,
    isAdmin,
    envVar: process.env.ADMIN_EMAILS,
  });

  return isAdmin;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('[Admin Layout] Starting auth check...');

  const supabase = await createClient();

  if (!supabase) {
    console.log('[Admin Layout] No supabase client - redirecting to /login');
    redirect('/login');
  }

  const { data: { user }, error } = await supabase.auth.getUser();

  console.log('[Admin Layout] getUser result:', {
    hasUser: !!user,
    userEmail: user?.email,
    error: error?.message
  });

  if (!user) {
    console.log('[Admin Layout] No user - redirecting to /login');
    redirect('/login');
  }

  const adminCheck = isAdminEmail(user.email);
  console.log('[Admin Layout] Admin check result:', adminCheck);

  if (!adminCheck) {
    console.log('[Admin Layout] Not admin - redirecting to /dashboard');
    redirect('/dashboard');
  }

  console.log('[Admin Layout] Auth passed! Rendering admin dashboard.');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader userEmail={user.email || ''} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
