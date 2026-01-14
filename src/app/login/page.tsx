"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setError(null);
 setLoading(true);

 const supabase = createClient();
 if (!supabase) {
 setError("Authentication service not configured");
 setLoading(false);
 return;
 }

 const { error: signInError } = await supabase.auth.signInWithPassword({
 email,
 password,
 });

 if (signInError) {
 setError(signInError.message);
 setLoading(false);
 return;
 }

 router.push("/dashboard");
 router.refresh();
 };

 const handleGoogleLogin = async () => {
 setError(null);

 const supabase = createClient();
 if (!supabase) {
 setError("Authentication service not configured");
 return;
 }

 const { error } = await supabase.auth.signInWithOAuth({
 provider:"google",
 options: {
 redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
 },
 });

 if (error) {
 setError(error.message);
 }
 };

 return (
 <div className="min-h-screen bg-[var(--card)] dark:bg-[var(--background)] flex items-center justify-center py-12 px-4">
 <div className="max-w-md w-full">
 <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-lg p-8">
 <div className="text-center mb-8">
 <Link href="/" className="inline-flex items-center space-x-3 mb-6 justify-center">
 <Image
   src="/logo.png"
   alt="Meridian CPA Review"
   width={48}
   height={48}
   className="w-12 h-12 dark:brightness-0 dark:invert"
 />
 <div className="flex flex-col items-start">
   <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-blue-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
     Meridian
   </span>
   <span className="text-xs font-semibold text-[var(--muted)] dark:text-gray-300 -mt-0.5 tracking-wide">
     CPA Review
   </span>
 </div>
 </Link>
 <h1 className="text-2xl font-bold text-[var(--foreground)]">
 Welcome Back
 </h1>
 <p className="text-[var(--muted)] mt-2">
 Sign in to access your dashboard
 </p>
 </div>

 {error && (
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
 {error}
 </div>
 )}

 <form onSubmit={handleLogin} className="space-y-5">
 <div>
 <label htmlFor="email"className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Email Address
 </label>
 <input
 id="email"
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="w-full px-4 py-3 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
 placeholder="you@example.com"
 />
 </div>

 <div>
 <label htmlFor="password"className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Password
 </label>
 <input
 id="password"
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 className="w-full px-4 py-3 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
 placeholder="••••••••"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {loading ?"Signing in...":"Sign In"}
 </button>
 </form>

 <div className="relative my-6">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-[var(--border)]"></div>
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-4 bg-white dark:bg-[var(--card)] text-[var(--muted)]">Or continue with</span>
 </div>
 </div>

 <button
 onClick={handleGoogleLogin}
 className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--border)] dark:border-[var(--border)] rounded-lg hover:bg-[var(--card)] dark:hover:bg-gray-700 transition-colors"
 >
 <svg className="w-5 h-5"viewBox="0 0 24 24">
 <path
 fill="#4285F4"
 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
 />
 <path
 fill="#34A853"
 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
 />
 <path
 fill="#FBBC05"
 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
 />
 <path
 fill="#EA4335"
 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
 />
 </svg>
 <span className="font-medium text-[var(--foreground)]">Continue with Google</span>
 </button>

 <p className="text-center text-[var(--muted)] mt-6">
 Don&apos;t have an account?{" "}
 <Link href="/signup" className="text-[var(--primary)] font-medium hover:underline">
 Sign up free
 </Link>
 </p>
 </div>
 </div>
 </div>
 );
}
