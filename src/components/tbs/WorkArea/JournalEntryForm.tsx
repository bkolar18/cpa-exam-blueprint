"use client";

import { useState, useCallback, useMemo } from"react";
import { TBSRequirement, TBSJournalAccount, UserResponse } from"@/lib/data/tbs/types";

interface JournalEntryFormProps {
 requirements: TBSRequirement[];
 accounts: TBSJournalAccount[];
 responses: Record<string, UserResponse>;
 onResponseChange: (requirementId: string, response: UserResponse) => void;
 isSubmitted: boolean;
 showHints?: boolean;
}

function formatNumber(value: number | null): string {
 if (value === null || value === undefined) return"";
 return value.toLocaleString("en-US", {
 minimumFractionDigits: 0,
 maximumFractionDigits: 2,
 });
}

function parseNumber(value: string): number | null {
 if (!value.trim()) return null;
 const cleaned = value.replace(/[$,\s]/g,"");
 const parsed = parseFloat(cleaned);
 return isNaN(parsed) ? null : parsed;
}

export default function JournalEntryForm({
 requirements,
 accounts,
 responses,
 onResponseChange,
 isSubmitted,
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 showHints = false,
}: JournalEntryFormProps) {
 const [editingAmount, setEditingAmount] = useState<string | null>(null);
 const [editValue, setEditValue] = useState<string>("");

 // Separate debit and credit requirements
 const debitRequirements = requirements.filter((r) => r.type ==="journal_debit");
 const creditRequirements = requirements.filter((r) => r.type ==="journal_credit");

 // Calculate totals
 const totals = useMemo(() => {
 let totalDebits = 0;
 let totalCredits = 0;
 const safeResponses = responses || {};

 debitRequirements.forEach((req) => {
 const response = safeResponses[req.id] as { type:"journal_debit"; accountId: string | null; amount: number | null } | undefined;
 if (response?.amount) totalDebits += response.amount;
 });

 creditRequirements.forEach((req) => {
 const response = safeResponses[req.id] as { type:"journal_credit"; accountId: string | null; amount: number | null } | undefined;
 if (response?.amount) totalCredits += response.amount;
 });

 return {
 debits: totalDebits,
 credits: totalCredits,
 isBalanced: Math.abs(totalDebits - totalCredits) < 0.01,
 };
 }, [debitRequirements, creditRequirements, responses]);

 // Group accounts by type
 const groupedAccounts = useMemo(() => {
 const groups: Record<string, TBSJournalAccount[]> = {
 asset: [],
 liability: [],
 equity: [],
 revenue: [],
 expense: [],
 };

 accounts.forEach((acc) => {
 if (acc.type && groups[acc.type]) {
 groups[acc.type].push(acc);
 }
 });

 return groups;
 }, [accounts]);

 const handleAccountChange = useCallback((reqId: string, accountId: string, isDebit: boolean) => {
 const safeResponses = responses || {};
 const currentResponse = safeResponses[reqId] as { amount: number | null } | undefined;
 onResponseChange(reqId, {
 type: isDebit ?"journal_debit":"journal_credit",
 accountId: accountId || null,
 amount: currentResponse?.amount ?? null,
 });
 }, [responses, onResponseChange]);

 const handleAmountFocus = useCallback((reqId: string) => {
 setEditingAmount(reqId);
 const safeResponses = responses || {};
 const response = safeResponses[reqId] as { amount: number | null } | undefined;
 setEditValue(response?.amount !== null && response?.amount !== undefined ? String(response.amount) :"");
 }, [responses]);

 const handleAmountBlur = useCallback((reqId: string, isDebit: boolean) => {
 const numericValue = parseNumber(editValue);
 const safeResponses = responses || {};
 const currentResponse = safeResponses[reqId] as { accountId: string | null } | undefined;
 onResponseChange(reqId, {
 type: isDebit ?"journal_debit":"journal_credit",
 accountId: currentResponse?.accountId ?? null,
 amount: numericValue,
 });
 setEditingAmount(null);
 setEditValue("");
 }, [editValue, responses, onResponseChange]);

 const renderJournalLine = (req: TBSRequirement, isDebit: boolean, index: number) => {
 const safeResponses = responses || {};
 const response = safeResponses[req.id] as {
 type:"journal_debit"|"journal_credit";
 accountId: string | null;
 amount: number | null;
 } | undefined;

 const isEditing = editingAmount === req.id;
 const displayAmount = isEditing
 ? editValue
 : response?.amount !== null && response?.amount !== undefined
 ? formatNumber(response.amount)
 :"";

 return (
 <tr key={req.id} className={isDebit ?"":"bg-gray-50/50 dark:bg-[var(--background)]/30"}>
 {/* Line Number */}
 <td className="py-2 px-2 text-center text-sm text-gray-500 dark:text-[var(--muted)]">
 {index + 1}
 </td>

 {/* Account Dropdown */}
 <td className="py-2 px-2">
 <select
 value={response?.accountId ||""}
 onChange={(e) => handleAccountChange(req.id, e.target.value, isDebit)}
 disabled={isSubmitted}
 className={`w-full px-3 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-gray-800 dark:text-[var(--foreground)] text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
 !isDebit ?"pl-8":""
 }`}
 >
 <option value="">Select account...</option>
 {Object.entries(groupedAccounts).map(([type, accts]) => {
 if (accts.length === 0) return null;
 return (
 <optgroup key={type} label={type.charAt(0).toUpperCase() + type.slice(1)}>
 {accts.map((acc) => (
 <option key={acc.id} value={acc.id}>
 {acc.number ? `${acc.number} - ` :""}{acc.name}
 </option>
 ))}
 </optgroup>
 );
 })}
 </select>
 </td>

 {/* Debit Amount */}
 <td className="py-2 px-2">
 {isDebit && (
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[var(--muted)] text-sm">
 $
 </span>
 <input
 type="text"
 value={displayAmount}
 onChange={(e) => setEditValue(e.target.value)}
 onFocus={() => handleAmountFocus(req.id)}
 onBlur={() => handleAmountBlur(req.id, true)}
 disabled={isSubmitted}
 className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-gray-800 dark:text-[var(--foreground)] text-right font-mono text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
 placeholder="0"
 />
 </div>
 )}
 </td>

 {/* Credit Amount */}
 <td className="py-2 px-2">
 {!isDebit && (
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[var(--muted)] text-sm">
 $
 </span>
 <input
 type="text"
 value={displayAmount}
 onChange={(e) => setEditValue(e.target.value)}
 onFocus={() => handleAmountFocus(req.id)}
 onBlur={() => handleAmountBlur(req.id, false)}
 disabled={isSubmitted}
 className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-gray-800 dark:text-[var(--foreground)] text-right font-mono text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
 placeholder="0"
 />
 </div>
 )}
 </td>
 </tr>
 );
 };

 return (
 <div className="p-4">
 <div className="bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg overflow-hidden">
 {/* Header */}
 <div className="bg-gray-50 dark:bg-[var(--background)] px-4 py-3 border-b border-gray-200">
 <h3 className="text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)]">
 Journal Entry
 </h3>
 <p className="text-xs text-gray-500 dark:text-[var(--muted)] mt-1">
 Select accounts and enter amounts. Debits should equal credits.
 </p>
 </div>

 {/* Journal Entry Table */}
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="bg-gray-100 dark:bg-[var(--background)] border-b border-gray-200">
 <th className="py-2 px-2 text-left text-xs font-semibold text-gray-600 dark:text-[var(--muted)] w-12">
 #
 </th>
 <th className="py-2 px-2 text-left text-xs font-semibold text-gray-600 dark:text-[var(--muted)]">
 Account
 </th>
 <th className="py-2 px-2 text-right text-xs font-semibold text-gray-600 dark:text-[var(--muted)] w-32">
 Debit
 </th>
 <th className="py-2 px-2 text-right text-xs font-semibold text-gray-600 dark:text-[var(--muted)] w-32">
 Credit
 </th>
 </tr>
 </thead>
 <tbody>
 {/* Debit lines */}
 {debitRequirements.map((req, index) => renderJournalLine(req, true, index))}

 {/* Credit lines */}
 {creditRequirements.map((req, index) =>
 renderJournalLine(req, false, debitRequirements.length + index)
 )}

 {/* Totals Row */}
 <tr className="border-t-2 border-gray-300 dark:border-[var(--border)] bg-gray-50 dark:bg-[var(--background)]">
 <td className="py-3 px-2"></td>
 <td className="py-3 px-2 text-right text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)]">
 Totals:
 </td>
 <td className="py-3 px-2">
 <div className="text-right font-mono text-sm font-semibold text-gray-800 dark:text-[var(--foreground)]">
 ${formatNumber(totals.debits)}
 </div>
 </td>
 <td className="py-3 px-2">
 <div className="text-right font-mono text-sm font-semibold text-gray-800 dark:text-[var(--foreground)]">
 ${formatNumber(totals.credits)}
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 {/* Balance Indicator */}
 <div className={`px-4 py-3 border-t ${
 totals.isBalanced
 ?"bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
 :"bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
 }`}>
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-2">
 {totals.isBalanced ? (
 <>
 <svg className="w-5 h-5 text-green-600 dark:text-green-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 <span className="text-sm font-medium text-green-700 dark:text-green-300">
 Entry is balanced
 </span>
 </>
 ) : (
 <>
 <svg className="w-5 h-5 text-red-600 dark:text-red-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 <span className="text-sm font-medium text-red-700 dark:text-red-300">
 Entry is not balanced
 </span>
 </>
 )}
 </div>
 {!totals.isBalanced && (
 <span className="text-sm text-red-600 dark:text-red-400 font-mono">
 Difference: ${formatNumber(Math.abs(totals.debits - totals.credits))}
 </span>
 )}
 </div>
 </div>
 </div>
 </div>
 );
}
