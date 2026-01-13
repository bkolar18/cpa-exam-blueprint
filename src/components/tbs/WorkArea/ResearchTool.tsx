"use client";

import { useState } from"react";
import { TBSRequirement, CitationResponse, AuthoritativeSource } from"@/lib/data/tbs/types";

interface ResearchToolProps {
 requirements: TBSRequirement[];
 responses: Record<string, CitationResponse>;
 onResponseChange: (requirementId: string, response: CitationResponse) => void;
 isSubmitted: boolean;
 showCorrectAnswer?: boolean; // Show correct answer after submission (default: true for practice mode)
}

// External links to authoritative sources - matches real CPA exam format
// Each source opens directly to that database's search/browse page
const AUTHORITATIVE_SOURCES: Record<AuthoritativeSource, { name: string; url: string }> = {
 FASB: {
 name:"FASB Accounting Standards Codification",
 url:"https://asc.fasb.org",
 },
 AICPA: {
 name:"AICPA Professional Standards",
 url:"https://www.aicpa.org/resources/download/aicpa-professional-standards",
 },
 IRC: {
 name:"Internal Revenue Code",
 url:"https://www.law.cornell.edu/uscode/text/26",
 },
 PCAOB: {
 name:"PCAOB Auditing Standards",
 url:"https://pcaobus.org/oversight/standards",
 },
 SEC: {
 name:"SEC Rules and Regulations",
 url:"https://www.sec.gov/rules-regulations",
 },
 GASB: {
 name:"GASB Standards",
 url:"https://www.gasb.org/standards",
 },
 Treasury: {
 name:"Treasury Circular 230",
 url:"https://www.irs.gov/tax-professionals/circular-230-tax-professionals",
 },
};

export default function ResearchTool({
 requirements,
 responses,
 onResponseChange,
 isSubmitted,
 showCorrectAnswer = true,
}: ResearchToolProps) {
 // Ensure responses is never null to prevent crashes
 const safeResponses = responses || {};

 const [selectedSource, setSelectedSource] = useState<AuthoritativeSource | null>(null);

 const citationRequirements = requirements.filter(r => r.type ==="citation");

 const handleCitationChange = (requirementId: string, value: string, source?: AuthoritativeSource) => {
 onResponseChange(requirementId, {
 type:"citation",
 value,
 source,
 topicCode: value,
 });
 };

 const openSource = (source: AuthoritativeSource) => {
 const sourceInfo = AUTHORITATIVE_SOURCES[source];
 window.open(sourceInfo.url,"_blank","noopener,noreferrer");
 };

 return (
 <div className="h-full flex flex-col">
 {/* Header */}
 <div className="p-4 border-b border-gray-200 bg-gray-50 dark:bg-[var(--background)]">
 <h3 className="text-lg font-semibold text-gray-800 dark:text-[var(--foreground)]">
 Research Tool
 </h3>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)] mt-1">
 Access authoritative literature to find the appropriate citation
 </p>
 </div>

 <div className="flex-1 overflow-auto p-4">
 {/* Authoritative Sources Grid */}
 <div className="mb-6">
 <h4 className="text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] mb-3">
 Authoritative Sources
 </h4>
 <p className="text-xs text-gray-500 dark:text-[var(--muted)] mb-3">
 Click on a source to open it in a new tab. Use the search function within each database to find the relevant guidance.
 </p>
 <div className="grid grid-cols-2 gap-3">
 {(Object.keys(AUTHORITATIVE_SOURCES) as AuthoritativeSource[]).map((source) => {
 const sourceInfo = AUTHORITATIVE_SOURCES[source];
 const isSelected = selectedSource === source;

 return (
 <button
 key={source}
 type="button"
 onClick={() => {
 setSelectedSource(source);
 openSource(source);
 }}
 className={`p-3 border rounded-lg transition-colors text-left hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
 isSelected
 ?"border-blue-500 bg-blue-50 dark:bg-blue-900/20"
 :"border-gray-200"
 }`}
 >
 <div className="flex items-center justify-between mb-1">
 <span className="font-medium text-sm text-gray-800 dark:text-[var(--foreground)]">
 {source}
 </span>
 <svg className="w-4 h-4 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
 </svg>
 </div>
 <p className="text-xs text-gray-500 dark:text-[var(--muted)]">
 {sourceInfo.name}
 </p>
 </button>
 );
 })}
 </div>
 </div>

 {/* Citation Entry Section */}
 <div className="border-t border-gray-200 pt-4">
 <h4 className="text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] mb-3">
 Enter Your Citation{citationRequirements.length > 1 ?"s":""}
 </h4>

 {citationRequirements.map((req) => {
 const response = safeResponses[req.id];
 const correctAnswer = req.correctAnswer as { type:"citation"; source: AuthoritativeSource; topicCode: string };
 const isCorrect = isSubmitted && response?.value === correctAnswer.topicCode;
 const isIncorrect = isSubmitted && response?.value && response.value !== correctAnswer.topicCode;

 return (
 <div key={req.id} className="mb-4">
 <label className="block text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] mb-2">
 {req.label}
 </label>

 <div className="flex gap-2">
 {/* Source Dropdown - Student must select the source themselves */}
 <select
 value={selectedSource ||""}
 onChange={(e) => setSelectedSource(e.target.value as AuthoritativeSource)}
 disabled={isSubmitted}
 className="px-3 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card)] text-gray-900 dark:text-[var(--foreground)] text-sm"
 >
 <option value="">Select Source...</option>
 {(Object.keys(AUTHORITATIVE_SOURCES) as AuthoritativeSource[]).map((source) => (
 <option key={source} value={source}>
 {source}
 </option>
 ))}
 </select>

 {/* Citation Input - Generic placeholder without giving away the source */}
 <input
 type="text"
 value={response?.value ||""}
 onChange={(e) => handleCitationChange(req.id, e.target.value, selectedSource || undefined)}
 disabled={isSubmitted}
 placeholder="Enter citation code..."
 className={`flex-1 px-4 py-2 border rounded-lg text-sm ${
 isSubmitted
 ? isCorrect
 ?"bg-green-50 dark:bg-green-900/20 border-green-500"
 : isIncorrect
 ?"bg-red-50 dark:bg-red-900/20 border-red-500"
 :"bg-gray-100 dark:bg-[var(--card)] border-gray-300"
 :"bg-white dark:bg-[var(--card)] border-gray-300 dark:border-[var(--border)] focus:ring-2 focus:ring-blue-500"
 }`}
 />

 {isSubmitted && isCorrect && (
 <div className="flex items-center px-2">
 <svg className="w-5 h-5 text-green-600"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 )}

 {isSubmitted && isIncorrect && (
 <div className="flex items-center px-2">
 <svg className="w-5 h-5 text-red-600"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </div>
 )}
 </div>

 {/* Show correct answer after submission (only in practice mode) */}
 {isSubmitted && isIncorrect && showCorrectAnswer && (
 <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
 <p className="text-sm text-green-800 dark:text-green-200">
 <span className="font-medium">Correct citation:</span> {correctAnswer.source} {correctAnswer.topicCode}
 </p>
 </div>
 )}

 {/* Explanation */}
 {isSubmitted && req.explanation && (
 <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
 <p className="text-sm text-blue-800 dark:text-blue-200">
 <span className="font-medium">Explanation:</span> {req.explanation}
 </p>
 </div>
 )}
 </div>
 );
 })}
 </div>

 {/* Help Text */}
 <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
 <div className="flex items-start gap-3">
 <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 <div className="text-sm text-amber-800 dark:text-amber-200">
 <p className="font-medium mb-1">How to use the Research Tool:</p>
 <ul className="list-disc list-inside space-y-1 text-xs">
 <li>Click on an authoritative source to open it in a new tab</li>
 <li>Use the search function within that database to find relevant guidance</li>
 <li>Note the citation code for the guidance you find</li>
 <li>Return here and enter your citation in the field above</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
