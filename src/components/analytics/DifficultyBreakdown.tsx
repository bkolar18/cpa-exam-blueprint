'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface DifficultyData {
  difficulty: 'easy' | 'medium' | 'hard';
  total: number;
  correct: number;
}

interface DifficultyBreakdownProps {
  data: DifficultyData[];
}

const COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
};

const LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export default function DifficultyBreakdown({ data }: DifficultyBreakdownProps) {
  const pieData = data.map(d => ({
    name: LABELS[d.difficulty],
    value: d.total,
    accuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
    color: COLORS[d.difficulty],
  }));

  const totalQuestions = data.reduce((sum, d) => sum + d.total, 0);

  if (totalQuestions === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value, name, props) => {
                const numValue = typeof value === 'number' ? value : 0;
                const accuracy = props?.payload?.accuracy ?? 0;
                return [`${numValue} questions (${accuracy}% accuracy)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="w-full md:w-1/2 space-y-4">
        {data.map(d => {
          const accuracy = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
          const percentage = totalQuestions > 0 ? Math.round((d.total / totalQuestions) * 100) : 0;

          return (
            <div key={d.difficulty} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[d.difficulty] }}
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {LABELS[d.difficulty]}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {d.total} questions ({percentage}%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${accuracy}%`,
                      backgroundColor: COLORS[d.difficulty],
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                  {accuracy}%
                </span>
              </div>
            </div>
          );
        })}

        {/* Insight */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getInsight(data)}
          </p>
        </div>
      </div>
    </div>
  );
}

function getInsight(data: DifficultyData[]): string {
  const easy = data.find(d => d.difficulty === 'easy');
  const medium = data.find(d => d.difficulty === 'medium');
  const hard = data.find(d => d.difficulty === 'hard');

  const easyAcc = easy && easy.total > 0 ? (easy.correct / easy.total) * 100 : 0;
  const mediumAcc = medium && medium.total > 0 ? (medium.correct / medium.total) * 100 : 0;
  const hardAcc = hard && hard.total > 0 ? (hard.correct / hard.total) * 100 : 0;

  if (easyAcc < 70) {
    return "Focus on fundamentals - your easy question accuracy needs improvement.";
  }
  if (mediumAcc < 60) {
    return "Good foundation! Now work on medium difficulty questions to build competency.";
  }
  if (hardAcc < 50 && hard && hard.total >= 10) {
    return "Strong performance on easier questions. Keep practicing hard questions to reach mastery.";
  }
  if (hardAcc >= 70) {
    return "Excellent work! You're performing well across all difficulty levels.";
  }
  return "Keep practicing to improve accuracy across all difficulty levels.";
}
