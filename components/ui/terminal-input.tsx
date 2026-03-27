'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  onHistoryNavigate: (direction: 'up' | 'down') => void;
  currentValue: string;
  theme: 'green' | 'blue' | 'amber';
  isLoading?: boolean;
}

const themeColors = {
  green: {
    prompt: 'text-green-300',
    border: 'border-green-400 focus:border-green-300',
    caret: 'caret-green-400',
  },
  blue: {
    prompt: 'text-blue-300',
    border: 'border-blue-400 focus:border-blue-300',
    caret: 'caret-blue-400',
  },
  amber: {
    prompt: 'text-amber-300',
    border: 'border-amber-400 focus:border-amber-300',
    caret: 'caret-amber-400',
  },
};

export function TerminalInput({
  onSubmit,
  onHistoryNavigate,
  currentValue,
  theme,
  isLoading,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const colors = themeColors[theme];

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      const value = (e.target as HTMLInputElement).value || '';
      onSubmit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryNavigate('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryNavigate('down');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow parent to manage state via currentValue prop
    // This ensures proper history navigation
  };

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className={colors.prompt}>arshux@user:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`flex-1 bg-transparent border-b-2 ${colors.border} outline-none ${colors.caret} text-green-400 placeholder-gray-600 text-sm md:text-base`}
        placeholder={isLoading ? 'Processing...' : ''}
        disabled={isLoading}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}
