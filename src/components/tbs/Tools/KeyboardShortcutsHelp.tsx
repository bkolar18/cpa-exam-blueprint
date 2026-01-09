"use client";

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
  isPracticeMode?: boolean;
}

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string; practiceOnly?: boolean }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "General",
    shortcuts: [
      { keys: ["Ctrl", "Z"], description: "Undo last action" },
      { keys: ["Ctrl", "Y"], description: "Redo last action" },
      { keys: ["Ctrl", "Shift", "Z"], description: "Redo last action (alternate)" },
      { keys: ["Esc"], description: "Return to question from review" },
    ],
  },
  {
    title: "Tools",
    shortcuts: [
      { keys: ["Alt", "C"], description: "Toggle calculator" },
      { keys: ["Alt", "N"], description: "Toggle scratch pad (notes)" },
      { keys: ["Alt", "F"], description: "Toggle formula sheet" },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["Alt", "V"], description: "View review screen" },
      { keys: ["Alt", "R"], description: "Flag/unflag for review" },
      { keys: ["Alt", "H"], description: "Toggle hints", practiceOnly: true },
    ],
  },
];

function KeyBadge({ children }: { children: string }) {
  return (
    <kbd className="px-2 py-1 text-xs font-mono font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
      {children}
    </kbd>
  );
}

export default function KeyboardShortcutsHelp({
  isOpen,
  onClose,
  isPracticeMode = true,
}: KeyboardShortcutsHelpProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="mb-6 last:mb-0">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.shortcuts
                  .filter((s) => !s.practiceOnly || isPracticeMode)
                  .map((shortcut) => (
                    <div
                      key={shortcut.description}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {shortcut.description}
                        {shortcut.practiceOnly && (
                          <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">
                            (Practice only)
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <span key={key} className="flex items-center gap-1">
                            <KeyBadge>{key}</KeyBadge>
                            {i < shortcut.keys.length - 1 && (
                              <span className="text-gray-400 text-xs">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Press <KeyBadge>?</KeyBadge> anytime to show this help
          </p>
        </div>
      </div>
    </div>
  );
}
