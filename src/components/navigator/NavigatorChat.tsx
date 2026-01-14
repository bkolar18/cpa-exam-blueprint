"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  useNavigatorContext,
  useNavigatorConversation,
  type NavigatorQuestionContext,
  type NavigatorMessage,
} from "@/hooks/useNavigatorContext";
import type { SectionCode } from "@/lib/supabase/types";
import ReactMarkdown from "react-markdown";

interface NavigatorChatProps {
  /** Current section (FAR, AUD, etc.) */
  section: SectionCode;
  /** Current topic */
  topic?: string;
  /** Question context for the Navigator */
  questionContext?: NavigatorQuestionContext | null;
  /** Practice mode (hints only) or Review mode (full explanations) */
  mode: "practice" | "review";
  /** Whether the chat is visible */
  isOpen: boolean;
  /** Called when chat is closed */
  onClose?: () => void;
  /** Display style */
  variant?: "inline" | "floating";
  /** Initial message to show */
  initialMessage?: string;
  /** Custom placeholder text */
  placeholder?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Meridian Navigator Chat Component
 *
 * The core chat interface that can be used in both inline and floating modes.
 * Handles conversation state, message sending, and displays usage limits.
 */
export default function NavigatorChat({
  section,
  topic,
  questionContext,
  mode,
  isOpen,
  onClose,
  variant = "inline",
  initialMessage,
  placeholder = "Ask the Navigator a question...",
  className = "",
}: NavigatorChatProps) {
  const {
    analyticsContext,
    usage,
    sendMessage,
    isAuthenticated,
    error: contextError,
  } = useNavigatorContext({ section, topic, enabled: isOpen });

  const {
    messages,
    isTyping,
    setIsTyping,
    addUserMessage,
    addAssistantMessage,
    clearConversation,
  } = useNavigatorConversation();

  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear conversation when question changes
  useEffect(() => {
    if (questionContext?.questionId) {
      clearConversation();
    }
  }, [questionContext?.questionId, clearConversation]);

  // Add initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0 && initialMessage) {
      addAssistantMessage(initialMessage);
    }
  }, [isOpen, messages.length, initialMessage, addAssistantMessage]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const trimmedInput = input.trim();
      if (!trimmedInput || isTyping) return;

      if (!isAuthenticated) {
        setError("Please sign in to use the Meridian Navigator");
        return;
      }

      if (usage && usage.remaining <= 0) {
        setError("Daily message limit reached. Upgrade your plan for more messages.");
        return;
      }

      // Add user message
      addUserMessage(trimmedInput);
      setInput("");
      setError(null);
      setIsTyping(true);

      try {
        // Build conversation history for API
        const history: NavigatorMessage[] = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const result = await sendMessage(
          trimmedInput,
          questionContext || null,
          mode,
          history
        );

        if (result) {
          addAssistantMessage(result.response);
        } else {
          setError("Failed to get a response. Please try again.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setIsTyping(false);
      }
    },
    [
      input,
      isTyping,
      isAuthenticated,
      usage,
      messages,
      mode,
      questionContext,
      addUserMessage,
      addAssistantMessage,
      sendMessage,
      setIsTyping,
    ]
  );

  // Handle Enter to submit (Shift+Enter for new line)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (!isOpen) return null;

  const isFloating = variant === "floating";

  return (
    <div
      className={`flex flex-col bg-white dark:bg-[var(--card)] ${
        isFloating
          ? "rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
          : "rounded-lg border border-gray-200 dark:border-gray-700"
      } ${className}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 ${
          isFloating
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl"
            : "bg-gray-50 dark:bg-gray-800/50 rounded-t-lg"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Navigator Icon */}
          <div
            className={`p-1.5 rounded-lg ${
              isFloating ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900/50"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                isFloating ? "text-white" : "text-blue-600 dark:text-blue-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`text-sm font-semibold ${
                  isFloating ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                Meridian Navigator
              </h3>
              {/* Beta badge */}
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                isFloating
                  ? "bg-white/20 text-white"
                  : "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
              }`}>
                BETA
              </span>
            </div>
            <p
              className={`text-xs ${
                isFloating
                  ? "text-white/80"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {mode === "practice" ? "Hint Mode" : "Review Mode"}
              {usage && ` • ${usage.remaining}/${usage.limit} remaining`}
            </p>
          </div>
        </div>

        {/* Close button (only for floating) */}
        {isFloating && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close Navigator"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isFloating ? "min-h-[200px] max-h-[400px]" : "min-h-[150px] max-h-[300px]"
        }`}
      >
        {/* Auth prompt if not signed in */}
        {!isAuthenticated && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-3">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Sign in to use the Meridian Navigator
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Get personalized study guidance powered by AI
            </p>
          </div>
        )}

        {/* Messages */}
        {isAuthenticated &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 mb-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 mb-2">{children}</ol>
                        ),
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error display */}
        {(error || contextError) && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error || contextError?.message}
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={isTyping || (usage?.remaining ?? 1) <= 0}
              className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping || (usage?.remaining ?? 1) <= 0}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>

          {/* Footer disclaimer */}
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-center">
            AI responses are for educational purposes only. Verify with authoritative sources.
          </p>
        </form>
      )}
    </div>
  );
}
