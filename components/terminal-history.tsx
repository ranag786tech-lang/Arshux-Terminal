'use client';

import { useEffect, useRef } from 'react';
import { TerminalHistory } from '@/lib/cli/types';

interface TerminalHistoryProps {
  entries: TerminalHistory[];
  theme: 'green' | 'blue' | 'amber';
}

const themeColors = {
  green: {
    text: 'text-green-400',
    prompt: 'text-green-300',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-green-300',
  },
  blue: {
    text: 'text-blue-400',
    prompt: 'text-blue-300',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-blue-300',
  },
  amber: {
    text: 'text-amber-400',
    prompt: 'text-amber-300',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-amber-300',
  },
};

export function TerminalHistoryDisplay({ entries, theme }: TerminalHistoryProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const colors = themeColors[theme];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-4">
      {entries.map((entry, idx) => (
        <div key={idx} className="space-y-1">
          {/* Command prompt */}
          <div className={`${colors.prompt} font-mono text-sm`}>
            <span>arshux@user:~$ {entry.command}</span>
          </div>

          {/* Command output */}
          {entry.output.map((output, outputIdx) => {
            let outputClass = colors.text;

            if (output.type === 'error') {
              outputClass = colors.error;
            } else if (output.type === 'warning') {
              outputClass = colors.warning;
            } else if (output.type === 'success') {
              outputClass = colors.success;
            }

            // Skip rendering the clear command marker
            if (output.content === '__CLEAR_SCREEN__') {
              return null;
            }

            return (
              <div key={outputIdx} className={`${outputClass} font-mono text-sm whitespace-pre-wrap`}>
                {output.content}
              </div>
            );
          })}
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={endRef} />
    </div>
  );
}
