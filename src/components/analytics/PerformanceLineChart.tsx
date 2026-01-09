'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date: string;
  accuracy: number;
  section?: string;
}

interface PerformanceLineChartProps {
  data: DataPoint[];
  showSections?: boolean;
}

const SECTION_COLORS: Record<string, string> = {
  FAR: '#3b82f6', // blue
  AUD: '#8b5cf6', // purple
  REG: '#f97316', // orange
  TCP: '#22c55e', // green
  BAR: '#ef4444', // red
  ISC: '#06b6d4', // cyan
  Overall: '#6366f1', // indigo
};

export default function PerformanceLineChart({ data, showSections = false }: PerformanceLineChartProps) {
  // Transform data for multi-section view
  const chartData = showSections
    ? aggregateByDateAndSection(data)
    : aggregateByDate(data);

  const sections = showSections
    ? [...new Set(data.map(d => d.section).filter(Boolean))]
    : ['Overall'];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value) => {
              const numValue = typeof value === 'number' ? value : 0;
              return [`${numValue.toFixed(1)}%`, 'Accuracy'];
            }}
          />
          <Legend />
          {sections.map((section) => (
            <Line
              key={section}
              type="monotone"
              dataKey={section || 'accuracy'}
              name={section || 'Accuracy'}
              stroke={SECTION_COLORS[section || 'Overall'] || '#6366f1'}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function aggregateByDate(data: DataPoint[]): { date: string; accuracy: number }[] {
  const grouped: Record<string, { total: number; count: number }> = {};

  for (const point of data) {
    if (!grouped[point.date]) {
      grouped[point.date] = { total: 0, count: 0 };
    }
    grouped[point.date].total += point.accuracy;
    grouped[point.date].count += 1;
  }

  return Object.entries(grouped)
    .map(([date, { total, count }]) => ({
      date,
      accuracy: Math.round(total / count),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function aggregateByDateAndSection(data: DataPoint[]): Record<string, number | string>[] {
  const grouped: Record<string, Record<string, { total: number; count: number }>> = {};

  for (const point of data) {
    if (!point.section) continue;

    if (!grouped[point.date]) {
      grouped[point.date] = {};
    }
    if (!grouped[point.date][point.section]) {
      grouped[point.date][point.section] = { total: 0, count: 0 };
    }
    grouped[point.date][point.section].total += point.accuracy;
    grouped[point.date][point.section].count += 1;
  }

  return Object.entries(grouped)
    .map(([date, sections]) => {
      const result: Record<string, number | string> = { date };
      for (const [section, { total, count }] of Object.entries(sections)) {
        result[section] = Math.round(total / count);
      }
      return result;
    })
    .sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
}
