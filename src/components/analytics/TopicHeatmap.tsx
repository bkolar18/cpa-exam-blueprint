'use client';

interface TopicData {
 topic: string;
 section: string;
 accuracy: number;
 attempted: number;
}

interface TopicHeatmapProps {
 data: TopicData[];
 onTopicClick?: (topic: string, section: string) => void;
}

function getHeatmapColor(accuracy: number, attempted: number): string {
 if (attempted === 0) return 'bg-gray-100 dark:bg-[var(--card)]';
 if (accuracy >= 80) return 'bg-green-500';
 if (accuracy >= 70) return 'bg-green-400';
 if (accuracy >= 60) return 'bg-yellow-400';
 if (accuracy >= 50) return 'bg-orange-400';
 if (accuracy >= 40) return 'bg-orange-500';
 return 'bg-red-500';
}

function getTextColor(accuracy: number, attempted: number): string {
 if (attempted === 0) return 'text-gray-400 dark:text-gray-600';
 if (accuracy >= 60) return 'text-white';
 return 'text-white';
}

export default function TopicHeatmap({ data, onTopicClick }: TopicHeatmapProps) {
 // Group by section
 const sections = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'];
 const topicsBySection: Record<string, TopicData[]> = {};

 for (const section of sections) {
 topicsBySection[section] = data.filter(d => d.section === section);
 }

 return (
 <div className="space-y-6">
 {sections.map(section => {
 const topics = topicsBySection[section] || [];
 if (topics.length === 0) return null;

 return (
 <div key={section}>
 <h4 className="text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)] mb-2">
 {section}
 </h4>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
 {topics.map(topic => (
 <button
 key={`${section}-${topic.topic}`}
 onClick={() => onTopicClick?.(topic.topic, section)}
 className={`p-3 rounded-lg transition-all hover:scale-105 ${getHeatmapColor(topic.accuracy, topic.attempted)} ${
 onTopicClick ? 'cursor-pointer' : 'cursor-default'
 }`}
 >
 <p className={`text-xs font-medium truncate ${getTextColor(topic.accuracy, topic.attempted)}`}>
 {topic.topic}
 </p>
 <p className={`text-lg font-bold ${getTextColor(topic.accuracy, topic.attempted)}`}>
 {topic.attempted > 0 ? `${topic.accuracy}%` : '--'}
 </p>
 <p className={`text-xs ${getTextColor(topic.accuracy, topic.attempted)} opacity-80`}>
 {topic.attempted} questions
 </p>
 </button>
 ))}
 </div>
 </div>
 );
 })}

 {/* Legend */}
 <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-red-500"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">&lt;50%</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-orange-400"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">50-60%</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-yellow-400"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">60-70%</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-green-400"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">70-80%</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-green-500"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">80%+</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-4 h-4 rounded bg-gray-200 dark:bg-[var(--card-hover)]"/>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">Not started</span>
 </div>
 </div>
 </div>
 );
}
