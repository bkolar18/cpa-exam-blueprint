"use client";

import { useState, useEffect } from"react";
import { PracticeQuestion } from"@/lib/data/practice-questions";
import { useAuth } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";
import FeedbackButton from"./FeedbackButton";
import QuestionFlags from"./QuestionFlags";

interface QuestionReviewProps {
 question: PracticeQuestion;
 selectedAnswer: 'A' | 'B' | 'C' | 'D';
 isCorrect: boolean;
 questionNumber: number;
 onClose: () => void;
}

// Confidence levels for spaced repetition
const confidenceLevels = [
 { value: 1, label:"Didn't know", color:"bg-red-500", description:"Need to study more"},
 { value: 2, label:"Struggled", color:"bg-orange-500", description:"Partially remembered"},
 { value: 3, label:"Good", color:"bg-yellow-500", description:"Knew it with effort"},
 { value: 4, label:"Easy", color:"bg-green-500", description:"Knew it quickly"},
 { value: 5, label:"Perfect", color:"bg-emerald-500", description:"Instant recall"},
];

export default function QuestionReview({
 question,
 selectedAnswer,
 isCorrect,
 questionNumber,
 onClose,
}: QuestionReviewProps) {
 const { user } = useAuth();
 const supabase = createClient();
 const [note, setNote] = useState("");
 const [savedNote, setSavedNote] = useState("");
 const [isEditing, setIsEditing] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [isLoading, setIsLoading] = useState(true);

 // Active recall: notes hidden by default when they exist
 const [isNoteExpanded, setIsNoteExpanded] = useState(false);
 // Star/flag important notes
 const [isStarred, setIsStarred] = useState(false);
 // Confidence rating
 const [confidence, setConfidence] = useState<number | null>(null);
 const [showConfidenceRating, setShowConfidenceRating] = useState(false);

 // Load existing note
 useEffect(() => {
 const loadNote = async () => {
 if (!user || !supabase) {
 setIsLoading(false);
 // No note = expand notes section for easy adding
 setIsNoteExpanded(true);
 return;
 }

 try {
 const { data, error } = await supabase
 .from('question_notes')
 .select('note, is_starred, confidence')
 .eq('user_id', user.id)
 .eq('question_id', question.id)
 .single();

 if (data && !error) {
 setNote(data.note);
 setSavedNote(data.note);
 setIsStarred(data.is_starred || false);
 setConfidence(data.confidence || null);
 // Has note = collapsed by default for active recall
 setIsNoteExpanded(false);
 } else {
 // No note = expand notes section for easy adding
 setIsNoteExpanded(true);
 }
 } catch {
 // No note exists yet = expand notes section
 setIsNoteExpanded(true);
 } finally {
 setIsLoading(false);
 }
 };

 loadNote();
 }, [user, question.id, supabase]);

 const handleSaveNote = async () => {
 if (!user || !supabase) return;

 setIsSaving(true);
 try {
 const { error } = await supabase
 .from('question_notes')
 .upsert({
 user_id: user.id,
 question_id: question.id,
 section: question.section,
 topic: question.topic,
 subtopic: question.subtopic || null,
 note: note.trim(),
 is_starred: isStarred,
 confidence: confidence,
 updated_at: new Date().toISOString(),
 }, {
 onConflict: 'user_id,question_id'
 });

 if (error) throw error;

 setSavedNote(note.trim());
 setIsEditing(false);
 } catch (error) {
 console.error('Failed to save note:', error);
 } finally {
 setIsSaving(false);
 }
 };

 const handleToggleStar = async () => {
 if (!user || !supabase || !savedNote) return;

 const newStarred = !isStarred;
 setIsStarred(newStarred);

 try {
 await supabase
 .from('question_notes')
 .update({ is_starred: newStarred, updated_at: new Date().toISOString() })
 .eq('user_id', user.id)
 .eq('question_id', question.id);
 } catch (error) {
 console.error('Failed to toggle star:', error);
 setIsStarred(!newStarred); // Revert on error
 }
 };

 const handleConfidenceRating = async (level: number) => {
 if (!user || !supabase || !savedNote) return;

 setConfidence(level);
 setShowConfidenceRating(false);

 try {
 await supabase
 .from('question_notes')
 .update({ confidence: level, updated_at: new Date().toISOString() })
 .eq('user_id', user.id)
 .eq('question_id', question.id);
 } catch (error) {
 console.error('Failed to save confidence:', error);
 }
 };

 const handleDeleteNote = async () => {
 if (!user || !supabase) return;

 setIsSaving(true);
 try {
 await supabase
 .from('question_notes')
 .delete()
 .eq('user_id', user.id)
 .eq('question_id', question.id);

 setNote("");
 setSavedNote("");
 setIsEditing(false);
 } catch (error) {
 console.error('Failed to delete note:', error);
 } finally {
 setIsSaving(false);
 }
 };

 // Difficulty colors removed - hiding difficulty from students

 const getOptionClass = (option: 'A' | 'B' | 'C' | 'D') => {
 const baseClass ="w-full p-4 text-left rounded-lg border-2 flex items-start space-x-3";

 if (option === question.correctAnswer) {
 return `${baseClass} border-green-500 bg-green-50 dark:bg-green-900/30`;
 }
 if (selectedAnswer === option && option !== question.correctAnswer) {
 return `${baseClass} border-red-500 bg-red-50 dark:bg-red-900/30`;
 }
 return `${baseClass} border-[var(--border)] opacity-50`;
 };

 return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
 {/* Header */}
 <div className="bg-[var(--card)] dark:bg-[var(--background)] px-6 py-4 border-b border-[var(--border)] sticky top-0">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-3">
 <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
 isCorrect ? 'bg-green-500' : 'bg-red-500'
 }`}>
 {questionNumber}
 </span>
 {/* Difficulty hidden - let adaptive model handle question selection */}
 <span className="text-sm text-[var(--primary)] font-medium">{question.topic}</span>
 </div>
 <button
 onClick={onClose}
 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 <svg className="w-5 h-5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </button>
 </div>
 </div>

 {/* Question Content */}
 <div className="p-6">
 <p className="text-lg font-medium text-[var(--foreground)] mb-6">
 {question.question}
 </p>

 {/* Options */}
 <div className="space-y-3 mb-6">
 {(['A', 'B', 'C', 'D'] as const).map((option) => (
 <div key={option} className={getOptionClass(option)}>
 <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
 option === question.correctAnswer
 ? 'bg-green-500 text-white'
 : selectedAnswer === option
 ? 'bg-red-500 text-white'
 : 'bg-gray-200 dark:bg-[var(--border)] text-gray-500 dark:text-[var(--muted)]'
 }`}>
 {option}
 </span>
 <span className="text-[var(--foreground)]">{question.options[option]}</span>
 </div>
 ))}
 </div>

 {/* Result & Explanation */}
 <div className={`p-4 rounded-lg ${
 isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
 }`}>
 <div className="flex items-center space-x-2 mb-2">
 {isCorrect ? (
 <>
 <svg className="w-5 h-5 text-green-600 dark:text-green-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 <span className="font-semibold text-green-700 dark:text-green-300">You answered correctly!</span>
 </>
 ) : (
 <>
 <svg className="w-5 h-5 text-red-600 dark:text-red-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 <span className="font-semibold text-red-700 dark:text-red-300">
 Your answer: {selectedAnswer} | Correct answer: {question.correctAnswer}
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
 </div>

 {/* Question Flags */}
 {user && (
 <div className="mt-4 flex items-center justify-between">
 <span className="text-sm text-[var(--muted)]">Flag this question:</span>
 <QuestionFlags
 questionId={question.id}
 section={question.section}
 topic={question.topic}
 subtopic={question.subtopic}
 />
 </div>
 )}

 {/* Personal Notes Section */}
 {user && (
 <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
 <div className="flex items-center justify-between mb-3">
 <div className="flex items-center space-x-2">
 <svg className="w-5 h-5 text-blue-600 dark:text-blue-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
 </svg>
 <span className="font-semibold text-blue-800 dark:text-blue-300">Your Notes</span>
 {savedNote && (
 <button
 onClick={handleToggleStar}
 className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
 title={isStarred ?"Unstar this note":"Star this note"}
 >
 <svg
 className={`w-5 h-5 ${isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
 fill={isStarred ?"currentColor":"none"}
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
 </svg>
 </button>
 )}
 {confidence && (
 <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${confidenceLevels[confidence - 1].color}`}>
 {confidenceLevels[confidence - 1].label}
 </span>
 )}
 </div>
 <div className="flex items-center space-x-2">
 {savedNote && !isEditing && !isNoteExpanded && (
 <button
 onClick={() => setIsNoteExpanded(true)}
 className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 flex items-center space-x-1"
 >
 <span>Show Note</span>
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 9l-7 7-7-7"/>
 </svg>
 </button>
 )}
 {savedNote && !isEditing && isNoteExpanded && (
 <>
 <button
 onClick={() => setShowConfidenceRating(true)}
 className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
 title="Rate your confidence"
 >
 Rate
 </button>
 <button
 onClick={() => setIsEditing(true)}
 className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
 >
 Edit
 </button>
 <button
 onClick={() => setIsNoteExpanded(false)}
 className="text-sm text-gray-500 dark:text-[var(--muted)] hover:text-gray-700 dark:hover:text-gray-200"
 >
 Hide
 </button>
 </>
 )}
 </div>
 </div>

 {/* Active Recall: Hidden note prompt */}
 {savedNote && !isNoteExpanded && !isEditing && (
 <div className="text-sm text-blue-600 dark:text-blue-400 italic">
 You have a note for this question. Try to recall it before revealing!
 </div>
 )}

 {/* Confidence Rating Modal */}
 {showConfidenceRating && (
 <div className="mb-4 p-3 bg-white dark:bg-[var(--card)] rounded-lg border border-purple-200 dark:border-purple-700">
 <p className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">
 How well did you remember this concept?
 </p>
 <div className="flex flex-wrap gap-2">
 {confidenceLevels.map((level) => (
 <button
 key={level.value}
 onClick={() => handleConfidenceRating(level.value)}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white ${level.color} hover:opacity-90 transition-opacity`}
 title={level.description}
 >
 {level.label}
 </button>
 ))}
 <button
 onClick={() => setShowConfidenceRating(false)}
 className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-gray-700"
 >
 Cancel
 </button>
 </div>
 </div>
 )}

 {isLoading ? (
 <div className="text-sm text-blue-600 dark:text-blue-400">Loading notes...</div>
 ) : isEditing || !savedNote ? (
 <div className="space-y-3">
 <textarea
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Add your personal notes about this question (rules, formulas, reminders)..."
 className="w-full p-3 text-sm border border-blue-300 dark:border-blue-700 rounded-lg bg-white dark:bg-[var(--card)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
 rows={3}
 />
 <div className="flex items-center justify-end space-x-2">
 {savedNote && (
 <>
 <button
 onClick={handleDeleteNote}
 disabled={isSaving}
 className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
 >
 Delete
 </button>
 <button
 onClick={() => {
 setNote(savedNote);
 setIsEditing(false);
 }}
 disabled={isSaving}
 className="px-3 py-1.5 text-sm text-gray-600 dark:text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
 >
 Cancel
 </button>
 </>
 )}
 <button
 onClick={handleSaveNote}
 disabled={isSaving || !note.trim()}
 className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
 >
 {isSaving ? 'Saving...' : 'Save Note'}
 </button>
 </div>
 </div>
 ) : isNoteExpanded ? (
 <div className="text-sm text-[var(--foreground)] whitespace-pre-wrap bg-white dark:bg-[var(--card)] p-3 rounded-lg border border-blue-200 dark:border-blue-700">
 {savedNote}
 </div>
 ) : null}
 </div>
 )}

 {!user && (
 <div className="mt-6 p-4 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg border border-gray-200 dark:border-[var(--border)]">
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">
 <span className="font-medium">Sign in</span> to save personal notes on questions.
 </p>
 </div>
 )}

 {/* Feedback Button */}
 <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-end">
 <FeedbackButton
 questionId={question.id}
 section={question.section}
 variant="default"
 />
 </div>
 </div>
 </div>
 </div>
 );
}
