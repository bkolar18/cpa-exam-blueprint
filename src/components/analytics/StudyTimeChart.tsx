'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TimeData {
  week: string;
  FAR?: number;
  AUD?: number;
  REG?: number;
  TCP?: number;
  BAR?: number;
  ISC?: number;
  total: number;
}

interface StudyTimeChartProps {
  data: TimeData[];
  goalHours?: number;
}

const SECTION_COLORS: Record<string, string> = {
  FAR: '#3b82f6',
  AUD: '#8b5cf6',
  REG: '#f97316',
  TCP: '#22c55e',
  BAR: '#ef4444',
  ISC: '#06b6d4',
};

export default function StudyTimeChart({ data, goalHours }: StudyTimeChartProps) {
  const sections = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'];
  const activeSections = sections.filter(section =>
    data.some(d => (d[section as keyof TimeData] as number) > 0)
  );

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value, name) => {
              const numValue = typeof value === 'number' ? value : 0;
              return [`${numValue.toFixed(1)}h`, name];
            }}
          />
          <Legend />
          {activeSections.map((section) => (
            <Bar
              key={section}
              dataKey={section}
              stackId="sections"
              fill={SECTION_COLORS[section]}
              name={section}
            />
          ))}
          {goalHours && (
            <Bar
              dataKey={() => 0}
              fill="transparent"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name={`Goal: ${goalHours}h`}
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {goalHours && (
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t-2 border-dashed border-red-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Weekly goal: {goalHours}h
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
