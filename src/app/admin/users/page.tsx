'use client';

import { useState, useEffect } from 'react';

interface User {
 id: string;
 email: string;
 full_name: string | null;
 created_at: string;
 subscription_tier: string | null;
 last_active: string | null;
 practice_sessions_count: number;
 current_streak: number;
}

export default function UserManagementPage() {
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [filterTier, setFilterTier] = useState('all');
 const [sortBy, setSortBy] = useState('created_at');
 const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
 const [selectedUser, setSelectedUser] = useState<User | null>(null);

 useEffect(() => {
 fetchUsers();
 }, [filterTier, sortBy, sortOrder]);

 const fetchUsers = async () => {
 setLoading(true);
 try {
 const params = new URLSearchParams();
 if (filterTier !== 'all') params.set('tier', filterTier);
 params.set('sortBy', sortBy);
 params.set('sortOrder', sortOrder);

 const response = await fetch(`/api/admin/users?${params}`);
 if (response.ok) {
 const data = await response.json();
 setUsers(data.users || []);
 }
 } catch (error) {
 console.error('Error fetching users:', error);
 } finally {
 setLoading(false);
 }
 };

 const filteredUsers = users.filter(user => {
 if (!searchQuery) return true;
 const query = searchQuery.toLowerCase();
 return (
 user.email?.toLowerCase().includes(query) ||
 user.full_name?.toLowerCase().includes(query)
 );
 });

 const exportToCSV = () => {
 const headers = ['ID', 'Email', 'Name', 'Subscription', 'Joined', 'Last Active', 'Sessions', 'Streak'];
 const rows = filteredUsers.map(u => [
 u.id,
 u.email,
 u.full_name || '',
 u.subscription_tier || 'free',
 new Date(u.created_at).toISOString(),
 u.last_active ? new Date(u.last_active).toISOString() : '',
 u.practice_sessions_count,
 u.current_streak,
 ]);

 const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
 const blob = new Blob([csv], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
 a.click();
 };

 const handleSort = (column: string) => {
 if (sortBy === column) {
 setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
 } else {
 setSortBy(column);
 setSortOrder('desc');
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 User Management
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 View and manage registered users
 </p>
 </div>
 <button
 onClick={exportToCSV}
 className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
 >
 <DownloadIcon className="h-4 w-4"/>
 Export CSV
 </button>
 </div>

 {/* Filters */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="flex flex-wrap gap-4">
 <div className="flex-1 min-w-[200px]">
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Search
 </label>
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search by email or name..."
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white placeholder:text-[var(--muted)] dark:placeholder:text-gray-500"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Subscription
 </label>
 <select
 value={filterTier}
 onChange={(e) => setFilterTier(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Tiers</option>
 <option value="free">Free</option>
 <option value="pro">Pro</option>
 <option value="premium">Premium</option>
 </select>
 </div>
 </div>
 </div>

 {/* Stats Summary */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{users.length}</div>
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Total Users</div>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="text-2xl font-bold text-green-600">{users.filter(u => u.subscription_tier === 'pro' || u.subscription_tier === 'premium').length}</div>
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Paid Users</div>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="text-2xl font-bold text-blue-600">{users.filter(u => {
 if (!u.last_active) return false;
 const lastActive = new Date(u.last_active);
 const sevenDaysAgo = new Date();
 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
 return lastActive >= sevenDaysAgo;
 }).length}</div>
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Active (7d)</div>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="text-2xl font-bold text-purple-600">{Math.round(users.reduce((acc, u) => acc + (u.current_streak || 0), 0) / (users.length || 1))}</div>
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Avg Streak</div>
 </div>
 </div>

 {/* Users Table */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
 {loading ? (
 <div className="p-8 text-center">
 <LoadingSpinner className="h-8 w-8 mx-auto text-[var(--primary)]"/>
 <p className="mt-2 text-[var(--muted)] dark:text-[var(--muted)]">Loading users...</p>
 </div>
 ) : filteredUsers.length === 0 ? (
 <div className="p-8 text-center">
 <UsersIcon className="h-12 w-12 mx-auto text-[var(--muted)] dark:text-gray-600 mb-4"/>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">No users found</p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 dark:bg-[var(--card-hover)]/50">
 <tr>
 <th
 onClick={() => handleSort('email')}
 className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
 >
 User {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
 </th>
 <th
 onClick={() => handleSort('subscription_tier')}
 className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
 >
 Subscription {sortBy === 'subscription_tier' && (sortOrder === 'asc' ? '↑' : '↓')}
 </th>
 <th
 onClick={() => handleSort('created_at')}
 className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
 >
 Joined {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
 </th>
 <th
 onClick={() => handleSort('last_active')}
 className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
 >
 Last Active {sortBy === 'last_active' && (sortOrder === 'asc' ? '↑' : '↓')}
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Sessions
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Streak
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {filteredUsers.map((user) => (
 <tr
 key={user.id}
 onClick={() => setSelectedUser(user)}
 className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
 >
 <td className="px-4 py-3">
 <div className="flex items-center">
 <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
 <span className="text-white text-sm font-medium">
 {(user.full_name || user.email || '?')[0].toUpperCase()}
 </span>
 </div>
 <div className="ml-3">
 <div className="font-medium text-[var(--foreground)] dark:text-white">
 {user.full_name || 'No name'}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {user.email}
 </div>
 </div>
 </div>
 </td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 text-xs font-medium rounded-full ${
 user.subscription_tier === 'premium'
 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
 : user.subscription_tier === 'pro'
 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
 : 'bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)]'
 }`}>
 {user.subscription_tier || 'free'}
 </span>
 </td>
 <td className="px-4 py-3 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {new Date(user.created_at).toLocaleDateString()}
 </td>
 <td className="px-4 py-3 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {user.last_active ? formatRelativeTime(user.last_active) : 'Never'}
 </td>
 <td className="px-4 py-3 text-sm text-[var(--foreground)] dark:text-white">
 {user.practice_sessions_count || 0}
 </td>
 <td className="px-4 py-3">
 <div className="flex items-center">
 <span className="text-sm text-[var(--foreground)] dark:text-white">
 {user.current_streak || 0}
 </span>
 {user.current_streak >= 7 && (
 <FireIcon className="ml-1 h-4 w-4 text-orange-500"/>
 )}
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>

 {/* User Detail Modal */}
 {selectedUser && (
 <div className="fixed inset-0 z-50 flex items-center justify-center">
 <div
 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
 onClick={() => setSelectedUser(null)}
 />
 <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl overflow-hidden">
 <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">
 User Details
 </h2>
 <button
 onClick={() => setSelectedUser(null)}
 className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <XIcon className="w-5 h-5 text-[var(--muted)] dark:text-[var(--muted)]"/>
 </button>
 </div>

 <div className="p-6 space-y-4">
 <div className="flex items-center">
 <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center">
 <span className="text-white text-2xl font-medium">
 {(selectedUser.full_name || selectedUser.email || '?')[0].toUpperCase()}
 </span>
 </div>
 <div className="ml-4">
 <div className="text-xl font-semibold text-[var(--foreground)] dark:text-white">
 {selectedUser.full_name || 'No name'}
 </div>
 <div className="text-[var(--muted)] dark:text-[var(--muted)]">
 {selectedUser.email}
 </div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-3">
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Subscription</div>
 <div className="font-medium text-[var(--foreground)] dark:text-white capitalize">
 {selectedUser.subscription_tier || 'Free'}
 </div>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-3">
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Joined</div>
 <div className="font-medium text-[var(--foreground)] dark:text-white">
 {new Date(selectedUser.created_at).toLocaleDateString()}
 </div>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-3">
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Last Active</div>
 <div className="font-medium text-[var(--foreground)] dark:text-white">
 {selectedUser.last_active ? formatRelativeTime(selectedUser.last_active) : 'Never'}
 </div>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-3">
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Practice Sessions</div>
 <div className="font-medium text-[var(--foreground)] dark:text-white">
 {selectedUser.practice_sessions_count || 0}
 </div>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-3 col-span-2">
 <div className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Current Streak</div>
 <div className="font-medium text-[var(--foreground)] dark:text-white flex items-center">
 {selectedUser.current_streak || 0} days
 {selectedUser.current_streak >= 7 && (
 <FireIcon className="ml-2 h-5 w-5 text-orange-500"/>
 )}
 </div>
 </div>
 </div>

 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 User ID: {selectedUser.id}
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
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
function DownloadIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
 </svg>
 );
}

function UsersIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
 </svg>
 );
}

function FireIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
 <path strokeLinecap="round"strokeLinejoin="round"d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
 </svg>
 );
}

function XIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M6 18L18 6M6 6l12 12"/>
 </svg>
 );
}

function LoadingSpinner({ className = '' }: { className?: string }) {
 return (
 <svg className={`animate-spin ${className}`} fill="none"viewBox="0 0 24 24">
 <circle className="opacity-25"cx="12"cy="12"r="10"stroke="currentColor"strokeWidth="4"/>
 <path
 className="opacity-75"
 fill="currentColor"
 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
 />
 </svg>
 );
}
