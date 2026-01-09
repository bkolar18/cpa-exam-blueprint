"use client";

import { useEffect, useRef } from "react";
import { TBSQuestion, UserResponse, NumericResponse, DropdownResponse, TextResponse, CitationResponse } from "@/lib/data/tbs/types";
import NumericEntryGrid from "./NumericEntryGrid";
import JournalEntryForm from "./JournalEntryForm";
import DropdownSelect from "./DropdownSelect";
import ResearchTool from "./ResearchTool";
import WrittenCommunicationEditor from "./WrittenCommunicationEditor";
import ReconciliationForm from "./ReconciliationForm";

interface WorkAreaProps {
  tbs: TBSQuestion;
  responses: Record<string, UserResponse>;
  onResponseChange: (requirementId: string, response: UserResponse) => void;
  isSubmitted: boolean;
  showHints?: boolean;
  focusRequirementId?: string | null;
}

export default function WorkArea({
  tbs,
  responses,
  onResponseChange,
  isSubmitted,
  showHints = false,
  focusRequirementId,
}: WorkAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to focused requirement when jumping from review screen
  useEffect(() => {
    if (focusRequirementId && containerRef.current) {
      const element = containerRef.current.querySelector(
        `[data-requirement-id="${focusRequirementId}"]`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add a brief highlight effect
        element.classList.add("ring-2", "ring-blue-500", "ring-offset-2");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
        }, 2000);
      }
    }
  }, [focusRequirementId]);
  // Group requirements by type for rendering
  const numericRequirements = tbs.requirements.filter(
    (r) => r.type === "numeric"
  );
  const journalRequirements = tbs.requirements.filter(
    (r) => r.type === "journal_debit" || r.type === "journal_credit"
  );
  const dropdownRequirements = tbs.requirements.filter(
    (r) => r.type === "dropdown"
  );
  const textRequirements = tbs.requirements.filter(
    (r) => r.type === "text" || r.type === "citation"
  );

  // Determine primary work area type based on TBS type
  const renderWorkArea = () => {
    // Ensure responses is never null to prevent crashes
    const safeResponses = responses || {};

    switch (tbs.tbsType) {
      case "journal_entry":
        return (
          <JournalEntryForm
            requirements={journalRequirements}
            accounts={tbs.journalAccounts || []}
            responses={safeResponses}
            onResponseChange={onResponseChange}
            isSubmitted={isSubmitted}
            showHints={showHints}
          />
        );

      case "numeric_entry":
        return (
          <NumericEntryGrid
            requirements={numericRequirements}
            responses={safeResponses}
            onResponseChange={onResponseChange}
            isSubmitted={isSubmitted}
            showHints={showHints}
          />
        );

      case "reconciliation":
        // Check if TBS has a reconciliation template in metadata
        // For now, use a default bank reconciliation template structure
        // In a full implementation, the template would come from the TBS data
        const reconciliationTemplate = {
          type: "bank" as const,
          title: "Bank Reconciliation",
          bankSide: {
            title: "Bank Statement Balance",
            startingBalanceLabel: "Balance per Bank Statement",
            startingBalanceValue: undefined, // Would come from exhibit data
            additionItems: numericRequirements
              .filter(r => r.label?.toLowerCase().includes("deposit") || r.label?.toLowerCase().includes("transit"))
              .map(r => ({
                id: r.id,
                label: r.label,
                requirementId: r.id,
                isEditable: true,
              })),
            deductionItems: numericRequirements
              .filter(r => r.label?.toLowerCase().includes("outstanding") || r.label?.toLowerCase().includes("check"))
              .map(r => ({
                id: r.id,
                label: r.label,
                requirementId: r.id,
                isEditable: true,
              })),
            adjustedBalanceLabel: "Adjusted Bank Balance",
          },
          bookSide: {
            title: "Book Balance",
            startingBalanceLabel: "Balance per Books",
            startingBalanceValue: undefined,
            additionItems: numericRequirements
              .filter(r => r.label?.toLowerCase().includes("collection") || r.label?.toLowerCase().includes("interest"))
              .map(r => ({
                id: r.id,
                label: r.label,
                requirementId: r.id,
                isEditable: true,
              })),
            deductionItems: numericRequirements
              .filter(r => r.label?.toLowerCase().includes("nsf") || r.label?.toLowerCase().includes("service") || r.label?.toLowerCase().includes("charge"))
              .map(r => ({
                id: r.id,
                label: r.label,
                requirementId: r.id,
                isEditable: true,
              })),
            adjustedBalanceLabel: "Adjusted Book Balance",
          },
        };

        // If we have a proper reconciliation structure, use the form; otherwise fall back to numeric grid
        const hasReconciliationStructure =
          reconciliationTemplate.bankSide.additionItems.length > 0 ||
          reconciliationTemplate.bankSide.deductionItems.length > 0 ||
          reconciliationTemplate.bookSide.additionItems.length > 0 ||
          reconciliationTemplate.bookSide.deductionItems.length > 0;

        if (hasReconciliationStructure) {
          const numericResponses: Record<string, NumericResponse> = {};
          numericRequirements.forEach(req => {
            if (safeResponses[req.id]) {
              numericResponses[req.id] = safeResponses[req.id] as NumericResponse;
            }
          });

          return (
            <ReconciliationForm
              template={reconciliationTemplate}
              requirements={numericRequirements}
              responses={numericResponses}
              onResponseChange={(reqId, response) => onResponseChange(reqId, response)}
              isSubmitted={isSubmitted}
            />
          );
        }

        // Fall back to numeric grid if no reconciliation structure detected
        return (
          <NumericEntryGrid
            requirements={numericRequirements}
            responses={safeResponses}
            onResponseChange={onResponseChange}
            isSubmitted={isSubmitted}
            showHints={showHints}
          />
        );

      case "document_review":
        // Document review uses dropdown selections
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Document Review
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Review the document and select the appropriate responses
              </p>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {dropdownRequirements.length > 0 ? (
                <div className="space-y-2">
                  {dropdownRequirements.map((req) => (
                    <DropdownSelect
                      key={req.id}
                      requirement={req}
                      response={safeResponses[req.id] as DropdownResponse | null}
                      onResponseChange={(response) => onResponseChange(req.id, response)}
                      isSubmitted={isSubmitted}
                      showCorrectAnswer={true}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Review the document and make your selections in the highlighted areas.
                </p>
              )}
            </div>
          </div>
        );

      case "written_communication":
        // Use the enhanced written communication editor
        const writtenReq = textRequirements.find(r => r.type === "text");
        if (!writtenReq) {
          return (
            <div className="p-4">
              <p className="text-gray-500">No written communication requirement found.</p>
            </div>
          );
        }
        return (
          <WrittenCommunicationEditor
            requirement={writtenReq}
            response={safeResponses[writtenReq.id] as TextResponse | null}
            onResponseChange={(response) => onResponseChange(writtenReq.id, response)}
            isSubmitted={isSubmitted}
          />
        );

      case "research":
        // Use the enhanced research tool with external links
        const citationResponses: Record<string, CitationResponse> = {};
        textRequirements.filter(r => r.type === "citation").forEach(req => {
          if (safeResponses[req.id]) {
            citationResponses[req.id] = safeResponses[req.id] as CitationResponse;
          }
        });

        return (
          <ResearchTool
            requirements={tbs.requirements}
            responses={citationResponses}
            onResponseChange={(reqId, response) => onResponseChange(reqId, response)}
            isSubmitted={isSubmitted}
          />
        );

      default:
        // Generic work area for unhandled types
        return (
          <div className="p-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-700 dark:text-yellow-300">
                Work area for TBS type &quot;{tbs.tbsType}&quot; is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      {/* Work Area Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Work Area
        </h2>
      </div>

      {/* Work Area Content */}
      <div className="flex-1 overflow-auto">
        {renderWorkArea()}
      </div>
    </div>
  );
}
