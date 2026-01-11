"use client";

import { useState, useEffect } from"react";
import { PracticeQuestion } from"@/lib/data/practice-questions";
import { useAuth } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";
import FeedbackButton from"./FeedbackButton";

interface QuizQuestionProps {
 question: PracticeQuestion;
 questionNumber: number;
 totalQuestions: number;
 onAnswer: (selectedAnswer: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
 onNext: () => void;
 isLast: boolean;
}

export default function QuizQuestion({
 question,
 questionNumber,
 totalQuestions,
 onAnswer,
 onNext,
 isLast,
}: QuizQuestionProps) {
 const { user } = useAuth();
 const supabase = createClient();
 const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
 const [hasSubmitted, setHasSubmitted] = useState(false);

 // Notes state
 const [showNotes, setShowNotes] = useState(false);
 const [note, setNote] = useState("");
 const [savedNote, setSavedNote] = useState("");
 const [isSaving, setIsSaving] = useState(false);
 const [isLoadingNote, setIsLoadingNote] = useState(false);

 // Load existing note when question changes or after submission
 useEffect(() => {
 if (!user || !supabase || !hasSubmitted) return;

 const loadNote = async () => {
 setIsLoadingNote(true);
 try {
 const { data } = await supabase
 .from('question_notes')
 .select('note')
 .eq('user_id', user.id)
 .eq('question_id', question.id)
 .single();

 if (data) {
 setNote(data.note);
 setSavedNote(data.note);
 }
 } catch {
 // No note exists
 } finally {
 setIsLoadingNote(false);
 }
 };

 loadNote();
 }, [user, supabase, question.id, hasSubmitted]);

 // Reset state when question changes
 useEffect(() => {
 setNote("");
 setSavedNote("");
 setShowNotes(false);
 }, [question.id]);

 const handleSaveNote = async () => {
 if (!user || !supabase || !note.trim()) return;

 setIsSaving(true);
 try {
 // First try to find existing note
 const { data: existing } = await supabase
 .from('question_notes')
 .select('id')
 .eq('user_id', user.id)
 .eq('question_id', question.id)
 .single();

 if (existing) {
 // Update existing note
 const { error } = await supabase
 .from('question_notes')
 .update({
 note: note.trim(),
 updated_at: new Date().toISOString(),
 })
 .eq('id', existing.id);

 if (error) {
 console.error('Failed to update note:', error);
 return;
 }
 } else {
 // Insert new note
 const { error } = await supabase
 .from('question_notes')
 .insert({
 user_id: user.id,
 question_id: question.id,
 section: question.section,
 topic: question.topic,
 subtopic: question.subtopic || null,
 note: note.trim(),
 is_starred: false,
 confidence: null,
 });

 if (error) {
 console.error('Failed to insert note:', error);
 return;
 }
 }

 setSavedNote(note.trim());
 } catch (error) {
 console.error('Failed to save note:', error);
 } finally {
 setIsSaving(false);
 }
 };

 const handleSelectAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
 if (hasSubmitted) return;
 setSelectedAnswer(answer);
 };

 const handleSubmit = () => {
 if (!selectedAnswer) return;
 const isCorrect = selectedAnswer === question.correctAnswer;
 onAnswer(selectedAnswer, isCorrect);
 setHasSubmitted(true);
 };

 const handleNext = () => {
 setSelectedAnswer(null);
 setHasSubmitted(false);
 onNext();
 };

 // Difficulty colors removed - hiding difficulty from students

 const getOptionClass = (option: 'A' | 'B' | 'C' | 'D') => {
 const baseClass ="w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-start space-x-3";

 if (!hasSubmitted) {
 if (selectedAnswer === option) {
 return `${baseClass} border-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10`;
 }
 return `${baseClass} border-[var(--border)] dark:border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10`;
 }

 // After submission
 if (option === question.correctAnswer) {
 return `${baseClass} border-green-500 bg-green-50 dark:bg-green-900/30`;
 }
 if (selectedAnswer === option && option !== question.correctAnswer) {
 return `${baseClass} border-red-500 bg-red-50 dark:bg-red-900/30`;
 }
 return `${baseClass} border-[var(--border)] opacity-50`;
 };

 return (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
 {/* Header */}
 <div className="bg-[var(--card)] dark:bg-[var(--background)] px-6 py-4 border-b border-[var(--border)]">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-3">
 <span className="text-sm font-medium text-[var(--muted)]">
 Question {questionNumber} of {totalQuestions}
 </span>
 {/* Difficulty hidden - let adaptive model handle question selection */}
 </div>
 <span className="text-sm text-[var(--primary)] font-medium">{question.topic}</span>
 </div>
 {/* Progress bar */}
 <div className="mt-3 w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-1.5">
 <div
 className="bg-[var(--primary)] h-1.5 rounded-full transition-all duration-300"
 style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
 />
 </div>
 </div>

 {/* Question */}
 <div className="p-6">
 <p className="text-lg font-medium text-[var(--foreground)] mb-6">
 {question.question}
 </p>

 {/* Options */}
 <div className="space-y-3">
 {(['A', 'B', 'C', 'D'] as const).map((option) => (
 <button
 key={option}
 onClick={() => handleSelectAnswer(option)}
 disabled={hasSubmitted}
 className={getOptionClass(option)}
 >
 <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
 hasSubmitted
 ? option === question.correctAnswer
 ? 'bg-green-500 text-white'
 : selectedAnswer === option
 ? 'bg-red-500 text-white'
 : 'bg-gray-200 dark:bg-[var(--border)] text-gray-500 dark:text-[var(--muted)]'
 : selectedAnswer === option
 ? 'bg-[var(--primary)] text-white'
 : 'bg-gray-200 dark:bg-[var(--border)] text-gray-600 dark:text-[var(--muted-light)]'
 }`}>
 {option}
 </span>
 <span className="text-[var(--foreground)]">{question.options[option]}</span>
 </button>
 ))}
 </div>

 {/* Submit / Next Button */}
 {!hasSubmitted ? (
 <button
 onClick={handleSubmit}
 disabled={!selectedAnswer}
 className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
 selectedAnswer
 ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
 : 'bg-gray-200 dark:bg-[var(--card-hover)] text-gray-400 dark:text-[var(--muted)] cursor-not-allowed'
 }`}
 >
 Submit Answer
 </button>
 ) : (
 <button
 onClick={handleNext}
 className="w-full mt-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-all duration-200"
 >
 {isLast ? 'See Results' : 'Next Question'}
 </button>
 )}

 {/* Explanation (shown after submission) */}
 {hasSubmitted && (
 <div className={`mt-6 p-4 rounded-lg ${
 selectedAnswer === question.correctAnswer ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
 }`}>
 <div className="flex items-center space-x-2 mb-2">
 {selectedAnswer === question.correctAnswer ? (
 <>
 <svg className="w-5 h-5 text-green-600 dark:text-green-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 <span className="font-semibold text-green-700 dark:text-green-300">Correct!</span>
 </>
 ) : (
 <>
 <svg className="w-5 h-5 text-red-600 dark:text-red-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 <span className="font-semibold text-red-700 dark:text-red-300">
 Incorrect - The correct answer is {question.correctAnswer}
 </span>
 </>
 )}
 </div>
 <p className="text-[var(--foreground)] text-sm">
 {question.explanation}
 </p>
 {question.tip && (
 <div className="mt-3 p-3 bg-white/50 dark:bg-[var(--card-hover)]/50 rounded border border-[var(--border)] dark:border-[var(--border)]">
 <p className="text-sm text-[var(--primary)] font-medium">
 <span className="font-bold">Tip:</span> {question.tip}
 </p>
 </div>
 )}

 {/* Quick Notes Section */}
 {user && (
 <div className="mt-4 pt-4 border-t border-[var(--border)]">
 {!showNotes ? (
 <button
 onClick={() => setShowNotes(true)}
 className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
 >
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
 </svg>
 {savedNote ? 'View/Edit Note' : 'Add Note'}
 {savedNote && (
 <span className="text-green-600 dark:text-green-400 text-xs">(saved)</span>
 )}
 </button>
 ) : (
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <span className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
 <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
 </svg>
 Your Note
 </span>
 <button
 onClick={() => setShowNotes(false)}
 className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
 >
 Hide
 </button>
 </div>
 {isLoadingNote ? (
 <div className="text-sm text-gray-500">Loading...</div>
 ) : (
 <>
 <textarea
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Add a note about this question (rules, formulas, reminders)..."
 className="w-full p-3 text-sm border border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
 rows={2}
 />
 <div className="flex items-center justify-between">
 <span className="text-xs text-gray-500 dark:text-gray-400">
 Notes are saved to your My Notes hub
 </span>
 <button
 onClick={handleSaveNote}
 disabled={isSaving || !note.trim() || note.trim() === savedNote}
 className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
 >
 {isSaving ? 'Saving...' : savedNote ? 'Update Note' : 'Save Note'}
 </button>
 </div>
 </>
 )}
 </div>
 )}
 </div>
 )}

 {/* Feedback Button */}
 <div className="mt-4 pt-4 border-t border-[var(--border)] dark:border-[var(--border)] flex justify-end">
 <FeedbackButton
 questionId={question.id}
 section={question.section}
 variant="default"
 />
 </div>
 </div>
 )}
 </div>
 </div>
 );
}
