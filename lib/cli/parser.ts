/**
 * Command parser and executor for arshux
 * Handles parsing user input and executing appropriate commands
 */

import { CommandOutput } from './types';
import {
  helpCommand,
  aboutCommand,
  clearCommand,
  dateCommand,
  loginCommand,
  logoutCommand,
  echoCommand,
  themeCommand,
  configCommand,
  unknownCommand,
} from './commands';

/**
 * Command registry - maps command names to handlers
 */
const commandRegistry: Record<string, (args: string[]) => Promise<CommandOutput[]>> = {
  help: helpCommand,
  about: aboutCommand,
  clear: clearCommand,
  date: dateCommand,
  login: loginCommand,
  logout: logoutCommand,
  echo: echoCommand,
  theme: themeCommand,
  config: configCommand,
};

/**
 * Parse command line input
 * Handles quoted strings and argument parsing
 */
export function parseInput(input: string): { command: string; args: string[] } {
  const trimmed = input.trim();

  if (!trimmed) {
    return { command: '', args: [] };
  }

  // Split by spaces but respect quoted strings
  const parts: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ' ' && !inQuotes) {
      if (current) {
        parts.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current) {
    parts.push(current);
  }

  const command = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);

  return { command, args };
}

/**
 * Execute a command by name
 */
export async function executeCommand(
  command: string,
  args: string[]
): Promise<CommandOutput[]> {
  if (!command) {
    return [];
  }

  const handler = commandRegistry[command];

  if (handler) {
    try {
      return await handler(args);
    } catch (error) {
      return [
        {
          type: 'error',
          content: `Command execution error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ];
    }
  }

  return await unknownCommand(command, args);
}

/**
 * Register a custom command (for extensibility)
 */
export function registerCommand(
  name: string,
  handler: (args: string[]) => Promise<CommandOutput[]>
): void {
  commandRegistry[name.toLowerCase()] = handler;
}

/**
 * Get all registered commands
 */
export function getRegisteredCommands(): string[] {
  return Object.keys(commandRegistry).sort();
}
