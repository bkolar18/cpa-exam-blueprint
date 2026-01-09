"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { getQuestionById, PracticeQuestion } from "@/lib/data/practice-questions";
import type { SectionCode } from "@/lib/supabase/types";

interface QuestionNote {
  id: string;
  question_id: string;
  section: SectionCode;
  topic: string;
  subtopic: string | null;
  note: string;
  is_starred: boolean;
  confidence: number | null;
  created_at: string;
  updated_at: string;
}

// Confidence level definitions
const confidenceLevels = [
  { value: 1, label: "Didn't know", color: "bg-red-500" },
  { value: 2, label: "Struggled", color: "bg-orange-500" },
  { value: 3, label: "Good", color: "bg-yellow-500" },
  { value: 4, label: "Easy", color: "bg-green-500" },
  { value: 5, label: "Perfect", color: "bg-emerald-500" },
];

interface NoteWithQuestion extends QuestionNote {
  question?: PracticeQuestion;
}

// Organized structure: Section -> Topic -> Subtopic -> Notes
interface OrganizedNotes {
  [section: string]: {
    [topic: string]: {
      [subtopic: string]: NoteWithQuestion[];
    };
  };
}

const sectionNames: Record<string, string> = {
  FAR: 'Financial Accounting & Reporting',
  AUD: 'Auditing & Attestation',
  REG: 'Regulation',
  TCP: 'Tax Compliance & Planning',
  BAR: 'Business Analysis & Reporting',
  ISC: 'Information Systems & Controls',
};

const sectionColors: Record<string, string> = {
  FAR: 'bg-blue-500',
  AUD: 'bg-green-500',
  REG: 'bg-purple-500',
  TCP: 'bg-orange-500',
  BAR: 'bg-pink-500',
  ISC: 'bg-cyan-500',
};

export default function MyNotesPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [notes, setNotes] = useState<NoteWithQuestion[]>([]);
  const [organizedNotes, setOrganizedNotes] = useState<OrganizedNotes>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Load all notes
  useEffect(() => {
    const loadNotes = async () => {
      if (!user || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('question_notes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        // Enrich notes with question data
        const enrichedNotes: NoteWithQuestion[] = (data || []).map((note: QuestionNote) => ({
          ...note,
          question: getQuestionById(note.question_id),
        }));

        setNotes(enrichedNotes);

        // Organize notes by section -> topic -> subtopic
        const organized: OrganizedNotes = {};
        enrichedNotes.forEach((note) => {
          const section = note.section;
          const topic = note.topic || 'General';
          const subtopic = note.subtopic || 'General';

          if (!organized[section]) {
            organized[section] = {};
          }
          if (!organized[section][topic]) {
            organized[section][topic] = {};
          }
          if (!organized[section][topic][subtopic]) {
            organized[section][topic][subtopic] = [];
          }
          organized[section][topic][subtopic].push(note);
        });

        setOrganizedNotes(organized);

        // Expand first topic by default
        if (Object.keys(organized).length > 0) {
          const firstSection = Object.keys(organized)[0];
          const firstTopic = Object.keys(organized[firstSection])[0];
          setExpandedTopics(new Set([`${firstSection}-${firstTopic}`]));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, [user, supabase]);

  const toggleTopic = (key: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleEditNote = (note: NoteWithQuestion) => {
    setEditingNoteId(note.id);
    setEditingText(note.note);
  };

  const handleSaveEdit = async () => {
    if (!user || !supabase || !editingNoteId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('question_notes')
        .update({
          note: editingText.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingNoteId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? { ...n, note: editingText.trim(), updated_at: new Date().toISOString() }
            : n
        )
      );

      // Update organized notes
      setOrganizedNotes((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((section) => {
          Object.keys(updated[section]).forEach((topic) => {
            Object.keys(updated[section][topic]).forEach((subtopic) => {
              updated[section][topic][subtopic] = updated[section][topic][subtopic].map((n) =>
                n.id === editingNoteId
                  ? { ...n, note: editingText.trim(), updated_at: new Date().toISOString() }
                  : n
              );
            });
          });
        });
        return updated;
      });

      setEditingNoteId(null);
      setEditingText("");
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!user || !supabase) return;
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const { error } = await supabase
        .from('question_notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setNotes((prev) => prev.filter((n) => n.id !== noteId));

      // Update organized notes
      setOrganizedNotes((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((section) => {
          Object.keys(updated[section]).forEach((topic) => {
            Object.keys(updated[section][topic]).forEach((subtopic) => {
              updated[section][topic][subtopic] = updated[section][topic][subtopic].filter(
                (n) => n.id !== noteId
              );
              // Clean up empty arrays
              if (updated[section][topic][subtopic].length === 0) {
                delete updated[section][topic][subtopic];
              }
            });
            // Clean up empty topics
            if (Object.keys(updated[section][topic]).length === 0) {
              delete updated[section][topic];
            }
          });
          // Clean up empty sections
          if (Object.keys(updated[section]).length === 0) {
            delete updated[section];
          }
        });
        return updated;
      });
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleToggleStar = async (noteId: string, currentStarred: boolean) => {
    if (!user || !supabase) return;

    const newStarred = !currentStarred;

    // Optimistic update
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, is_starred: newStarred } : n))
    );
    setOrganizedNotes((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((section) => {
        Object.keys(updated[section]).forEach((topic) => {
          Object.keys(updated[section][topic]).forEach((subtopic) => {
            updated[section][topic][subtopic] = updated[section][topic][subtopic].map((n) =>
              n.id === noteId ? { ...n, is_starred: newStarred } : n
            );
          });
        });
      });
      return updated;
    });

    try {
      await supabase
        .from('question_notes')
        .update({ is_starred: newStarred, updated_at: new Date().toISOString() })
        .eq('id', noteId)
        .eq('user_id', user.id);
    } catch (error) {
      console.error('Failed to toggle star:', error);
      // Revert on error
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, is_starred: currentStarred } : n))
      );
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);

    try {
      // Build the content for PDF
      let content = `CPA Exam Study Notes\nExported: ${new Date().toLocaleDateString()}\n\n`;
      content += `Total Notes: ${notes.length}\n`;
      content += `${'='.repeat(50)}\n\n`;

      filteredSections.forEach((section) => {
        content += `\n${'#'.repeat(3)} ${section} - ${sectionNames[section]}\n`;
        content += `${'-'.repeat(40)}\n\n`;

        Object.entries(organizedNotes[section]).forEach(([topic, subtopics]) => {
          Object.entries(subtopics).forEach(([subtopic, subtopicNotes]) => {
            const filtered = filterBySearch(subtopicNotes);
            if (filtered.length === 0) return;

            content += `## ${topic}${subtopic !== 'General' ? ` > ${subtopic}` : ''}\n\n`;

            filtered.forEach((note) => {
              if (note.is_starred) content += `⭐ STARRED\n`;
              if (note.question) {
                content += `Question: "${note.question.question}"\n`;
              }
              content += `Note: ${note.note}\n`;
              if (note.confidence) {
                content += `Confidence: ${confidenceLevels[note.confidence - 1].label}\n`;
              }
              content += `Last Updated: ${new Date(note.updated_at).toLocaleDateString()}\n`;
              content += `\n---\n\n`;
            });
          });
        });
      });

      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cpa-study-notes-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export notes:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Filter notes by section and search
  const filteredSections = Object.keys(organizedNotes).filter(
    (section) => selectedSection === 'all' || section === selectedSection
  );

  // Search and starred filter
  const filterBySearch = (notesArray: NoteWithQuestion[]) => {
    let filtered = notesArray;

    // Filter by starred
    if (showStarredOnly) {
      filtered = filtered.filter((n) => n.is_starred);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.note.toLowerCase().includes(query) ||
          n.question?.question.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Count starred notes
  const starredCount = notes.filter((n) => n.is_starred).length;

  // Count notes per section
  const sectionCounts = Object.entries(organizedNotes).reduce(
    (acc, [section, topics]) => {
      let count = 0;
      Object.values(topics).forEach((subtopics) => {
        Object.values(subtopics).forEach((notes) => {
          count += notes.length;
        });
      });
      acc[section] = count;
      return acc;
    },
    {} as Record<string, number>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Study Notes</h1>
              <p className="text-white/80">
                {notes.length} note{notes.length !== 1 ? 's' : ''} across{' '}
                {Object.keys(organizedNotes).length} section{Object.keys(organizedNotes).length !== 1 ? 's' : ''}
                {starredCount > 0 && ` • ${starredCount} starred`}
              </p>
            </div>
          </div>
          {notes.length > 0 && (
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isExporting ? 'Exporting...' : 'Export'}</span>
            </button>
          )}
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No Notes Yet</h2>
          <p className="text-[var(--muted)] mb-6">
            Start taking notes on practice questions to build your personalized study guide.
          </p>
          <Link
            href="/dashboard/practice"
            className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Start Practicing
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-4">
            <div className="flex flex-col gap-4">
              {/* Top row: Section filter and starred toggle */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Section filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Filter by Section
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSection('all')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedSection === 'all'
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      All ({notes.length})
                    </button>
                    {Object.keys(sectionCounts).map((section) => (
                      <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedSection === section
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {section} ({sectionCounts[section]})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Starred toggle */}
                <div className="flex items-end">
                  <button
                    onClick={() => setShowStarredOnly(!showStarredOnly)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showStarredOnly
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-2 border-yellow-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${showStarredOnly ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                      fill={showStarredOnly ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Starred Only ({starredCount})</span>
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="md:w-64">
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Search Notes
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your notes..."
                  className="w-full px-3 py-2 border border-[var(--border)] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notes organized by section/topic/subtopic */}
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <div
                key={section}
                className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 overflow-hidden"
              >
                {/* Section Header */}
                <div className={`${sectionColors[section]} px-6 py-4 text-white`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold">{section}</span>
                    <span className="text-white/80">|</span>
                    <span className="text-white/80">{sectionNames[section]}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="divide-y divide-[var(--border)] dark:divide-gray-700">
                  {Object.entries(organizedNotes[section]).map(([topic, subtopics]) => {
                    const topicKey = `${section}-${topic}`;
                    const isExpanded = expandedTopics.has(topicKey);

                    // Count notes in this topic
                    let topicNoteCount = 0;
                    Object.values(subtopics).forEach((notes) => {
                      topicNoteCount += filterBySearch(notes).length;
                    });

                    // Skip if no notes match search
                    if (topicNoteCount === 0 && searchQuery) return null;

                    return (
                      <div key={topicKey}>
                        {/* Topic Header */}
                        <button
                          onClick={() => toggleTopic(topicKey)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <svg
                              className={`w-5 h-5 text-[var(--muted)] transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-semibold text-[var(--foreground)]">{topic}</span>
                          </div>
                          <span className="text-sm text-[var(--muted)]">
                            {topicNoteCount} note{topicNoteCount !== 1 ? 's' : ''}
                          </span>
                        </button>

                        {/* Subtopics and Notes */}
                        {isExpanded && (
                          <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 space-y-4">
                            {Object.entries(subtopics).map(([subtopic, subtopicNotes]) => {
                              const filteredNotes = filterBySearch(subtopicNotes);
                              if (filteredNotes.length === 0) return null;

                              return (
                                <div key={subtopic}>
                                  {subtopic !== 'General' && (
                                    <h4 className="text-sm font-medium text-[var(--primary)] mb-2">
                                      {subtopic}
                                    </h4>
                                  )}
                                  <div className="space-y-3">
                                    {filteredNotes.map((note) => (
                                      <div
                                        key={note.id}
                                        className={`bg-white dark:bg-gray-800 rounded-lg border p-4 ${
                                          note.is_starred
                                            ? 'border-yellow-400 dark:border-yellow-600'
                                            : 'border-[var(--border)] dark:border-gray-700'
                                        }`}
                                      >
                                        {/* Header with star and confidence */}
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() => handleToggleStar(note.id, note.is_starred)}
                                              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                              title={note.is_starred ? "Unstar" : "Star"}
                                            >
                                              <svg
                                                className={`w-4 h-4 ${note.is_starred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                                                fill={note.is_starred ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                              </svg>
                                            </button>
                                            {note.confidence && (
                                              <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${confidenceLevels[note.confidence - 1].color}`}>
                                                {confidenceLevels[note.confidence - 1].label}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Question preview */}
                                        {note.question && (
                                          <p className="text-sm text-[var(--muted)] mb-2 line-clamp-2 italic">
                                            &quot;{note.question.question}&quot;
                                          </p>
                                        )}

                                        {/* Note content */}
                                        {editingNoteId === note.id ? (
                                          <div className="space-y-3">
                                            <textarea
                                              value={editingText}
                                              onChange={(e) => setEditingText(e.target.value)}
                                              className="w-full p-3 text-sm border border-[var(--border)] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                                              rows={4}
                                            />
                                            <div className="flex justify-end space-x-2">
                                              <button
                                                onClick={() => {
                                                  setEditingNoteId(null);
                                                  setEditingText("");
                                                }}
                                                className="px-3 py-1.5 text-sm text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                              >
                                                Cancel
                                              </button>
                                              <button
                                                onClick={handleSaveEdit}
                                                disabled={isSaving || !editingText.trim()}
                                                className="px-4 py-1.5 text-sm bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] disabled:opacity-50 transition-colors"
                                              >
                                                {isSaving ? 'Saving...' : 'Save'}
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div>
                                            <p className="text-[var(--foreground)] whitespace-pre-wrap">
                                              {note.note}
                                            </p>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)] dark:border-gray-700">
                                              <span className="text-xs text-[var(--muted)]">
                                                Updated {new Date(note.updated_at).toLocaleDateString()}
                                              </span>
                                              <div className="flex items-center space-x-2">
                                                <button
                                                  onClick={() => handleEditNote(note)}
                                                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                                                >
                                                  Edit
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteNote(note.id)}
                                                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
