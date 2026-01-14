'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allFlashcards, getFlashcardsBySection } from '@/lib/flashcards/sample-cards';
import { useAuth } from '@/components/auth/AuthProvider';

// Types
interface FlashcardUsage {
  used: number;
  limit: number;
  remaining: number;
  tier: string;
  resetDate: string;
  isBeta: boolean;
}

interface GeneratedFlashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  keyTakeaway?: string;
  section: string;
  generatedAt: string;
}

interface TopicPerformance {
  topic: string;
  accuracy_rate: number;
  total_attempted: number;
  mastery_level: 'weak' | 'moderate' | 'mastered';
}

type FlashcardSource = 'missed_questions' | 'weak_topics' | 'all_topics';
type TopicMode = 'ai_recommended' | 'manual';

const SECTIONS = [
  { value: 'FAR', label: 'FAR - Financial Accounting & Reporting' },
  { value: 'AUD', label: 'AUD - Auditing & Attestation' },
  { value: 'REG', label: 'REG - Regulation' },
  { value: 'TCP', label: 'TCP - Tax Compliance & Planning' },
  { value: 'BAR', label: 'BAR - Business Analysis & Reporting' },
  { value: 'ISC', label: 'ISC - Information Systems & Controls' },
];

const SOURCES: { value: FlashcardSource; label: string; description: string }[] = [
  { value: 'missed_questions', label: 'Missed Questions', description: 'Based on questions you got wrong' },
  { value: 'weak_topics', label: 'Weak Topics', description: 'Topics where you need improvement' },
  { value: 'all_topics', label: 'All Topics', description: 'General coverage of the section' },
];

export default function FlashcardsPage() {
 const { user } = useAuth();

 // Group flashcards by section
 const sections = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'] as const;

 const sectionInfo = {
 FAR: { name: 'Financial Accounting & Reporting', color: 'bg-blue-500' },
 AUD: { name: 'Auditing & Attestation', color: 'bg-purple-500' },
 REG: { name: 'Regulation', color: 'bg-orange-500' },
 TCP: { name: 'Tax Compliance & Planning', color: 'bg-green-500' },
 BAR: { name: 'Business Analysis & Reporting', color: 'bg-red-500' },
 ISC: { name: 'Information Systems & Controls', color: 'bg-cyan-500' },
 };

 // Calculate stats for each section
 const sectionStats = sections.map((section) => {
 const cards = getFlashcardsBySection(section);
 const topics = [...new Set(cards.map((c) => c.topic))];
 return {
 section,
 info: sectionInfo[section],
 totalCards: cards.length,
 topics: topics.length,
 dueCards: 0, // In production, calculate from user progress
 newCards: cards.length, // In production, exclude reviewed cards
 };
 });

 const totalCards = allFlashcards.length;
 const totalDue = 0; // In production, calculate from user progress

 // AI Flashcard Generator state
 const [usage, setUsage] = useState<FlashcardUsage | null>(null);
 const [selectedSection, setSelectedSection] = useState<string>('FAR');
 const [source, setSource] = useState<FlashcardSource>('missed_questions');
 const [cardCount, setCardCount] = useState<number>(3);
 const [generating, setGenerating] = useState(false);
 const [generatedCards, setGeneratedCards] = useState<GeneratedFlashcard[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [showGenerator, setShowGenerator] = useState(false);
 const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

 // Topic customization state
 const [topicMode, setTopicMode] = useState<TopicMode>('ai_recommended');
 const [userTopics, setUserTopics] = useState<TopicPerformance[]>([]);
 const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
 const [loadingTopics, setLoadingTopics] = useState(false);

 // Fetch usage on mount
 useEffect(() => {
  if (user) {
   fetchUsage();
  }
 }, [user]);

 // Fetch topics when section changes or generator opens
 useEffect(() => {
  if (user && showGenerator) {
   fetchUserTopics();
  }
 }, [user, selectedSection, showGenerator]);

 const fetchUsage = async () => {
  try {
   const response = await fetch('/api/ai/generate-flashcards');
   if (response.ok) {
    const data = await response.json();
    setUsage(data);
   }
  } catch (err) {
   console.error('Error fetching usage:', err);
  }
 };

 const fetchUserTopics = async () => {
  setLoadingTopics(true);
  try {
   const response = await fetch(`/api/ai/generate-flashcards/topics?section=${selectedSection}`);
   if (response.ok) {
    const data = await response.json();
    setUserTopics(data.topics || []);
    // Reset selected topics when section changes
    setSelectedTopics([]);
   }
  } catch (err) {
   console.error('Error fetching topics:', err);
   setUserTopics([]);
  } finally {
   setLoadingTopics(false);
  }
 };

 const toggleTopicSelection = (topic: string) => {
  setSelectedTopics(prev => {
   if (prev.includes(topic)) {
    return prev.filter(t => t !== topic);
   } else {
    return [...prev, topic];
   }
  });
 };

 const handleGenerate = async () => {
  if (!user) return;

  // Validate manual mode has topics selected
  if (topicMode === 'manual' && selectedTopics.length === 0) {
   setError('Please select at least one topic to generate flashcards.');
   return;
  }

  setGenerating(true);
  setError(null);

  try {
   const response = await fetch('/api/ai/generate-flashcards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     section: selectedSection,
     source: topicMode === 'manual' ? 'manual' : source,
     count: cardCount,
     focusTopics: topicMode === 'manual' ? selectedTopics : undefined,
    }),
   });

   const data = await response.json();

   if (!response.ok) {
    setError(data.error || 'Failed to generate flashcards');
    return;
   }

   setGeneratedCards(data.flashcards);
   setFlippedCards(new Set());
   fetchUsage();
  } catch (err) {
   console.error('Error generating flashcards:', err);
   setError('Failed to generate flashcards. Please try again.');
  } finally {
   setGenerating(false);
  }
 };

 const toggleCard = (cardId: string) => {
  setFlippedCards(prev => {
   const newSet = new Set(prev);
   if (newSet.has(cardId)) {
    newSet.delete(cardId);
   } else {
    newSet.add(cardId);
   }
   return newSet;
  });
 };

 return (
 <div className="p-6 max-w-6xl mx-auto">
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
 Flashcards
 </h1>
 <p className="text-[var(--muted)]">
 Review key CPA exam concepts with spaced repetition for better retention.
 </p>
 </div>

 {/* Quick Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
 <div className="bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
 <p className="text-2xl font-bold text-[var(--foreground)]">
 {totalCards}
 </p>
 <p className="text-sm text-[var(--muted)]">Total Cards</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
 <p className="text-2xl font-bold text-[var(--primary)]">
 {totalDue}
 </p>
 <p className="text-sm text-[var(--muted)]">Due Today</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
 <p className="text-2xl font-bold text-[var(--secondary)]">
 {sections.length}
 </p>
 <p className="text-sm text-[var(--muted)]">Sections</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
 <p className="text-2xl font-bold text-[var(--foreground)]">
 0
 </p>
 <p className="text-sm text-[var(--muted)]">Day Streak</p>
 </div>
 </div>

 {/* Quick Start */}
 <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-6 mb-8 text-white">
 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold mb-2">Start Reviewing</h2>
 <p className="opacity-90">
 Review all due cards across all sections, or choose a specific deck below.
 </p>
 </div>
 <Link
 href="/dashboard/flashcards/review"
 className="px-6 py-3 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
 >
 Review All Cards
 </Link>
 </div>
 </div>

 {/* How It Works */}
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
 <div className="flex items-start space-x-3">
 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 <div>
 <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
 How Spaced Repetition Works
 </h3>
 <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
 Cards you find easy will appear less frequently, while difficult cards will repeat more often.
 This optimizes your study time by focusing on what you need to learn most. Rate each card honestly
 for the best results.
 </p>
 </div>
 </div>
 </div>

 {/* AI Flashcard Generator */}
 <div className="bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
  {/* Header */}
  <button
   onClick={() => setShowGenerator(!showGenerator)}
   className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[var(--card-hover)] transition-colors"
  >
   <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
     </svg>
    </div>
    <div className="text-left">
     <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
      AI Flashcard Generator
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
       BETA
      </span>
     </h2>
     <p className="text-sm text-[var(--muted)]">Generate personalized flashcards from your weak areas</p>
    </div>
   </div>
   <div className="flex items-center gap-4">
    {usage && (
     <span className={`text-sm font-medium px-3 py-1 rounded-full ${
      usage.remaining > 0
       ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
       : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
     }`}>
      {usage.remaining}/{usage.limit} left
     </span>
    )}
    <svg className={`w-5 h-5 text-[var(--muted)] transition-transform ${showGenerator ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
    </svg>
   </div>
  </button>

  {/* Expanded Generator */}
  {showGenerator && (
   <div className="border-t border-[var(--border)]">
    {/* Usage Banner */}
    {usage && (
     <div className={`px-6 py-3 ${
      usage.remaining > 0
       ? 'bg-teal-50 dark:bg-teal-900/10'
       : 'bg-red-50 dark:bg-red-900/10'
     }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
       <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${usage.remaining > 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
        <span className={`text-sm font-medium ${usage.remaining > 0 ? 'text-teal-700 dark:text-teal-300' : 'text-red-700 dark:text-red-300'}`}>
         {usage.remaining}/{usage.limit} generation{usage.limit > 1 ? 's' : ''} remaining this month
        </span>
       </div>
       <span className="text-xs text-[var(--muted)]">
        Resets {new Date(usage.resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
       </span>
      </div>
     </div>
    )}

    <div className="p-6 space-y-6">
     {/* Section Selection */}
     <div>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
       Exam Section
      </label>
      <select
       value={selectedSection}
       onChange={(e) => setSelectedSection(e.target.value)}
       className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
      >
       {SECTIONS.map((section) => (
        <option key={section.value} value={section.value}>
         {section.label}
        </option>
       ))}
      </select>
     </div>

     {/* Topic Customization Mode */}
     <div className="space-y-4">
      <div>
       <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
        Topic Selection
       </label>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
         onClick={() => setTopicMode('ai_recommended')}
         className={`p-4 rounded-lg border-2 text-left transition-all ${
          topicMode === 'ai_recommended'
           ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
           : 'border-[var(--border)] hover:border-teal-300 dark:hover:border-teal-700'
         }`}
        >
         <div className="flex items-center gap-2">
          <svg className={`w-5 h-5 ${topicMode === 'ai_recommended' ? 'text-teal-600 dark:text-teal-400' : 'text-[var(--muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <span className={`font-medium ${topicMode === 'ai_recommended' ? 'text-teal-700 dark:text-teal-300' : 'text-[var(--foreground)]'}`}>
           AI Recommends
          </span>
         </div>
         <p className="text-xs text-[var(--muted)] mt-2">
          Let AI analyze your performance and pick the most beneficial topics for you
         </p>
        </button>
        <button
         onClick={() => setTopicMode('manual')}
         className={`p-4 rounded-lg border-2 text-left transition-all ${
          topicMode === 'manual'
           ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
           : 'border-[var(--border)] hover:border-teal-300 dark:hover:border-teal-700'
         }`}
        >
         <div className="flex items-center gap-2">
          <svg className={`w-5 h-5 ${topicMode === 'manual' ? 'text-teal-600 dark:text-teal-400' : 'text-[var(--muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
          <span className={`font-medium ${topicMode === 'manual' ? 'text-teal-700 dark:text-teal-300' : 'text-[var(--foreground)]'}`}>
           Choose Topics
          </span>
         </div>
         <p className="text-xs text-[var(--muted)] mt-2">
          Select specific topics you want to focus on from your study areas
         </p>
        </button>
       </div>
      </div>

      {/* AI Recommended Options */}
      {topicMode === 'ai_recommended' && (
       <div className="bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg p-4 space-y-3">
        <div className="flex items-start gap-2">
         <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
         </svg>
         <div>
          <p className="text-sm font-medium text-[var(--foreground)]">How AI selects topics</p>
          <p className="text-xs text-[var(--muted)] mt-1">
           Based on your practice history, the AI will prioritize topics where you need the most reinforcement.
          </p>
         </div>
        </div>
        <label className="block text-sm font-medium text-[var(--foreground)]">
         Focus Area
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
         {SOURCES.map((s) => (
          <button
           key={s.value}
           onClick={() => setSource(s.value)}
           className={`px-3 py-2 rounded-lg border text-left transition-all text-sm ${
            source === s.value
             ? 'border-teal-500 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
             : 'border-[var(--border)] hover:border-teal-300 dark:hover:border-teal-700 text-[var(--foreground)]'
           }`}
          >
           <div className="font-medium">{s.label}</div>
           <div className="text-xs text-[var(--muted)] mt-0.5">{s.description}</div>
          </button>
         ))}
        </div>
        {/* Show what AI will focus on */}
        {userTopics.length > 0 && (
         <div className="mt-3 pt-3 border-t border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--muted)] mb-2">
           {source === 'weak_topics' ? 'Your weak areas AI will prioritize:' :
            source === 'missed_questions' ? 'Topics from your recent mistakes:' :
            'Topics AI may cover:'}
          </p>
          <div className="flex flex-wrap gap-1.5">
           {userTopics
            .filter(t => source === 'weak_topics' ? t.mastery_level === 'weak' || t.accuracy_rate < 60 : true)
            .slice(0, 5)
            .map((topic) => (
             <span
              key={topic.topic}
              className={`text-xs px-2 py-1 rounded-full ${
               topic.mastery_level === 'weak' || topic.accuracy_rate < 60
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : topic.mastery_level === 'moderate' || topic.accuracy_rate < 75
                 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                 : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              }`}
             >
              {topic.topic} ({Math.round(topic.accuracy_rate)}%)
             </span>
            ))}
           {userTopics.length === 0 && !loadingTopics && (
            <span className="text-xs text-[var(--muted)]">Complete some practice questions to see personalized recommendations</span>
           )}
           {loadingTopics && (
            <span className="text-xs text-[var(--muted)]">Loading your topics...</span>
           )}
          </div>
         </div>
        )}
       </div>
      )}

      {/* Manual Topic Selection */}
      {topicMode === 'manual' && (
       <div className="bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg p-4 space-y-3">
        <div className="flex items-start gap-2">
         <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
         </svg>
         <div>
          <p className="text-sm font-medium text-[var(--foreground)]">Select topics for your flashcards</p>
          <p className="text-xs text-[var(--muted)] mt-1">
           Choose one or more topics below. Your performance data helps identify areas that may benefit from review.
          </p>
         </div>
        </div>

        {loadingTopics ? (
         <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
          <span className="ml-2 text-sm text-[var(--muted)]">Loading topics...</span>
         </div>
        ) : userTopics.length > 0 ? (
         <div className="space-y-2 max-h-64 overflow-y-auto">
          {userTopics.map((topic) => (
           <button
            key={topic.topic}
            onClick={() => toggleTopicSelection(topic.topic)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
             selectedTopics.includes(topic.topic)
              ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
              : 'border-[var(--border)] hover:border-teal-300 dark:hover:border-teal-700'
            }`}
           >
            <div className="flex items-center gap-3">
             <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              selectedTopics.includes(topic.topic)
               ? 'border-teal-500 bg-teal-500'
               : 'border-gray-300 dark:border-gray-600'
             }`}>
              {selectedTopics.includes(topic.topic) && (
               <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
               </svg>
              )}
             </div>
             <span className="text-sm font-medium text-[var(--foreground)]">{topic.topic}</span>
            </div>
            <div className="flex items-center gap-2">
             <span className={`text-xs px-2 py-0.5 rounded-full ${
              topic.mastery_level === 'weak' || topic.accuracy_rate < 60
               ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
               : topic.mastery_level === 'moderate' || topic.accuracy_rate < 75
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
             }`}>
              {Math.round(topic.accuracy_rate)}%
             </span>
             <span className="text-xs text-[var(--muted)]">
              {topic.total_attempted} Qs
             </span>
            </div>
           </button>
          ))}
         </div>
        ) : (
         <div className="text-center py-6">
          <svg className="w-12 h-12 text-[var(--muted)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p className="text-sm text-[var(--muted)]">No practice data for {selectedSection} yet</p>
          <p className="text-xs text-[var(--muted)] mt-1">Complete some practice questions to unlock personalized topic selection</p>
         </div>
        )}

        {selectedTopics.length > 0 && (
         <div className="pt-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted)]">
           <span className="font-medium text-teal-600 dark:text-teal-400">{selectedTopics.length}</span> topic{selectedTopics.length !== 1 ? 's' : ''} selected
          </p>
         </div>
        )}
       </div>
      )}
     </div>

     {/* Card Count */}
     <div>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
       Number of Flashcards
      </label>
      <div className="flex items-center gap-4">
       <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={cardCount}
        onChange={(e) => setCardCount(parseInt(e.target.value))}
        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
       />
       <span className="w-16 text-center font-medium text-[var(--foreground)] bg-teal-100 dark:bg-teal-900/30 px-3 py-1 rounded-lg">
        {cardCount} card{cardCount > 1 ? 's' : ''}
       </span>
      </div>
     </div>

     {/* Error Message */}
     {error && (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
       {error}
      </div>
     )}

     {/* Generate Button */}
     <button
      onClick={handleGenerate}
      disabled={generating || (usage?.remaining === 0)}
      className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
     >
      {generating ? (
       <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        Generating Flashcards...
       </>
      ) : (
       <>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        Generate {cardCount} Flashcard{cardCount > 1 ? 's' : ''}
       </>
      )}
     </button>
    </div>

    {/* Generated Cards Display */}
    {generatedCards.length > 0 && (
     <div className="border-t border-[var(--border)] p-6">
      <div className="flex items-center justify-between mb-4">
       <h3 className="font-semibold text-[var(--foreground)]">
        Generated Flashcards ({generatedCards.length})
       </h3>
       <span className="text-xs text-[var(--muted)]">Click cards to flip</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
       {generatedCards.map((card) => (
        <button
         key={card.id}
         onClick={() => toggleCard(card.id)}
         className="text-left p-4 rounded-xl border border-[var(--border)] bg-gradient-to-br from-white to-gray-50 dark:from-[var(--card)] dark:to-[var(--card-hover)] hover:shadow-md transition-all min-h-[140px] relative group"
        >
         <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
           {card.topic}
          </span>
         </div>
         <div className="pt-4">
          {flippedCards.has(card.id) ? (
           <>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-1">ANSWER</p>
            <p className="text-sm text-[var(--foreground)] whitespace-pre-wrap">{card.back}</p>
           </>
          ) : (
           <>
            <p className="text-xs text-[var(--muted)] font-medium mb-1">QUESTION</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{card.front}</p>
           </>
          )}
         </div>
         <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
         </div>
        </button>
       ))}
      </div>
      {generatedCards.some(c => c.keyTakeaway) && (
       <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
        <p className="text-sm font-medium text-teal-800 dark:text-teal-200 mb-2">Key Takeaways</p>
        <ul className="space-y-1">
         {generatedCards.filter(c => c.keyTakeaway).map((card) => (
          <li key={card.id} className="text-sm text-teal-700 dark:text-teal-300 flex items-start gap-2">
           <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
           </svg>
           {card.keyTakeaway}
          </li>
         ))}
        </ul>
       </div>
      )}
     </div>
    )}
   </div>
  )}
 </div>

 {/* Section Decks */}
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Decks by Section
 </h2>
 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {sectionStats.map((stat) => (
 <Link
 key={stat.section}
 href={`/dashboard/flashcards/${stat.section.toLowerCase()}`}
 className="block bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)] hover:shadow-md transition-all group"
 >
 <div className="flex items-start justify-between mb-3">
 <div className={`px-3 py-1 ${stat.info.color} text-white text-sm font-bold rounded-lg`}>
 {stat.section}
 </div>
 {stat.dueCards > 0 && (
 <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
 {stat.dueCards} due
 </span>
 )}
 </div>

 <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">
 {stat.info.name}
 </h3>

 <div className="flex items-center text-sm text-[var(--muted)] gap-3">
 <span>{stat.totalCards} cards</span>
 <span>·</span>
 <span>{stat.topics} topics</span>
 </div>

 {/* Progress bar - placeholder */}
 <div className="mt-4">
 <div className="h-1.5 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div className="h-full bg-[var(--secondary)] w-0"/>
 </div>
 <p className="text-xs text-[var(--muted)] mt-1">
 0% mastered
 </p>
 </div>

 <div className="mt-4 flex items-center text-sm font-medium text-[var(--primary)] group-hover:underline">
 Study this deck
 <svg className="w-4 h-4 ml-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </Link>
 ))}
 </div>

 {/* Tips */}
 <div className="mt-8 bg-gray-50 dark:bg-[var(--card)]/50 border border-[var(--border)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Tips for Effective Flashcard Study
 </h3>
 <div className="grid md:grid-cols-2 gap-4">
 <div className="flex items-start gap-3">
 <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
 1
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">Review daily</p>
 <p className="text-sm text-[var(--muted)]">
 Consistency beats intensity. 15 minutes daily is better than 2 hours once a week.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
 2
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">Be honest with ratings</p>
 <p className="text-sm text-[var(--muted)]">
 If you struggled, mark it as Hard. The algorithm works best with honest input.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
 3
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">Clear due cards first</p>
 <p className="text-sm text-[var(--muted)]">
 Prioritize cards that are due before adding new ones to your rotation.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
 4
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">Use with practice questions</p>
 <p className="text-sm text-[var(--muted)]">
 Flashcards build recall; MCQs test application. Use both together.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
