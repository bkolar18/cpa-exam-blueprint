'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggleSimple } from '@/components/theme/ThemeToggle';

interface AdminHeaderProps {
 userEmail: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
 const [isSearchOpen, setIsSearchOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
 const [isSearching, setIsSearching] = useState(false);
 const searchInputRef = useRef<HTMLInputElement>(null);
 const router = useRouter();

 // Keyboard shortcut for search
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 e.preventDefault();
 setIsSearchOpen(true);
 }
 if (e.key === 'Escape') {
 setIsSearchOpen(false);
 setSearchQuery('');
 setSearchResults(null);
 }
 };

 document.addEventListener('keydown', handleKeyDown);
 return () => document.removeEventListener('keydown', handleKeyDown);
 }, []);

 // Focus input when search opens
 useEffect(() => {
 if (isSearchOpen && searchInputRef.current) {
 searchInputRef.current.focus();
 }
 }, [isSearchOpen]);

 // Search handler with debounce
 useEffect(() => {
 if (!searchQuery.trim()) {
 setSearchResults(null);
 return;
 }

 const timeoutId = setTimeout(async () => {
 setIsSearching(true);
 try {
 const response = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
 if (response.ok) {
 const data = await response.json();
 setSearchResults(data);
 }
 } catch (error) {
 console.error('Search error:', error);
 } finally {
 setIsSearching(false);
 }
 }, 300);

 return () => clearTimeout(timeoutId);
 }, [searchQuery]);

 const handleResultClick = (type: string, id: string) => {
 setIsSearchOpen(false);
 setSearchQuery('');
 setSearchResults(null);

 switch (type) {
 case 'user':
 router.push(`/admin/users?id=${id}`);
 break;
 case 'feedback':
 router.push(`/admin/feedback?id=${id}`);
 break;
 case 'question':
 router.push(`/admin/questions?id=${id}`);
 break;
 }
 };

 return (
 <>
 <header className="sticky top-0 z-40 bg-white dark:bg-[var(--background)] border-b border-[var(--border)] dark:border-gray-800">
 <div className="flex h-16 items-center justify-between px-4 sm:px-6">
 {/* Mobile menu placeholder */}
 <div className="lg:hidden">
 <span className="text-lg font-semibold text-[var(--foreground)] dark:text-white">
 Admin
 </span>
 </div>

 {/* Search button */}
 <div className="flex-1 max-w-md mx-4">
 <button
 onClick={() => setIsSearchOpen(true)}
 className="w-full flex items-center px-4 py-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]
 bg-gray-100 dark:bg-[var(--card)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700
 transition-colors"
 >
 <SearchIcon className="h-4 w-4 mr-2"/>
 <span className="flex-1 text-left">Search...</span>
 <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs font-mono bg-white dark:bg-[var(--card-hover)] rounded border border-[var(--border)] dark:border-[var(--border)]">
 ⌘K
 </kbd>
 </button>
 </div>

 {/* Right side actions */}
 <div className="flex items-center space-x-4">
 <ThemeToggleSimple />
 <div className="hidden sm:block text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {userEmail}
 </div>
 </div>
 </div>
 </header>

 {/* Search Modal */}
 {isSearchOpen && (
 <div className="fixed inset-0 z-50">
 <div
 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
 onClick={() => {
 setIsSearchOpen(false);
 setSearchQuery('');
 setSearchResults(null);
 }}
 />
 <div className="relative max-w-2xl mx-auto mt-20 bg-white dark:bg-[var(--background)] rounded-xl shadow-2xl overflow-hidden mx-4">
 <div className="flex items-center px-4 border-b border-[var(--border)] dark:border-gray-800">
 <SearchIcon className="h-5 w-5 text-[var(--muted)] dark:text-[var(--muted)]"/>
 <input
 ref={searchInputRef}
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search users, feedback, questions..."
 className="flex-1 px-4 py-4 text-[var(--foreground)] dark:text-white bg-transparent
 placeholder:text-[var(--muted)] dark:placeholder:text-gray-500
 focus:outline-none"
 />
 {isSearching && <LoadingSpinner className="h-5 w-5 text-[var(--primary)]"/>}
 </div>

 {searchResults && (
 <div className="max-h-96 overflow-y-auto p-2">
 {searchResults.users?.length > 0 && (
 <div className="mb-4">
 <div className="px-3 py-2 text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase">
 Users
 </div>
 {searchResults.users.map((user: SearchResult) => (
 <button
 key={user.id}
 onClick={() => handleResultClick('user', user.id)}
 className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
 >
 <UserIcon className="h-4 w-4 mr-3 text-[var(--muted)] dark:text-[var(--muted)]"/>
 <div>
 <div className="text-sm font-medium text-[var(--foreground)] dark:text-white">
 {user.title}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {user.subtitle}
 </div>
 </div>
 </button>
 ))}
 </div>
 )}

 {searchResults.feedback?.length > 0 && (
 <div className="mb-4">
 <div className="px-3 py-2 text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase">
 Feedback
 </div>
 {searchResults.feedback.map((item: SearchResult) => (
 <button
 key={item.id}
 onClick={() => handleResultClick('feedback', item.id)}
 className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
 >
 <FlagIcon className="h-4 w-4 mr-3 text-[var(--muted)] dark:text-[var(--muted)]"/>
 <div>
 <div className="text-sm font-medium text-[var(--foreground)] dark:text-white">
 {item.title}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {item.subtitle}
 </div>
 </div>
 </button>
 ))}
 </div>
 )}

 {searchResults.questions?.length > 0 && (
 <div>
 <div className="px-3 py-2 text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase">
 Questions
 </div>
 {searchResults.questions.map((question: SearchResult) => (
 <button
 key={question.id}
 onClick={() => handleResultClick('question', question.id)}
 className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
 >
 <QuestionIcon className="h-4 w-4 mr-3 text-[var(--muted)] dark:text-[var(--muted)]"/>
 <div>
 <div className="text-sm font-medium text-[var(--foreground)] dark:text-white">
 {question.title}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {question.subtitle}
 </div>
 </div>
 </button>
 ))}
 </div>
 )}

 {!searchResults.users?.length && !searchResults.feedback?.length && !searchResults.questions?.length && (
 <div className="px-4 py-8 text-center text-[var(--muted)] dark:text-[var(--muted)]">
 No results found for &ldquo;{searchQuery}&rdquo;
 </div>
 )}
 </div>
 )}

 {!searchQuery && (
 <div className="px-4 py-8 text-center text-[var(--muted)] dark:text-[var(--muted)]">
 <p className="text-sm">Start typing to search</p>
 <p className="text-xs mt-1">Search users by email, feedback by question ID, or questions by content</p>
 </div>
 )}
 </div>
 </div>
 )}
 </>
 );
}

interface SearchResult {
 id: string;
 title: string;
 subtitle: string;
}

interface SearchResults {
 users: SearchResult[];
 feedback: SearchResult[];
 questions: SearchResult[];
}

// Icons
function SearchIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
 </svg>
 );
}

function UserIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
 </svg>
 );
}

function FlagIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/>
 </svg>
 );
}

function QuestionIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
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
