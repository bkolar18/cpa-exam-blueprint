'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface UserAnalytics {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    createdAt: string;
    subscriptionTier: string;
    currentStreak: number;
    longestStreak: number;
  };
  summary: {
    totalStudyTimeMinutes: number;
    totalQuestionsPracticed: number;
    overallAccuracy: number;
    strongestSection: string;
    weakestSection: string;
    activityLevel: 'inactive' | 'low' | 'moderate' | 'high';
  };
  mcqStats: {
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
    totalTimeMinutes: number;
    bySection: Record<string, { attempts: number; correct: number; avgTime: number }>;
    recentActivity: { date: string; count: number; correct: number }[];
  };
  tbsStats: {
    totalAttempts: number;
    completedAttempts: number;
    averageScore: number;
    totalTimeMinutes: number;
    bySection: Record<string, { attempts: number; avgScore: number; completed: number }>;
    byType: Record<string, { attempts: number; avgScore: number }>;
  };
  examStats: {
    totalExams: number;
    completedExams: number;
    averageScore: number;
    passingExams: number;
    averageMCQScore: number;
    averageTBSScore: number;
    totalTimeMinutes: number;
    bySection: Record<string, { attempts: number; avgScore: number; passed: number }>;
    recentExams: { date: string; section: string; score: number; passed: boolean }[];
  };
  aiStats: {
    totalUses: number;
    byFeature: Record<string, number>;
  };
  progressSummary: {
    sectionsStarted: number;
    sectionsPassed: number;
    sectionsScheduled: number;
    overallProgress: number;
    sectionDetails: { section: string; status: string; score: number | null; examDate: string | null }[];
  };
  dateRange: { start: string; end: string };
}

export default function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;

  const [data, setData] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    fetchUserAnalytics();
  }, [userId, dateRange]);

  const fetchUserAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/analytics/user/${userId}?range=${dateRange}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch user data');
      }
    } catch (err) {
      setError('Error loading user analytics');
      console.error('Error fetching user analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner className="h-8 w-8 text-[var(--primary)]"/>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error || 'User not found'}</p>
        <Link href="/admin/users" className="text-[var(--primary)] hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  const activityColors = {
    inactive: 'bg-gray-500',
    low: 'bg-yellow-500',
    moderate: 'bg-blue-500',
    high: 'bg-green-500'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-1">
            <Link href="/admin/users" className="hover:text-[var(--primary)]">Users</Link>
            <span>/</span>
            <span>User Details</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
            {data.user.fullName || data.user.email}
          </h1>
          <p className="text-[var(--muted)] mt-1">{data.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            data.user.subscriptionTier === 'premium' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
            data.user.subscriptionTier === 'pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
          }`}>
            {data.user.subscriptionTier}
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--muted)]">Study Time</p>
          <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
            {Math.floor(data.summary.totalStudyTimeMinutes / 60)}h {data.summary.totalStudyTimeMinutes % 60}m
          </p>
        </div>
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--muted)]">Questions Practiced</p>
          <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
            {data.summary.totalQuestionsPracticed.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--muted)]">Overall Accuracy</p>
          <p className={`text-2xl font-bold ${
            data.summary.overallAccuracy >= 75 ? 'text-green-600' :
            data.summary.overallAccuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {data.summary.overallAccuracy}%
          </p>
        </div>
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--muted)]">Activity Level</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-3 h-3 rounded-full ${activityColors[data.summary.activityLevel]}`}></div>
            <p className="text-xl font-bold text-[var(--foreground)] dark:text-white capitalize">
              {data.summary.activityLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Streaks & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">Study Streaks</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[var(--muted)]">Current Streak</span>
              <span className="text-xl font-bold text-orange-500">{data.user.currentStreak} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--muted)]">Longest Streak</span>
              <span className="text-xl font-bold text-[var(--foreground)] dark:text-white">{data.user.longestStreak} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--muted)]">Member Since</span>
              <span className="text-sm text-[var(--foreground)] dark:text-white">
                {new Date(data.user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">Strongest & Weakest</h3>
          <div className="space-y-4">
            {data.summary.strongestSection && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrophyIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Strongest Section</p>
                  <p className="font-medium text-[var(--foreground)] dark:text-white">{data.summary.strongestSection}</p>
                </div>
              </div>
            )}
            {data.summary.weakestSection && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <TargetIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Needs Work</p>
                  <p className="font-medium text-[var(--foreground)] dark:text-white">{data.summary.weakestSection}</p>
                </div>
              </div>
            )}
            {!data.summary.strongestSection && !data.summary.weakestSection && (
              <p className="text-sm text-[var(--muted)] text-center py-4">Not enough data yet</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">CPA Exam Progress</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                <p className="text-lg font-bold text-blue-600">{data.progressSummary.sectionsStarted}</p>
                <p className="text-xs text-[var(--muted)]">Studying</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                <p className="text-lg font-bold text-yellow-600">{data.progressSummary.sectionsScheduled}</p>
                <p className="text-xs text-[var(--muted)]">Scheduled</p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                <p className="text-lg font-bold text-green-600">{data.progressSummary.sectionsPassed}</p>
                <p className="text-xs text-[var(--muted)]">Passed</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--muted)]">Overall Progress</span>
                <span className="font-medium text-[var(--foreground)] dark:text-white">{data.progressSummary.overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[var(--primary)]"
                  style={{ width: `${data.progressSummary.overallProgress}%` }}
                />
              </div>
            </div>
            {data.progressSummary.sectionDetails.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-xs font-medium text-[var(--muted)] mb-2">Section Details</p>
                <div className="space-y-2">
                  {data.progressSummary.sectionDetails.map(s => (
                    <div key={s.section} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--foreground)] dark:text-white">{s.section}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          s.status === 'passed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          s.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          s.status === 'studying' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          s.status === 'failed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {s.status.replace('_', ' ')}
                        </span>
                        {s.score !== null && (
                          <span className={`font-bold ${s.score >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                            {s.score}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.progressSummary.sectionDetails.length === 0 && (
              <p className="text-sm text-[var(--muted)] text-center py-2">No section progress recorded yet</p>
            )}
          </div>
        </div>
      </div>

      {/* MCQ Stats */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">MCQ Performance</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.mcqStats.totalAttempts}</p>
            <p className="text-xs text-[var(--muted)]">Total Questions</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-green-600">{data.mcqStats.correctAnswers}</p>
            <p className="text-xs text-[var(--muted)]">Correct</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className={`text-2xl font-bold ${data.mcqStats.accuracy >= 75 ? 'text-green-600' : data.mcqStats.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {data.mcqStats.accuracy}%
            </p>
            <p className="text-xs text-[var(--muted)]">Accuracy</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.mcqStats.totalTimeMinutes}m</p>
            <p className="text-xs text-[var(--muted)]">Time Spent</p>
          </div>
        </div>

        {Object.keys(data.mcqStats.bySection).length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[var(--muted)] mb-3">By Section</h4>
            <div className="space-y-3">
              {Object.entries(data.mcqStats.bySection).map(([section, stats]) => {
                const accuracy = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
                return (
                  <div key={section}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--foreground)] dark:text-white">{section}</span>
                      <span className="text-[var(--muted)]">{accuracy}% ({stats.correct}/{stats.attempts})</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${accuracy >= 75 ? 'bg-green-500' : accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* TBS Stats */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">TBS Performance</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.tbsStats.totalAttempts}</p>
            <p className="text-xs text-[var(--muted)]">Total Attempts</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-green-600">{data.tbsStats.completedAttempts}</p>
            <p className="text-xs text-[var(--muted)]">Completed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className={`text-2xl font-bold ${data.tbsStats.averageScore >= 75 ? 'text-green-600' : data.tbsStats.averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {data.tbsStats.averageScore}%
            </p>
            <p className="text-xs text-[var(--muted)]">Avg Score</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.tbsStats.totalTimeMinutes}m</p>
            <p className="text-xs text-[var(--muted)]">Time Spent</p>
          </div>
        </div>

        {Object.keys(data.tbsStats.byType).length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[var(--muted)] mb-3">By TBS Type</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(data.tbsStats.byType).map(([type, stats]) => (
                <div key={type} className="p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                  <p className="text-sm font-medium text-[var(--foreground)] dark:text-white capitalize">
                    {type.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{stats.attempts} attempts</p>
                  <p className={`text-sm font-bold ${stats.avgScore >= 75 ? 'text-green-600' : stats.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {stats.avgScore}% avg
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exam Stats */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">Exam Simulations</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.examStats.totalExams}</p>
            <p className="text-xs text-[var(--muted)]">Total Exams</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-green-600">{data.examStats.passingExams}</p>
            <p className="text-xs text-[var(--muted)]">Passed ({data.examStats.completedExams > 0 ? Math.round((data.examStats.passingExams / data.examStats.completedExams) * 100) : 0}%)</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className={`text-2xl font-bold ${data.examStats.averageScore >= 75 ? 'text-green-600' : data.examStats.averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {data.examStats.averageScore}%
            </p>
            <p className="text-xs text-[var(--muted)]">Avg Score</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
            <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{data.examStats.totalTimeMinutes}m</p>
            <p className="text-xs text-[var(--muted)]">Total Time</p>
          </div>
        </div>

        {data.examStats.recentExams.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[var(--muted)] mb-3">Recent Exams</h4>
            <div className="space-y-2">
              {data.examStats.recentExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${exam.passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-[var(--foreground)] dark:text-white">{exam.section}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${exam.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {exam.score}%
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {new Date(exam.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Usage */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <h3 className="font-semibold text-[var(--foreground)] dark:text-white">AI Feature Usage</h3>
        </div>

        {data.aiStats.totalUses > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-2xl font-bold text-purple-600">{data.aiStats.totalUses}</p>
                <p className="text-xs text-[var(--muted)]">Total AI Uses</p>
              </div>
              {Object.entries(data.aiStats.byFeature).map(([feature, count]) => {
                const featureConfig: Record<string, { color: string; label: string }> = {
                  'navigator': { color: 'blue', label: 'Navigator Chats' },
                  'study_guide': { color: 'green', label: 'Study Guides' },
                  'explanation': { color: 'yellow', label: 'Explanations' },
                  'hint': { color: 'orange', label: 'Hints' },
                  'feedback': { color: 'pink', label: 'Feedback' }
                };
                const config = featureConfig[feature] || { color: 'gray', label: feature.replace(/_/g, ' ') };
                return (
                  <div key={feature} className="text-center p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
                    <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">{count}</p>
                    <p className="text-xs text-[var(--muted)] capitalize">{config.label}</p>
                  </div>
                );
              })}
            </div>

            {/* AI Usage Breakdown Bar */}
            {Object.keys(data.aiStats.byFeature).length > 1 && (
              <div>
                <p className="text-xs font-medium text-[var(--muted)] mb-2">Usage Breakdown</p>
                <div className="space-y-2">
                  {Object.entries(data.aiStats.byFeature)
                    .sort(([,a], [,b]) => b - a)
                    .map(([feature, count]) => {
                      const percentage = Math.round((count / data.aiStats.totalUses) * 100);
                      const featureLabels: Record<string, string> = {
                        'navigator': 'Navigator',
                        'study_guide': 'Study Guide',
                        'explanation': 'Explanation',
                        'hint': 'Hint',
                        'feedback': 'Feedback'
                      };
                      return (
                        <div key={feature}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[var(--foreground)] dark:text-white capitalize">
                              {featureLabels[feature] || feature.replace(/_/g, ' ')}
                            </span>
                            <span className="text-[var(--muted)]">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-purple-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <svg className="h-12 w-12 text-[var(--muted)] mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <p className="text-sm text-[var(--muted)]">No AI features used yet</p>
            <p className="text-xs text-[var(--muted)] mt-1">Navigator, Study Guides, and other AI features will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Icons
function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function TrophyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"/>
    </svg>
  );
}

function TargetIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
    </svg>
  );
}
