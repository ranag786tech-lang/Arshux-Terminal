/**
 * Custom hook for managing terminal state and commands
 * Handles command history, input state, and execution
 */

import { useState, useCallback } from 'react';
import { TerminalHistory, CommandOutput } from '@/lib/cli/types';
import { parseInput, executeCommand } from '@/lib/cli/parser';

export interface UseTerminalOptions {
  onThemeChange?: (theme: 'green' | 'blue' | 'amber') => void;
}

export function useTerminal(options?: UseTerminalOptions) {
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const executeAndRecord = useCallback(
    async (input: string) => {
      if (!input.trim()) {
        return;
      }

      setIsLoading(true);
      setCurrentInput('');

      try {
        const { command, args } = parseInput(input);

        // Add to command history
        setCommandHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);

        // Handle clear command specially
        if (command === 'clear') {
          setHistory([]);
          setIsLoading(false);
          return;
        }

        // Execute command
        const output = await executeCommand(command, args);

        // Handle theme changes
        if (command === 'theme' && args.length > 0) {
          const newTheme = args[0].toLowerCase() as 'green' | 'blue' | 'amber';
          if (['green', 'blue', 'amber'].includes(newTheme)) {
            options?.onThemeChange?.(newTheme);
          }
        }

        // Record in history
        const newEntry: TerminalHistory = {
          command: input,
          output,
          timestamp: new Date(),
        };

        setHistory((prev) => [...prev, newEntry]);
      } catch (error) {
        const errorEntry: TerminalHistory = {
          command: input,
          output: [
            {
              type: 'error',
              content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          timestamp: new Date(),
        };
        setHistory((prev) => [...prev, errorEntry]);
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setHistoryIndex((prevIndex) => {
      let newIndex = prevIndex;

      if (direction === 'up') {
        newIndex = Math.min(prevIndex + 1, commandHistory.length - 1);
      } else {
        newIndex = Math.max(prevIndex - 1, -1);
      }

      if (newIndex === -1) {
        setCurrentInput('');
      } else {
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }

      return newIndex;
    });
  }, [commandHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCommandHistory([]);
    setHistoryIndex(-1);
    setCurrentInput('');
  }, []);

  return {
    history,
    commandHistory,
    currentInput,
    setCurrentInput,
    isLoading,
    executeAndRecord,
    navigateHistory,
    clearHistory,
  };
}
