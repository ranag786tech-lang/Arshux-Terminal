/**
 * Command implementations for the arshux CLI
 * Each command is modular and can be easily extended
 */

import { CommandOutput } from './types';

/**
 * Help command - displays available commands
 */
export const helpCommand = async (args: string[]): Promise<CommandOutput[]> => {
  const helpText = `
Available Commands:
  help          - Display this help message
  about         - Information about arshux
  clear         - Clear the terminal screen
  date          - Show current date and time
  login         - Login to arshux
  logout        - Logout from arshux
  echo [text]   - Echo text back to you
  theme [name]  - Set theme (green, blue, amber)
  config        - Show current configuration

Type 'help [command]' for more details
`;
  return [{ type: 'info', content: helpText.trim() }];
};

/**
 * About command - displays information about arshux
 */
export const aboutCommand = async (args: string[]): Promise<CommandOutput[]> => {
  const aboutText = `
╔════════════════════════════════════════════════════════════╗
║                    ARSHUX v1.0.0                          ║
║            A Lightweight CLI Terminal Emulator             ║
╚════════════════════════════════════════════════════════════╝

arshux is a retro-styled terminal emulator that combines
classic CLI aesthetics with modern web technology. It features
command handling, command history, user authentication, and
persistent configuration management.

Built with Next.js, React, and TypeScript
Licensed under MIT - Open Source Project
`;
  return [{ type: 'success', content: aboutText.trim() }];
};

/**
 * Clear command - clears terminal history
 */
export const clearCommand = async (args: string[]): Promise<CommandOutput[]> => {
  // Return special marker for UI to clear history
  return [{ type: 'info', content: '__CLEAR_SCREEN__' }];
};

/**
 * Date command - shows current date and time
 */
export const dateCommand = async (args: string[]): Promise<CommandOutput[]> => {
  const now = new Date();
  const formatted = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
  return [{ type: 'success', content: formatted }];
};

/**
 * Login command - authenticate user
 */
export const loginCommand = async (args: string[]): Promise<CommandOutput[]> => {
  // In a real app, this would validate credentials
  // For this demo, we'll just mark as logged in
  return [
    {
      type: 'success',
      content: 'Successfully logged in to arshux',
    },
    {
      type: 'info',
      content: `Current date/time: ${new Date().toLocaleString()}`,
    },
  ];
};

/**
 * Logout command - end session
 */
export const logoutCommand = async (args: string[]): Promise<CommandOutput[]> => {
  return [{ type: 'info', content: 'Logged out from arshux' }];
};

/**
 * Echo command - repeat input
 */
export const echoCommand = async (args: string[]): Promise<CommandOutput[]> => {
  if (args.length === 0) {
    return [{ type: 'warning', content: 'echo: missing argument' }];
  }
  const text = args.join(' ');
  return [{ type: 'success', content: text }];
};

/**
 * Theme command - change terminal theme
 */
export const themeCommand = async (args: string[]): Promise<CommandOutput[]> => {
  if (args.length === 0) {
    return [
      {
        type: 'info',
        content: 'Available themes: green, blue, amber\nUsage: theme [name]',
      },
    ];
  }

  const theme = args[0].toLowerCase();
  const validThemes = ['green', 'blue', 'amber'];

  if (!validThemes.includes(theme)) {
    return [
      {
        type: 'error',
        content: `Invalid theme '${theme}'. Available: ${validThemes.join(', ')}`,
      },
    ];
  }

  return [{ type: 'success', content: `Theme changed to '${theme}'` }];
};

/**
 * Config command - display current configuration
 */
export const configCommand = async (args: string[]): Promise<CommandOutput[]> => {
  const configText = `
Current Configuration:
  username: user
  isLoggedIn: false
  theme: green
`;
  return [{ type: 'info', content: configText.trim() }];
};

/**
 * Unknown command handler
 */
export const unknownCommand = async (
  command: string,
  args: string[]
): Promise<CommandOutput[]> => {
  return [
    {
      type: 'error',
      content: `arshux: command not found: ${command}`,
    },
    {
      type: 'info',
      content: "Type 'help' to see available commands",
    },
  ];
};
