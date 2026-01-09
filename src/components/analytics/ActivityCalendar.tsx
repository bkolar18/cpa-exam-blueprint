'use client';

interface ActivityData {
  date: string;
  minutes: number;
}

interface ActivityCalendarProps {
  data: ActivityData[];
  year?: number;
}

function getIntensityClass(minutes: number): string {
  if (minutes === 0) return 'bg-gray-100 dark:bg-gray-800';
  if (minutes < 30) return 'bg-green-200 dark:bg-green-900';
  if (minutes < 60) return 'bg-green-400 dark:bg-green-700';
  if (minutes < 120) return 'bg-green-500 dark:bg-green-600';
  return 'bg-green-600 dark:bg-green-500';
}

function getDayOfWeek(date: Date): number {
  return date.getDay();
}

function getWeekNumber(date: Date, startDate: Date): number {
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

export default function ActivityCalendar({ data, year = new Date().getFullYear() }: ActivityCalendarProps) {
  // Create a map of date -> minutes
  const activityMap: Record<string, number> = {};
  for (const item of data) {
    activityMap[item.date] = item.minutes;
  }

  // Generate all dates for the past 52 weeks
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // 52 weeks ago
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday

  const weeks: { date: Date; minutes: number }[][] = [];
  let currentWeek: { date: Date; minutes: number }[] = [];

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = getDayOfWeek(d);

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push({
      date: new Date(d),
      minutes: activityMap[dateStr] || 0,
    });
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Calculate stats
  const totalDays = data.filter(d => d.minutes > 0).length;
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const currentStreak = calculateStreak(data);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalDays}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Active Days</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.round(totalMinutes / 60)}h
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Study Time</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{currentStreak}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current Streak</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Day labels */}
          <div className="flex mb-1">
            <div className="w-8" /> {/* Spacer for month labels */}
            {days.map((day, i) => (
              <div
                key={day}
                className={`w-3 h-3 text-[10px] text-gray-400 ${i % 2 === 1 ? 'block' : 'invisible'}`}
              >
                {day.charAt(0)}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="flex">
            <div className="w-8" /> {/* Spacer */}
            <div className="flex gap-[2px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={day.date.toISOString()}
                      className={`w-3 h-3 rounded-sm ${getIntensityClass(day.minutes)} hover:ring-1 hover:ring-gray-400 cursor-default`}
                      title={`${day.date.toLocaleDateString()}: ${day.minutes} minutes`}
                    />
                  ))}
                  {/* Fill empty days at end of last week */}
                  {weekIndex === weeks.length - 1 && week.length < 7 && (
                    Array(7 - week.length).fill(null).map((_, i) => (
                      <div key={`empty-${i}`} className="w-3 h-3" />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
        <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
        <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
        <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600" />
        <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
        <span>More</span>
      </div>
    </div>
  );
}

function calculateStreak(data: ActivityData[]): number {
  const sortedData = [...data]
    .filter(d => d.minutes > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedData.length === 0) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Check if the most recent activity was today or yesterday
  const mostRecent = sortedData[0].date;
  if (mostRecent !== today && mostRecent !== yesterday) return 0;

  let streak = 1;
  let currentDate = new Date(sortedData[0].date);

  for (let i = 1; i < sortedData.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = prevDate.toISOString().split('T')[0];

    if (sortedData[i].date === prevDateStr) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}
