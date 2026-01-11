"use client";

import { TBSExhibit } from"@/lib/data/tbs/types";

interface ExhibitTabsProps {
 exhibits: TBSExhibit[];
 currentExhibitId: string;
 onExhibitChange: (exhibitId: string) => void;
}

function getExhibitIcon(type: string) {
 switch (type) {
 case"memo":
 case"email":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
 </svg>
 );
 case"financial_statement":
 case"ledger":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 );
 case"table":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
 </svg>
 );
 case"invoice":
 case"contract":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 );
 case"bank_statement":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
 </svg>
 );
 case"tax_form":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
 </svg>
 );
 case"image":
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
 </svg>
 );
 default:
 return (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
 </svg>
 );
 }
}

export default function ExhibitTabs({
 exhibits,
 currentExhibitId,
 onExhibitChange,
}: ExhibitTabsProps) {
 return (
 <div className="bg-gray-100 dark:bg-[var(--background)] border-b border-gray-200 flex-shrink-0">
 <div className="flex overflow-x-auto">
 {exhibits.map((exhibit) => {
 const isActive = exhibit.id === currentExhibitId;

 return (
 <button
 key={exhibit.id}
 onClick={() => onExhibitChange(exhibit.id)}
 className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
 isActive
 ?"bg-white dark:bg-[var(--card)] text-[var(--primary)] border-[var(--primary)]"
 :"text-gray-600 dark:text-[var(--muted)] border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
 }`}
 >
 <span className={isActive ?"text-[var(--primary)]":"text-gray-500 dark:text-[var(--muted)]"}>
 {getExhibitIcon(exhibit.type)}
 </span>
 <span>{exhibit.title}</span>
 </button>
 );
 })}
 </div>
 </div>
 );
}
