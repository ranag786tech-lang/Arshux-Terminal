/**
 * Core CLI type definitions for the arshux terminal emulator
 */

export interface CommandOutput {
  type: 'success' | 'error' | 'info' | 'warning';
  content: string;
}

export interface TerminalHistory {
  command: string;
  output: CommandOutput[];
  timestamp: Date;
}

export interface CliConfig {
  username: string;
  isLoggedIn: boolean;
  theme: 'green' | 'blue' | 'amber';
  lastLogin?: Date;
}

export interface CommandHandler {
  execute: (args: string[]) => Promise<CommandOutput[]>;
  description: string;
  usage: string;
}

export interface Command {
  name: string;
  aliases?: string[];
  handler: CommandHandler;
}
