'use client';

import { useState, useEffect } from 'react';

interface QuestionStats {
  question_id: string;
  section: string;
  topic: string;
  times_shown: number;
  times_correct: number;
  accuracy_rate: number;
  avg_time_seconds: number;
  feedback_count: number;
}

export default function QuestionAnalyticsPage() {
  const [questions, setQuestions] = useState<QuestionStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState('all');
  const [filterAccuracy, setFilterAccuracy] = useState('all');
  const [sortBy, setSortBy] = useState('times_shown');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [filterSection, filterAccuracy, sortBy, sortOrder]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterSection !== 'all') params.set('section', filterSection);
      if (filterAccuracy !== 'all') params.set('accuracy', filterAccuracy);
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);

      const response = await fetch(`/api/admin/questions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.question_id?.toLowerCase().includes(query) ||
      q.topic?.toLowerCase().includes(query)
    );
  });

  const exportToCSV = () => {
    const headers = ['Question ID', 'Section', 'Topic', 'Times Shown', 'Times Correct', 'Accuracy %', 'Avg Time (s)', 'Feedback Count'];
    const rows = filteredQuestions.map(q => [
      q.question_id,
      q.section,
      q.topic || '',
      q.times_shown,
      q.times_correct,
      Math.round(q.accuracy_rate * 100),
      Math.round(q.avg_time_seconds || 0),
      q.feedback_count,
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `question-analytics-${new Date().toISOString().split('T')[0]}.csv`;
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

  // Calculate summary stats
  const totalQuestions = filteredQuestions.length;
  const tooHardQuestions = filteredQuestions.filter(q => q.accuracy_rate < 0.5 && q.times_shown >= 10).length;
  const tooEasyQuestions = filteredQuestions.filter(q => q.accuracy_rate > 0.95 && q.times_shown >= 10).length;
  const flaggedQuestions = filteredQuestions.filter(q => q.feedback_count > 0).length;

  const sections = ['FAR', 'AUD', 'REG', 'TCP'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
            Question Analytics
          </h1>
          <p className="text-[var(--muted)] dark:text-gray-400 mt-1">
            Performance statistics for practice questions
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
        >
          <DownloadIcon className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{totalQuestions}</div>
          <div className="text-sm text-[var(--muted)] dark:text-gray-400">Questions with Data</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 p-4">
          <div className="text-2xl font-bold text-red-600">{tooHardQuestions}</div>
          <div className="text-sm text-[var(--muted)] dark:text-gray-400">Too Hard (&lt;50%)</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4">
          <div className="text-2xl font-bold text-yellow-600">{tooEasyQuestions}</div>
          <div className="text-sm text-[var(--muted)] dark:text-gray-400">Too Easy (&gt;95%)</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-orange-200 dark:border-orange-800 p-4">
          <div className="text-2xl font-bold text-orange-600">{flaggedQuestions}</div>
          <div className="text-sm text-[var(--muted)] dark:text-gray-400">Has Feedback</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by question ID or topic..."
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] dark:text-white placeholder:text-[var(--muted)] dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
              Section
            </label>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] dark:text-white"
            >
              <option value="all">All Sections</option>
              {sections.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
              Accuracy
            </label>
            <select
              value={filterAccuracy}
              onChange={(e) => setFilterAccuracy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] dark:text-white"
            >
              <option value="all">All Accuracy</option>
              <option value="low">Low (&lt;50%)</option>
              <option value="medium">Medium (50-75%)</option>
              <option value="high">High (75-95%)</option>
              <option value="very_high">Very High (&gt;95%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <LoadingSpinner className="h-8 w-8 mx-auto text-[var(--primary)]" />
            <p className="mt-2 text-[var(--muted)] dark:text-gray-400">Loading questions...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="p-8 text-center">
            <QuestionIcon className="h-12 w-12 mx-auto text-[var(--muted)] dark:text-gray-600 mb-4" />
            <p className="text-[var(--muted)] dark:text-gray-400">No question data found</p>
            <p className="text-sm text-[var(--muted)] dark:text-gray-500 mt-1">
              Question stats are collected as users answer questions
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th
                    onClick={() => handleSort('question_id')}
                    className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
                  >
                    Question {sortBy === 'question_id' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider">
                    Section
                  </th>
                  <th
                    onClick={() => handleSort('times_shown')}
                    className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
                  >
                    Shown {sortBy === 'times_shown' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('accuracy_rate')}
                    className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
                  >
                    Accuracy {sortBy === 'accuracy_rate' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('avg_time_seconds')}
                    className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
                  >
                    Avg Time {sortBy === 'avg_time_seconds' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('feedback_count')}
                    className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] dark:hover:text-white"
                  >
                    Feedback {sortBy === 'feedback_count' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] dark:divide-gray-700">
                {filteredQuestions.map((question) => {
                  const accuracy = Math.round(question.accuracy_rate * 100);
                  const isTooHard = accuracy < 50 && question.times_shown >= 10;
                  const isTooEasy = accuracy > 95 && question.times_shown >= 10;
                  const hasFeedback = question.feedback_count > 0;

                  return (
                    <tr
                      key={question.question_id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        isTooHard || isTooEasy || hasFeedback ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)] dark:text-white font-mono text-sm">
                          {question.question_id}
                        </div>
                        {question.topic && (
                          <div className="text-xs text-[var(--muted)] dark:text-gray-400 truncate max-w-[200px]">
                            {question.topic}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)] dark:text-white">
                        {question.section}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)] dark:text-white">
                        {question.times_shown}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            accuracy >= 75 ? 'text-green-600' :
                            accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {accuracy}%
                          </span>
                          <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                accuracy >= 75 ? 'bg-green-500' :
                                accuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${accuracy}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)] dark:text-white">
                        {Math.round(question.avg_time_seconds || 0)}s
                      </td>
                      <td className="px-4 py-3">
                        {question.feedback_count > 0 ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                            {question.feedback_count}
                          </span>
                        ) : (
                          <span className="text-sm text-[var(--muted)] dark:text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {isTooHard && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                              Hard
                            </span>
                          )}
                          {isTooEasy && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                              Easy
                            </span>
                          )}
                          {hasFeedback && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                              Review
                            </span>
                          )}
                          {!isTooHard && !isTooEasy && !hasFeedback && (
                            <span className="text-sm text-green-600">✓</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Icons
function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function QuestionIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  );
}

function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
