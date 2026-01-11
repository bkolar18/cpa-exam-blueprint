"use client";

import { TBSExhibit, ExhibitContent } from"@/lib/data/tbs/types";
import MemoExhibit from"./MemoExhibit";
import TableExhibit from"./TableExhibit";
import FinancialExhibit from"./FinancialExhibit";
import TextExhibit from"./TextExhibit";

interface ExhibitViewerProps {
 exhibit: TBSExhibit;
}

export default function ExhibitViewer({ exhibit }: ExhibitViewerProps) {
 const content = exhibit.content as ExhibitContent;

 // Render based on content type
 switch (content.type) {
 case"memo":
 case"email":
 return <MemoExhibit content={content} />;

 case"table":
 return <TableExhibit content={content} />;

 case"financial_statement":
 return <FinancialExhibit content={content} />;

 case"text":
 return <TextExhibit content={content} />;

 default:
 // Fallback for unknown types
 return (
 <div className="p-4">
 <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
 <p className="text-yellow-700 dark:text-yellow-300">
 Exhibit type &quot;{exhibit.type}&quot; is not yet supported.
 </p>
 <pre className="mt-2 text-xs overflow-auto bg-white dark:bg-[var(--card)] p-2 rounded">
 {JSON.stringify(content, null, 2)}
 </pre>
 </div>
 </div>
 );
 }
}
