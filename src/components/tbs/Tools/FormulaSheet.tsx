"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface FormulaSheetProps {
  isOpen: boolean;
  onClose: () => void;
  section?: "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC";
}

type FormulaCategory = "pv" | "ratios" | "accounting" | "tax" | "audit";

const formulas: Record<FormulaCategory, { name: string; items: { title: string; formula: string; note?: string }[] }> = {
  pv: {
    name: "Present Value",
    items: [
      {
        title: "Present Value (Single Sum)",
        formula: "PV = FV × (1 + r)⁻ⁿ",
        note: "FV = Future Value, r = rate, n = periods",
      },
      {
        title: "Future Value (Single Sum)",
        formula: "FV = PV × (1 + r)ⁿ",
      },
      {
        title: "PV of Ordinary Annuity",
        formula: "PVA = PMT × [(1 - (1 + r)⁻ⁿ) / r]",
        note: "Payments at end of each period",
      },
      {
        title: "PV of Annuity Due",
        formula: "PVAD = PMT × [(1 - (1 + r)⁻ⁿ) / r] × (1 + r)",
        note: "Payments at beginning of each period",
      },
      {
        title: "FV of Ordinary Annuity",
        formula: "FVA = PMT × [((1 + r)ⁿ - 1) / r]",
      },
      {
        title: "FV of Annuity Due",
        formula: "FVAD = PMT × [((1 + r)ⁿ - 1) / r] × (1 + r)",
      },
    ],
  },
  ratios: {
    name: "Financial Ratios",
    items: [
      {
        title: "Current Ratio",
        formula: "Current Assets / Current Liabilities",
        note: "Measures short-term liquidity",
      },
      {
        title: "Quick Ratio (Acid Test)",
        formula: "(Cash + Marketable Securities + Receivables) / Current Liabilities",
        note: "Excludes inventory",
      },
      {
        title: "Debt to Equity",
        formula: "Total Liabilities / Total Equity",
      },
      {
        title: "Times Interest Earned",
        formula: "EBIT / Interest Expense",
      },
      {
        title: "Return on Assets (ROA)",
        formula: "Net Income / Average Total Assets",
      },
      {
        title: "Return on Equity (ROE)",
        formula: "Net Income / Average Shareholders' Equity",
      },
      {
        title: "Profit Margin",
        formula: "Net Income / Net Sales",
      },
      {
        title: "Asset Turnover",
        formula: "Net Sales / Average Total Assets",
      },
      {
        title: "Inventory Turnover",
        formula: "COGS / Average Inventory",
      },
      {
        title: "Days in Inventory",
        formula: "365 / Inventory Turnover",
      },
      {
        title: "Receivables Turnover",
        formula: "Net Credit Sales / Average Receivables",
      },
      {
        title: "Days Sales Outstanding",
        formula: "365 / Receivables Turnover",
      },
      {
        title: "Earnings Per Share (Basic)",
        formula: "(Net Income - Preferred Dividends) / Weighted Avg Common Shares",
      },
      {
        title: "Price/Earnings Ratio",
        formula: "Market Price per Share / EPS",
      },
    ],
  },
  accounting: {
    name: "Accounting Formulas",
    items: [
      {
        title: "Accounting Equation",
        formula: "Assets = Liabilities + Equity",
      },
      {
        title: "Net Income",
        formula: "Revenue - Expenses",
      },
      {
        title: "Cost of Goods Sold",
        formula: "Beginning Inventory + Purchases - Ending Inventory",
      },
      {
        title: "Gross Profit",
        formula: "Net Sales - COGS",
      },
      {
        title: "Straight-Line Depreciation",
        formula: "(Cost - Salvage Value) / Useful Life",
      },
      {
        title: "Double Declining Balance",
        formula: "(2 / Useful Life) × Book Value",
        note: "Ignores salvage until BV = salvage",
      },
      {
        title: "Units of Production Depreciation",
        formula: "[(Cost - Salvage) / Total Units] × Units Produced",
      },
      {
        title: "Bad Debt Expense (% of Sales)",
        formula: "Credit Sales × Bad Debt %",
      },
      {
        title: "Allowance for Doubtful Accounts",
        formula: "Ending A/R × Uncollectible %",
        note: "Aging method",
      },
      {
        title: "Interest Expense (Effective Interest)",
        formula: "Carrying Value × Market Rate",
      },
      {
        title: "Bond Premium/Discount Amortization",
        formula: "Cash Payment - Interest Expense",
      },
    ],
  },
  tax: {
    name: "Tax Formulas",
    items: [
      {
        title: "Taxable Income",
        formula: "Gross Income - Above-the-Line Deductions - (Standard or Itemized) - QBI",
      },
      {
        title: "Tax Liability",
        formula: "Taxable Income × Tax Rate",
      },
      {
        title: "Adjusted Gross Income",
        formula: "Gross Income - Above-the-Line Deductions",
      },
      {
        title: "Child Tax Credit (2024)",
        formula: "$2,000 per qualifying child under 17",
        note: "Phase out at $200k (single) / $400k (MFJ)",
      },
      {
        title: "Standard Deduction (2024 MFJ)",
        formula: "$29,200",
        note: "Additional $1,550 if 65+ or blind",
      },
      {
        title: "Standard Deduction (2024 Single)",
        formula: "$14,600",
        note: "Additional $1,950 if 65+ or blind",
      },
      {
        title: "Self-Employment Tax",
        formula: "Net SE Income × 0.9235 × 15.3%",
        note: "Social Security (12.4%) + Medicare (2.9%)",
      },
      {
        title: "QBI Deduction",
        formula: "Lesser of: 20% QBI or 20% (Taxable Income - Net Capital Gain)",
      },
      {
        title: "Capital Gains Rate (0%)",
        formula: "Taxable income ≤ $47,025 (single) / $94,050 (MFJ)",
      },
      {
        title: "Capital Gains Rate (15%)",
        formula: "Up to $518,900 (single) / $583,750 (MFJ)",
      },
      {
        title: "Capital Gains Rate (20%)",
        formula: "Above 15% threshold",
      },
    ],
  },
  audit: {
    name: "Audit Formulas",
    items: [
      {
        title: "Audit Risk Model",
        formula: "AR = IR × CR × DR",
        note: "AR=Audit Risk, IR=Inherent, CR=Control, DR=Detection",
      },
      {
        title: "Detection Risk",
        formula: "DR = AR / (IR × CR)",
      },
      {
        title: "Tolerable Misstatement",
        formula: "Overall Materiality × Allocation %",
        note: "Typically 50-75% of overall materiality",
      },
      {
        title: "Sample Size (Attributes)",
        formula: "Confidence Factor / (TDR - Expected DR)",
        note: "TDR = Tolerable Deviation Rate",
      },
      {
        title: "Projected Misstatement",
        formula: "(Misstatement Found / Sample) × Population",
      },
    ],
  },
};

// PV Tables
const pvTables = {
  pvSingle: {
    title: "Present Value of $1",
    headers: ["n", "4%", "5%", "6%", "7%", "8%", "10%", "12%"],
    rows: [
      [1, 0.9615, 0.9524, 0.9434, 0.9346, 0.9259, 0.9091, 0.8929],
      [2, 0.9246, 0.9070, 0.8900, 0.8734, 0.8573, 0.8264, 0.7972],
      [3, 0.8890, 0.8638, 0.8396, 0.8163, 0.7938, 0.7513, 0.7118],
      [4, 0.8548, 0.8227, 0.7921, 0.7629, 0.7350, 0.6830, 0.6355],
      [5, 0.8219, 0.7835, 0.7473, 0.7130, 0.6806, 0.6209, 0.5674],
      [6, 0.7903, 0.7462, 0.7050, 0.6663, 0.6302, 0.5645, 0.5066],
      [7, 0.7599, 0.7107, 0.6651, 0.6227, 0.5835, 0.5132, 0.4523],
      [8, 0.7307, 0.6768, 0.6274, 0.5820, 0.5403, 0.4665, 0.4039],
      [9, 0.7026, 0.6446, 0.5919, 0.5439, 0.5002, 0.4241, 0.3606],
      [10, 0.6756, 0.6139, 0.5584, 0.5083, 0.4632, 0.3855, 0.3220],
    ],
  },
  pvAnnuity: {
    title: "Present Value of Ordinary Annuity",
    headers: ["n", "4%", "5%", "6%", "7%", "8%", "10%", "12%"],
    rows: [
      [1, 0.9615, 0.9524, 0.9434, 0.9346, 0.9259, 0.9091, 0.8929],
      [2, 1.8861, 1.8594, 1.8334, 1.8080, 1.7833, 1.7355, 1.6901],
      [3, 2.7751, 2.7232, 2.6730, 2.6243, 2.5771, 2.4869, 2.4018],
      [4, 3.6299, 3.5460, 3.4651, 3.3872, 3.3121, 3.1699, 3.0373],
      [5, 4.4518, 4.3295, 4.2124, 4.1002, 3.9927, 3.7908, 3.6048],
      [6, 5.2421, 5.0757, 4.9173, 4.7665, 4.6229, 4.3553, 4.1114],
      [7, 6.0021, 5.7864, 5.5824, 5.3893, 5.2064, 4.8684, 4.5638],
      [8, 6.7327, 6.4632, 6.2098, 5.9713, 5.7466, 5.3349, 4.9676],
      [9, 7.4353, 7.1078, 6.8017, 6.5152, 6.2469, 5.7590, 5.3282],
      [10, 8.1109, 7.7217, 7.3601, 7.0236, 6.7101, 6.1446, 5.6502],
    ],
  },
};

export default function FormulaSheet({ isOpen, onClose, section }: FormulaSheetProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FormulaCategory>("pv");
  const [activeTab, setActiveTab] = useState<"formulas" | "tables">("formulas");
  const [searchQuery, setSearchQuery] = useState("");
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initialize position to center of viewport when first opened
  useEffect(() => {
    if (isOpen && position === null) {
      const width = 500;
      const height = 550;
      const x = Math.max(20, (window.innerWidth - width) / 2);
      const y = Math.max(20, (window.innerHeight - height) / 2);
      setPosition({ x, y });
    }
  }, [isOpen, position]);

  // Filter categories based on section
  const getRelevantCategories = (): FormulaCategory[] => {
    switch (section) {
      case "FAR":
      case "BAR":
        return ["pv", "ratios", "accounting"];
      case "AUD":
        return ["pv", "ratios", "accounting", "audit"];
      case "REG":
      case "TCP":
        return ["pv", "tax", "accounting"];
      case "ISC":
        return ["ratios", "accounting"];
      default:
        return ["pv", "ratios", "accounting", "tax", "audit"];
    }
  };

  const relevantCategories = getRelevantCategories();

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if ((e.target as HTMLElement).closest("input")) return;
    if (!position) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const width = 500;
      const height = 550;
      const maxX = window.innerWidth - width - 20;
      const maxY = window.innerHeight - height - 20;
      setPosition({
        x: Math.min(maxX, Math.max(20, e.clientX - dragOffset.current.x)),
        y: Math.min(maxY, Math.max(20, e.clientY - dragOffset.current.y)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Filter formulas by search
  const filteredItems = searchQuery.trim()
    ? Object.values(formulas)
        .flatMap((cat) => cat.items)
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.formula.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : formulas[activeCategory]?.items || [];

  if (!isOpen || !position) return null;

  return (
    <div
      className="fixed z-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: 500,
        maxHeight: "calc(100vh - 40px)",
        height: 550,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-purple-50 dark:bg-purple-900/30 border-b border-purple-200 dark:border-purple-800 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-purple-600 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-semibold text-purple-800 dark:text-purple-200">
            Formula Reference
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("formulas")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "formulas"
              ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Formulas
        </button>
        <button
          onClick={() => setActiveTab("tables")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "tables"
              ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          PV Tables
        </button>
      </div>

      {activeTab === "formulas" ? (
        <>
          {/* Category Tabs */}
          {!searchQuery && (
            <div className="flex gap-1 px-3 py-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {relevantCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {formulas[cat].name}
                </button>
              ))}
            </div>
          )}

          {/* Formula List */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery && (
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for "{searchQuery}"
              </div>
            )}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredItems.map((item, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    {item.title}
                  </div>
                  <div className="font-mono text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded inline-block">
                    {item.formula}
                  </div>
                  {item.note && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No formulas found
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* PV Tables */
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.values(pvTables).map((table) => (
            <div key={table.title}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {table.title}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      {table.headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-2 py-1 text-center font-medium text-gray-600 dark:text-gray-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-2 py-1 text-center ${
                              j === 0
                                ? "font-medium text-gray-800 dark:text-gray-200"
                                : "font-mono text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {typeof cell === "number" && j > 0 ? cell.toFixed(4) : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
