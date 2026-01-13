"use client";

import { useState, useEffect, Suspense } from"react";
import { createClient } from"@/lib/supabase/client";
import { useAuth } from"@/components/auth/AuthProvider";
import { useSearchParams, useRouter } from"next/navigation";
import Link from"next/link";
import { getQuestionById } from"@/lib/data/practice-questions";

interface PracticeAttempt {
 id: string;
 user_id: string;
 question_id: string;
 section: string;
 topic: string | null;
 selected_answer: string;
 correct_answer: string;
 is_correct: boolean;
 created_at: string;
}

interface Session {
 id: string;
 section: string;
 date: Date;
 attempts: PracticeAttempt[];
 correctCount: number;
 totalCount: number;
 accuracy: number;
 topics: string[];
}

interface QuestionNote {
 id: string;
 question_id: string;
 note: string;
}

// Group attempts into sessions (attempts within 30 minutes of each other)
function groupIntoSessions(attempts: PracticeAttempt[]): Session[] {
 if (attempts.length === 0) return [];

 const sessions: Session[] = [];
 let currentSession: PracticeAttempt[] = [];
 let lastTime: Date | null = null;

 // Sort by created_at ascending to group properly
 const sorted = [...attempts].sort(
 (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
 );

 for (const attempt of sorted) {
 const attemptTime = new Date(attempt.created_at);

 if (lastTime === null || attemptTime.getTime() - lastTime.getTime() < 30 * 60 * 1000) {
 // Same session (within 30 minutes)
 currentSession.push(attempt);
 } else {
 // New session
 if (currentSession.length > 0) {
 sessions.push(createSessionFromAttempts(currentSession));
 }
 currentSession = [attempt];
 }
 lastTime = attemptTime;
 }

 // Don't forget the last session
 if (currentSession.length > 0) {
 sessions.push(createSessionFromAttempts(currentSession));
 }

 // Return newest first
 return sessions.reverse();
}

function createSessionFromAttempts(attempts: PracticeAttempt[]): Session {
 const correctCount = attempts.filter((a) => a.is_correct).length;
 const topics = [...new Set(attempts.map((a) => a.topic).filter(Boolean))] as string[];

 return {
 id: attempts[0].id,
 section: attempts[0].section,
 date: new Date(attempts[0].created_at),
 attempts,
 correctCount,
 totalCount: attempts.length,
 accuracy: Math.round((correctCount / attempts.length) * 100),
 topics,
 };
}

function PracticeHistoryContent() {
 const { user, loading: authLoading } = useAuth();
 const searchParams = useSearchParams();
 const router = useRouter();
 const sessionIdParam = searchParams.get("session");
 const [sessions, setSessions] = useState<Session[]>([]);
 const [selectedSession, setSelectedSession] = useState<Session | null>(null);
 const [loading, setLoading] = useState(true);
 const [notes, setNotes] = useState<Map<string, QuestionNote>>(new Map());
 const [editingNote, setEditingNote] = useState<string | null>(null);
 const [noteText, setNoteText] = useState("");
 const [savingNote, setSavingNote] = useState(false);
 const supabase = createClient();

 // Handle back to all sessions - clear URL param and state
 const handleBackToSessions = () => {
   setSelectedSession(null);
   // Clear the session param from URL without full page reload
   router.replace('/dashboard/practice/history', { scroll: false });
 };

 useEffect(() => {
 if (authLoading) return;
 if (user) {
 fetchAttempts();
 } else {
 setLoading(false);
 }
 }, [user, authLoading]);

 // Auto-select session from URL parameter
 useEffect(() => {
 if (sessionIdParam && sessions.length > 0 && !selectedSession) {
 const targetSession = sessions.find(s => s.id === sessionIdParam);
 if (targetSession) {
 setSelectedSession(targetSession);
 }
 }
 }, [sessionIdParam, sessions, selectedSession]);

 const fetchAttempts = async () => {
 if (!supabase || !user) {
 setLoading(false);
 return;
 }

 const { data, error } = await supabase
 .from("practice_attempts")
 .select("*")
 .eq("user_id", user.id)
 .order("created_at", { ascending: false });

 if (!error && data) {
 const grouped = groupIntoSessions(data as PracticeAttempt[]);
 setSessions(grouped);
 }
 setLoading(false);
 };

 // Fetch notes for questions in the selected session
 const fetchNotesForSession = async (session: Session) => {
 if (!supabase || !user) return;

 const questionIds = session.attempts.map(a => a.question_id);
 const { data, error } = await supabase
 .from("question_notes")
 .select("id, question_id, note")
 .eq("user_id", user.id)
 .in("question_id", questionIds);

 if (!error && data) {
 const notesMap = new Map<string, QuestionNote>();
 data.forEach((note: QuestionNote) => {
 notesMap.set(note.question_id, note);
 });
 setNotes(notesMap);
 }
 };

 // Save note for a question
 const saveNote = async (questionId: string, attempt: PracticeAttempt) => {
 if (!supabase || !user || !noteText.trim()) return;

 setSavingNote(true);
 const existingNote = notes.get(questionId);
 const question = getQuestionById(questionId);

 if (existingNote) {
 // Update existing note
 const { error } = await supabase
 .from("question_notes")
 .update({ note: noteText.trim(), updated_at: new Date().toISOString() })
 .eq("id", existingNote.id);

 if (!error) {
 setNotes(prev => {
 const newNotes = new Map(prev);
 newNotes.set(questionId, { ...existingNote, note: noteText.trim() });
 return newNotes;
 });
 }
 } else {
 // Insert new note
 const { data, error } = await supabase
 .from("question_notes")
 .insert({
 user_id: user.id,
 question_id: questionId,
 section: attempt.section,
 topic: attempt.topic || question?.topic || 'Unknown',
 subtopic: question?.subtopic || null,
 note: noteText.trim(),
 })
 .select("id, question_id, note")
 .single();

 if (!error && data) {
 setNotes(prev => {
 const newNotes = new Map(prev);
 newNotes.set(questionId, data as QuestionNote);
 return newNotes;
 });
 }
 }

 setSavingNote(false);
 setEditingNote(null);
 setNoteText("");
 };

 // Delete a note
 const deleteNote = async (questionId: string) => {
 if (!supabase || !user) return;

 const existingNote = notes.get(questionId);
 if (!existingNote) return;

 setSavingNote(true);
 const { error } = await supabase
 .from("question_notes")
 .delete()
 .eq("id", existingNote.id);

 if (!error) {
 setNotes(prev => {
 const newNotes = new Map(prev);
 newNotes.delete(questionId);
 return newNotes;
 });
 }
 setSavingNote(false);
 setEditingNote(null);
 setNoteText("");
 };

 // Fetch notes when a session is selected
 useEffect(() => {
 if (selectedSession && user) {
 fetchNotesForSession(selectedSession);
 }
 }, [selectedSession, user]);

 if (loading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 if (!user) {
 return (
 <div className="text-center py-12">
 <p className="text-[var(--muted)]">Please log in to view your practice history.</p>
 <Link href="/login"className="btn-primary mt-4 inline-block">
 Log In
 </Link>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Back Button */}
 <Link
 href="/dashboard/practice"
 className="inline-flex items-center text-sm text-gray-600 dark:text-[var(--muted)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors"
 >
 <svg className="w-4 h-4 mr-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
 </svg>
 Back to Practice
 </Link>

 {/* Header */}
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)]">Practice History</h1>
 <p className="text-[var(--muted)]">Review your past practice sessions and answers</p>
 </div>

 {sessions.length === 0 ? (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-12 text-center">
 <div className="w-16 h-16 bg-gray-100 dark:bg-[var(--card-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-gray-400 dark:text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
 </svg>
 </div>
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Practice Sessions Yet</h3>
 <p className="text-[var(--muted)] mb-6">
 Complete a practice quiz to see your history here.
 </p>
 <Link href="/dashboard/practice"className="btn-primary inline-block">
 Start Practicing
 </Link>
 </div>
 ) : selectedSession ? (
 // Session Detail View
 <div className="space-y-6">
 <button
 onClick={handleBackToSessions}
 className="flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
 >
 <svg className="w-4 h-4 mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 19l-7-7 7-7"/>
 </svg>
 Back to All Sessions
 </button>

 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <div className="flex items-center justify-between mb-6">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <span className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg font-bold">
 {selectedSession.section}
 </span>
 <span className={`px-3 py-1 rounded-lg font-medium ${
 selectedSession.accuracy >= 80 ?"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300":
 selectedSession.accuracy >= 60 ?"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300":
"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
 }`}>
 {selectedSession.accuracy}% Accuracy
 </span>
 </div>
 <p className="text-[var(--muted)]">
 {selectedSession.date.toLocaleDateString("en-US", {
 weekday:"long",
 year:"numeric",
 month:"long",
 day:"numeric",
 hour:"numeric",
 minute:"2-digit",
 })}
 </p>
 </div>
 <div className="text-right">
 <p className="text-2xl font-bold text-[var(--foreground)]">
 {selectedSession.correctCount}/{selectedSession.totalCount}
 </p>
 <p className="text-sm text-[var(--muted)]">Correct</p>
 </div>
 </div>

 <div className="space-y-4">
 {selectedSession.attempts.map((attempt, index) => {
 const question = getQuestionById(attempt.question_id);

 return (
 <div
 key={attempt.id}
 className={`p-4 rounded-lg border ${
 attempt.is_correct ?"border-green-200 bg-green-50":"border-red-200 bg-red-50"
 }`}
 >
 <div className="flex items-start justify-between mb-3">
 <span className="text-sm font-medium text-[var(--muted)]">
 Question {index + 1}
 </span>
 <span className={`px-2 py-1 rounded text-xs font-medium ${
 attempt.is_correct ?"bg-green-200 text-green-800":"bg-red-200 text-red-800"
 }`}>
 {attempt.is_correct ?"Correct":"Incorrect"}
 </span>
 </div>

 {question ? (
 <>
 <p className="font-medium text-[var(--foreground)] mb-3">
 {question.question}
 </p>

 <div className="space-y-2 mb-3">
 {(["A","B","C","D"] as const).map((letter) => {
 const isSelected = attempt.selected_answer === letter;
 const isCorrect = attempt.correct_answer === letter;

 let bgColor ="bg-white dark:bg-[var(--card-hover)]";
 let borderColor ="border-gray-200 dark:border-[var(--border)]";
 let textColor ="text-[var(--foreground)]";

 if (isCorrect) {
 bgColor ="bg-green-100 dark:bg-green-900/30";
 borderColor ="border-green-300 dark:border-green-700";
 textColor ="text-green-800 dark:text-green-300";
 } else if (isSelected && !isCorrect) {
 bgColor ="bg-red-100 dark:bg-red-900/30";
 borderColor ="border-red-300 dark:border-red-700";
 textColor ="text-red-800 dark:text-red-300";
 }

 return (
 <div
 key={letter}
 className={`p-3 rounded-lg border ${bgColor} ${borderColor} ${textColor} flex items-center`}
 >
 <span className="font-bold mr-3">{letter}.</span>
 <span>{question.options[letter]}</span>
 {isSelected && (
 <span className="ml-auto text-xs font-medium">
 Your answer
 </span>
 )}
 {isCorrect && !isSelected && (
 <span className="ml-auto text-xs font-medium">
 Correct answer
 </span>
 )}
 </div>
 );
 })}
 </div>

 <div className="bg-white dark:bg-[var(--card-hover)] p-3 rounded-lg border border-gray-200 dark:border-[var(--border)]">
 <p className="text-sm font-medium text-[var(--foreground)] mb-1">Explanation:</p>
 <p className="text-sm text-[var(--muted)]">{question.explanation}</p>
 {question.tip && (
 <p className="text-sm text-[var(--primary)] mt-2">
 <span className="font-medium">Tip:</span> {question.tip}
 </p>
 )}
 </div>

 {/* Notes Section */}
 <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
 {editingNote === attempt.question_id ? (
 <div className="space-y-2">
 <textarea
 value={noteText}
 onChange={(e) => setNoteText(e.target.value)}
 placeholder="Add your notes about this question..."
 rows={3}
 className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-white dark:bg-[var(--card)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none"
 autoFocus
 />
 <div className="flex items-center gap-2">
 <button
 onClick={() => saveNote(attempt.question_id, attempt)}
 disabled={savingNote || !noteText.trim()}
 className="px-3 py-1 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] disabled:opacity-50 transition-colors"
 >
 {savingNote ? "Saving..." : "Save Note"}
 </button>
 <button
 onClick={() => {
 setEditingNote(null);
 setNoteText("");
 }}
 className="px-3 py-1 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
 >
 Cancel
 </button>
 {notes.get(attempt.question_id) && (
 <button
 onClick={() => deleteNote(attempt.question_id)}
 disabled={savingNote}
 className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 ml-auto transition-colors"
 >
 Delete
 </button>
 )}
 </div>
 </div>
 ) : notes.get(attempt.question_id) ? (
 <div>
 <div className="flex items-start justify-between mb-1">
 <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Your Notes:</p>
 <button
 onClick={() => {
 setEditingNote(attempt.question_id);
 setNoteText(notes.get(attempt.question_id)?.note || "");
 }}
 className="text-xs text-yellow-700 dark:text-yellow-400 hover:underline"
 >
 Edit
 </button>
 </div>
 <p className="text-sm text-yellow-900 dark:text-yellow-200">{notes.get(attempt.question_id)?.note}</p>
 </div>
 ) : (
 <button
 onClick={() => setEditingNote(attempt.question_id)}
 className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
 >
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
 </svg>
 Add note for this question
 </button>
 )}
 </div>
 </>
 ) : (
 <div className="text-sm text-[var(--muted)]">
 <p>Question ID: {attempt.question_id}</p>
 <p>Your answer: {attempt.selected_answer}</p>
 <p>Correct answer: {attempt.correct_answer}</p>
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 </div>
 ) : (
 // Sessions List View
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <p className="text-[var(--muted)]">{sessions.length} practice sessions</p>
 </div>

 {sessions.map((session) => (
 <button
 key={session.id}
 onClick={() => setSelectedSession(session)}
 className="w-full bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all text-left"
 >
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
 <span className="text-white font-bold">{session.section}</span>
 </div>
 <div>
 <p className="font-semibold text-[var(--foreground)]">
 {session.totalCount} Questions
 </p>
 <p className="text-sm text-[var(--muted)]">
 {session.date.toLocaleDateString("en-US", {
 month:"short",
 day:"numeric",
 year:"numeric",
 hour:"numeric",
 minute:"2-digit",
 })}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-6">
 <div className="text-right">
 <p className={`text-xl font-bold ${
 session.accuracy >= 80 ?"text-green-600":
 session.accuracy >= 60 ?"text-yellow-600":
"text-red-600"
 }`}>
 {session.accuracy}%
 </p>
 <p className="text-xs text-[var(--muted)]">
 {session.correctCount}/{session.totalCount} correct
 </p>
 </div>
 <svg className="w-5 h-5 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </div>

 {session.topics.length > 0 && (
 <div className="mt-3 flex flex-wrap gap-2">
 {session.topics.slice(0, 3).map((topic) => (
 <span
 key={topic}
 className="px-2 py-1 bg-gray-100 text-[var(--muted)] rounded text-xs"
 >
 {topic}
 </span>
 ))}
 {session.topics.length > 3 && (
 <span className="px-2 py-1 text-[var(--muted)] text-xs">
 +{session.topics.length - 3} more
 </span>
 )}
 </div>
 )}
 </button>
 ))}
 </div>
 )}
 </div>
 );
}

export default function PracticeHistoryPage() {
 return (
 <Suspense fallback={
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 }>
 <PracticeHistoryContent />
 </Suspense>
 );
}
