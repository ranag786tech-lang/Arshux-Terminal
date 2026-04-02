Arshux Terminal — Developer Overview

Arshux Terminal is a custom developer-focused terminal UI designed to let programmers test commands and code snippets without switching between tools or environments.

Core Features

Retro Terminal Interface
A classic terminal-style UI with a dark background and neon-inspired text themes (green, blue, and amber).

Modular Command System
A fully extensible command architecture that allows easy addition and management of custom commands.

Command History Support
Navigate previously executed commands using keyboard arrows (↑ / ↓).

Auto-Focus Input
Input field automatically focuses on terminal load for seamless interaction.

Persistent Configuration
User preferences are stored locally using localStorage for persistence across sessions.

Theme System
Supports multiple color themes (green, blue, amber) with easy switching.

Responsive Layout
Optimized for both desktop and mobile devices.

Robust Error Handling
Provides clear feedback for invalid or failed command executions.

Clean Architecture
Structured, beginner-friendly codebase designed for scalability and maintainability.

Default Commands

help
Displays a list of all available commands.

about
Shows information about Arshux Terminal.

clear
Clears the terminal screen.

date
Displays the current date and time.

login
Simulates user authentication (demo mode).

logout
Ends the current session.

echo [text]
Returns the provided text as output.

theme [name]
Switches the terminal theme (green, blue, amber).

config
Displays current user configuration.

Project Structure

lib/cli/
types.ts — Core type definitions
config.ts — Configuration and persistence handling
commands.ts — Built-in command implementations
parser.ts — Command parsing and execution logic

components/
terminal.tsx — Main terminal interface
terminal-history.tsx — Command output history display
terminal-input.tsx — Input handling component

hooks/
use-terminal.ts — Terminal state and behavior management

app/
layout.tsx — Root layout configuration
page.tsx — Main application entry point
globals.css — Global styling

Getting Started

Install dependencies
pnpm install

Start development server
pnpm dev

Open application in browser after server starts

Adding Custom Commands

The system supports easy command extension.

Direct registry addition in parser.ts:

const commandRegistry = { mycommand: async (args) => [ { type: 'success', content: 'Command executed successfully' } ], };

Or using the helper function:

import { registerCommand } from '@/lib/cli/parser';

registerCommand('mycommand', async (args) => [ { type: 'success', content: 'Custom command output' } ]);

Configuration System

User preferences are automatically persisted in localStorage.

Stored fields include:

username — Active user identifier
isLoggedIn — Authentication state
theme — Selected UI theme
lastLogin — Timestamp of last session

Configuration can be reset via utility functions in lib/cli/config.ts.

Keyboard Shortcuts

Enter — Execute command
Arrow Up — Navigate previous commands
Arrow Down — Navigate next commands
Ctrl + C — Cancel input (browser-dependent support)

Customization Options

Default Theme Setup
Modify initial terminal theme in app/page.tsx:

<Terminal initialTheme="blue" />Adding a New Theme

1. Define color values in theme configuration


2. Extend theme mapping logic


3. Update type definitions in lib/cli/types.ts



Terminal Header
Header UI can be modified in components/terminal.tsx.

Browser Compatibility

Supports modern browsers:

Chrome / Edge 90+
Firefox 88+
Safari 14+
Mobile browsers (iOS / Android)

Performance Characteristics

Lightweight bundle (~50KB gzipped)
No external dependencies for core CLI logic
Optimized command parsing system
Efficient React-based rendering using hooks

Planned Enhancements

Command autocomplete system
Macro-based command execution
Virtual file system simulation
Network request emulation layer
Batch/script command support
UI-based theme configuration panel
Integrated command documentation system

License

MIT License

Contributing Guidelines

Ensure contributions follow these principles:

Maintain modular command structure
Preserve existing code patterns
Update documentation when required
Ensure mobile responsiveness
Keep implementations self-contained

Support

For issues or feature requests, open a repository issue or refer to existing documentation.