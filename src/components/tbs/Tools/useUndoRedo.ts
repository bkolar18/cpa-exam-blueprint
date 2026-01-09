"use client";

import { useState, useCallback, useRef } from "react";

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface UseUndoRedoReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  historyLength: number;
}

export default function useUndoRedo<T>(
  initialState: T,
  maxHistoryLength: number = 50
): UseUndoRedoReturn<T> {
  const [history, setHistory] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  // Track if we should skip recording (for undo/redo operations)
  const skipNextRecord = useRef(false);

  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Store the state before changes for history recording
  const stateBeforeChange = useRef<T | null>(null);

  const setState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      // Clear any pending debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }

      // Update state immediately
      setHistory((prev) => {
        const resolvedState =
          typeof newState === "function"
            ? (newState as (prev: T) => T)(prev.present)
            : newState;

        // Store the previous state for history (only on first change in a batch)
        if (stateBeforeChange.current === null) {
          stateBeforeChange.current = prev.present;
        }

        return {
          ...prev,
          present: resolvedState,
        };
      });

      // Schedule history recording (debounced) - OUTSIDE the updater
      debounceTimer.current = setTimeout(() => {
        if (!skipNextRecord.current && stateBeforeChange.current !== null) {
          setHistory((prev) => {
            const savedState = stateBeforeChange.current;
            stateBeforeChange.current = null; // Reset for next batch

            // Don't record if nothing to record
            if (savedState === null) {
              return prev;
            }

            // Don't record if state hasn't actually changed
            if (JSON.stringify(savedState) === JSON.stringify(prev.present)) {
              return prev;
            }

            // Don't record duplicate history entries
            const lastPast = prev.past[prev.past.length - 1];
            if (lastPast && JSON.stringify(lastPast) === JSON.stringify(savedState)) {
              return prev;
            }

            const newPast = [...prev.past, savedState];
            // Trim history if it exceeds max length
            if (newPast.length > maxHistoryLength) {
              newPast.shift();
            }

            return {
              past: newPast,
              present: prev.present,
              future: [],
            };
          });
        } else {
          stateBeforeChange.current = null;
        }
      }, 500);
    },
    [maxHistoryLength]
  );

  const undo = useCallback(() => {
    // Clear any pending history recording
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    stateBeforeChange.current = null;
    skipNextRecord.current = true;

    setHistory((prev) => {
      if (prev.past.length === 0) return prev;

      const newPast = [...prev.past];
      const previousState = newPast.pop()!;

      return {
        past: newPast,
        present: previousState,
        future: [prev.present, ...prev.future],
      };
    });

    setTimeout(() => {
      skipNextRecord.current = false;
    }, 0);
  }, []);

  const redo = useCallback(() => {
    // Clear any pending history recording
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    stateBeforeChange.current = null;
    skipNextRecord.current = true;

    setHistory((prev) => {
      if (prev.future.length === 0) return prev;

      const newFuture = [...prev.future];
      const nextState = newFuture.shift()!;

      return {
        past: [...prev.past, prev.present],
        present: nextState,
        future: newFuture,
      };
    });

    setTimeout(() => {
      skipNextRecord.current = false;
    }, 0);
  }, []);

  const clear = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    stateBeforeChange.current = null;

    setHistory((prev) => ({
      past: [],
      present: prev.present,
      future: [],
    }));
  }, []);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    clear,
    historyLength: history.past.length,
  };
}
