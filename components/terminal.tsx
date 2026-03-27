'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalHistoryDisplay } from './terminal-history';
import { TerminalInput } from './terminal-input';
import { TerminalHistory, CommandOutput } from '@/lib/cli/types';
import { parseInput, executeCommand } from '@/lib/cli/parser';
import { loadConfig, updateConfig } from '@/lib/cli/config';

interface TerminalProps {
  initialTheme?: 'green' | 'blue' | 'amber';
}

export function Terminal({ initialTheme = 'green' }: TerminalProps) {
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState('');
  const [theme, setTheme] = useState<'green' | 'blue' | 'amber'>(initialTheme);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load config on mount
  useEffect(() => {
    const config = loadConfig();
    setTheme(config.theme);
  }, []);

  // Handle command submission
  const handleCommandSubmit = useCallback(
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

        // Execute command
        let output: CommandOutput[] = [];

        if (command === 'clear') {
          // Clear screen
          setHistory([]);
          setIsLoading(false);
          return;
        }

        output = await executeCommand(command, args);

        // Update theme if theme command was used
        if (command === 'theme' && args.length > 0) {
          const newTheme = args[0].toLowerCase() as 'green' | 'blue' | 'amber';
          if (['green', 'blue', 'amber'].includes(newTheme)) {
            setTheme(newTheme);
            updateConfig({ theme: newTheme });
          }
        }

        // Add to history
        const newEntry: TerminalHistory = {
          command: input,
          output,
          timestamp: new Date(),
        };

        setHistory((prev) => [...prev, newEntry]);
      } catch (error) {
        const errorOutput: TerminalHistory = {
          command: input,
          output: [
            {
              type: 'error',
              content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          timestamp: new Date(),
        };
        setHistory((prev) => [...prev, errorOutput]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle history navigation
  const handleHistoryNavigate = useCallback((direction: 'up' | 'down') => {
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

  return (
    <div className="h-screen w-full bg-black flex flex-col p-3 sm:p-4 md:p-6 overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 tracking-widest whitespace-pre">
          {`╔═══════════════════════════════════╗`}
        </h1>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 tracking-widest whitespace-pre">
          {`║ ARSHUX TERMINAL EMULATOR v1.0 ║`}
        </h1>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 tracking-widest whitespace-pre">
          {`╚═══════════════════════════════════╝`}
        </h1>
        <p className="text-green-500 text-xs sm:text-sm font-mono mt-2">
          Type &apos;help&apos; to get started | Arrow keys navigate history
        </p>
      </div>

      {/* Terminal Content */}
      <TerminalHistoryDisplay entries={history} theme={theme} />

      {/* Terminal Input */}
      <div className="flex-shrink-0 text-green-400">
        <TerminalInput
          onSubmit={handleCommandSubmit}
          onHistoryNavigate={handleHistoryNavigate}
          currentValue={currentInput}
          theme={theme}
          isLoading={isLoading}
        />
      </div>

      {/* Status Bar */}
      <div className="text-xs text-green-700 font-mono mt-3 sm:mt-4 border-t border-green-900 pt-2">
        <span className="block sm:inline">
          Cmds: {commandHistory.length} | Hist: {history.length} | {theme}
        </span>
      </div>
    </div>
  );
}
