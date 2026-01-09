"use client";

import { useCallback, useMemo } from "react";
import { TBSRequirement, NumericResponse, ReconciliationTemplate } from "@/lib/data/tbs/types";

interface ReconciliationFormProps {
  template: ReconciliationTemplate;
  requirements: TBSRequirement[];
  responses: Record<string, NumericResponse>;
  onResponseChange: (requirementId: string, response: NumericResponse) => void;
  isSubmitted: boolean;
}

interface ReconciliationSectionProps {
  title: string;
  startingLabel: string;
  startingValue: number | undefined;
  startingRequirementId?: string;
  additions: Array<{
    id: string;
    label: string;
    requirementId?: string;
    value?: number;
    isEditable: boolean;
  }>;
  deductions: Array<{
    id: string;
    label: string;
    requirementId?: string;
    value?: number;
    isEditable: boolean;
  }>;
  adjustedLabel: string;
  responses: Record<string, NumericResponse>;
  onResponseChange: (requirementId: string, response: NumericResponse) => void;
  requirements: TBSRequirement[];
  isSubmitted: boolean;
}

function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function parseCurrency(value: string): number | null {
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

function ReconciliationSection({
  title,
  startingLabel,
  startingValue,
  startingRequirementId,
  additions,
  deductions,
  adjustedLabel,
  responses,
  onResponseChange,
  requirements,
  isSubmitted,
}: ReconciliationSectionProps) {
  // Ensure responses is never null to prevent crashes
  const safeResponses = responses || {};

  // Calculate totals
  const getItemValue = (item: { requirementId?: string; value?: number }) => {
    if (item.requirementId) {
      return safeResponses[item.requirementId]?.value ?? null;
    }
    return item.value ?? null;
  };

  const startingAmount = startingRequirementId
    ? safeResponses[startingRequirementId]?.value ?? startingValue ?? 0
    : startingValue ?? 0;

  const additionsTotal = additions.reduce((sum, item) => {
    const val = getItemValue(item);
    return sum + (val ?? 0);
  }, 0);

  const deductionsTotal = deductions.reduce((sum, item) => {
    const val = getItemValue(item);
    return sum + (val ?? 0);
  }, 0);

  const adjustedBalance = startingAmount + additionsTotal - deductionsTotal;

  const renderInputRow = (
    item: { id: string; label: string; requirementId?: string; value?: number; isEditable: boolean },
    isDeduction: boolean = false
  ) => {
    const requirement = item.requirementId
      ? requirements.find(r => r.id === item.requirementId)
      : null;
    const response = item.requirementId ? safeResponses[item.requirementId] : null;
    const displayValue = item.isEditable ? response?.value : item.value;

    // Check correctness
    let isCorrect = false;
    let isIncorrect = false;
    if (isSubmitted && requirement && response?.value !== null && response?.value !== undefined) {
      const correctAnswer = requirement.correctAnswer as { type: "numeric"; value: number; tolerance?: number };
      const tolerance = correctAnswer.tolerance ?? 0;
      isCorrect = Math.abs((response.value ?? 0) - correctAnswer.value) <= tolerance;
      isIncorrect = !isCorrect;
    }

    return (
      <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
        <span className="text-sm text-gray-700 dark:text-gray-300 pl-4">
          {isDeduction && "("}
          {item.label}
          {isDeduction && ")"}
        </span>
        <div className="flex items-center gap-2">
          {item.isEditable ? (
            <input
              type="text"
              value={response?.formattedValue ?? (displayValue !== null && displayValue !== undefined ? formatCurrency(displayValue) : "")}
              onChange={(e) => {
                if (!item.requirementId) return;
                const parsed = parseCurrency(e.target.value);
                onResponseChange(item.requirementId, {
                  type: "numeric",
                  value: parsed,
                  formattedValue: e.target.value,
                });
              }}
              onBlur={(e) => {
                if (!item.requirementId) return;
                const parsed = parseCurrency(e.target.value);
                onResponseChange(item.requirementId, {
                  type: "numeric",
                  value: parsed,
                  formattedValue: parsed !== null ? formatCurrency(parsed) : "",
                });
              }}
              disabled={isSubmitted}
              className={`w-32 px-3 py-1.5 text-right border rounded text-sm ${
                isSubmitted
                  ? isCorrect
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                    : isIncorrect
                    ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-300"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              }`}
              placeholder="$0.00"
            />
          ) : (
            <span className="w-32 text-right text-sm text-gray-600 dark:text-gray-400">
              {displayValue !== null && displayValue !== undefined ? formatCurrency(displayValue) : "-"}
            </span>
          )}
          {isSubmitted && isCorrect && (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isSubmitted && isIncorrect && (
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="px-4 py-3 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
      </div>

      <div className="p-4">
        {/* Starting Balance */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{startingLabel}</span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {formatCurrency(startingAmount)}
          </span>
        </div>

        {/* Additions */}
        {additions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">
              Add:
            </p>
            {additions.map((item) => renderInputRow(item, false))}
          </div>
        )}

        {/* Deductions */}
        {deductions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Less:
            </p>
            {deductions.map((item) => renderInputRow(item, true))}
          </div>
        )}

        {/* Adjusted Balance */}
        <div className="flex items-center justify-between py-3 mt-3 border-t-2 border-gray-300 dark:border-gray-600">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{adjustedLabel}</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {formatCurrency(adjustedBalance)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ReconciliationForm({
  template,
  requirements,
  responses,
  onResponseChange,
  isSubmitted,
}: ReconciliationFormProps) {
  // Ensure responses is never null to prevent crashes
  const safeResponses = responses || {};

  // Calculate if bank and book sides balance using useMemo to avoid useEffect setState
  const calculateBalance = useCallback((side: typeof template.bankSide) => {
    const startingAmount = side.startingBalanceValue ?? 0;

    const additionsTotal = side.additionItems.reduce((sum, item) => {
      if (item.requirementId) {
        return sum + (safeResponses[item.requirementId]?.value ?? 0);
      }
      return sum + (item.value ?? 0);
    }, 0);

    const deductionsTotal = side.deductionItems.reduce((sum, item) => {
      if (item.requirementId) {
        return sum + (safeResponses[item.requirementId]?.value ?? 0);
      }
      return sum + (item.value ?? 0);
    }, 0);

    return startingAmount + additionsTotal - deductionsTotal;
  }, [responses, template]);

  // Use useMemo instead of useEffect + useState
  const balancesMatch = useMemo(() => {
    const bankBalance = calculateBalance(template.bankSide);
    const bookBalance = calculateBalance(template.bookSide);
    return Math.abs(bankBalance - bookBalance) < 0.01;
  }, [template, calculateBalance]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {template.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Complete the reconciliation by entering the appropriate amounts
        </p>
      </div>

      {/* Balance Status */}
      <div className={`px-4 py-2 flex items-center gap-2 ${
        balancesMatch
          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
          : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
      }`}>
        {balancesMatch ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Balances match!</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium">Balances do not match yet</span>
          </>
        )}
      </div>

      {/* Reconciliation Sections */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Side */}
          <ReconciliationSection
            title={template.bankSide.title}
            startingLabel={template.bankSide.startingBalanceLabel}
            startingValue={template.bankSide.startingBalanceValue}
            additions={template.bankSide.additionItems}
            deductions={template.bankSide.deductionItems}
            adjustedLabel={template.bankSide.adjustedBalanceLabel}
            responses={responses}
            onResponseChange={onResponseChange}
            requirements={requirements}
            isSubmitted={isSubmitted}
          />

          {/* Book Side */}
          <ReconciliationSection
            title={template.bookSide.title}
            startingLabel={template.bookSide.startingBalanceLabel}
            startingValue={template.bookSide.startingBalanceValue}
            additions={template.bookSide.additionItems}
            deductions={template.bookSide.deductionItems}
            adjustedLabel={template.bookSide.adjustedBalanceLabel}
            responses={responses}
            onResponseChange={onResponseChange}
            requirements={requirements}
            isSubmitted={isSubmitted}
          />
        </div>

        {/* Reconciliation Tips */}
        {!isSubmitted && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Reconciliation Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Deposits in transit are added to the bank side</li>
                  <li>Outstanding checks are deducted from the bank side</li>
                  <li>Bank collections/interest are added to the book side</li>
                  <li>Bank charges/NSF checks are deducted from the book side</li>
                  <li>Both sides should equal the same adjusted balance</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
