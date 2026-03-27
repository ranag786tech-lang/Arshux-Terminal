# arshux - Terminal Emulator

A lightweight, modular CLI terminal emulator built with Next.js and React. Combines retro aesthetics with modern web technology.

## Features

- **Retro Terminal UI**: Classic black background with neon green/blue/amber text
- **Command System**: Modular command handlers for easy extension
- **Command History**: Navigate previous commands using arrow keys (↑/↓)
- **Auto-focus**: Input field automatically focuses when terminal loads
- **Persistent Config**: User preferences stored in localStorage
- **Theme Support**: Switch between green, blue, and amber color schemes
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Error Handling**: Proper error messages for invalid commands
- **Clean Code**: Well-structured, beginner-friendly codebase

## Default Commands

- **help** - Display available commands
- **about** - Information about arshux
- **clear** - Clear terminal screen
- **date** - Show current date and time
- **login** - Authenticate (demo purposes)
- **logout** - End session
- **echo [text]** - Echo text back
- **theme [name]** - Switch theme (green, blue, amber)
- **config** - Show current configuration

## Project Structure

```
├── lib/cli/
│   ├── types.ts           # Core type definitions
│   ├── config.ts          # Configuration management
│   ├── commands.ts        # Command implementations
│   └── parser.ts          # Command parsing and execution
├── components/
│   ├── terminal.tsx       # Main terminal component
│   ├── terminal-history.tsx  # Command history display
│   └── terminal-input.tsx    # Input field component
├── hooks/
│   └── use-terminal.ts    # Terminal state management hook
└── app/
    ├── layout.tsx         # Root layout
    ├── page.tsx           # Main page
    └── globals.css        # Global styles
```

## Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   pnpm dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## Adding Custom Commands

The command system is modular and easy to extend:

```typescript
// In lib/cli/parser.ts, add your command to the registry:

const commandRegistry: Record<string, ...> = {
  mycommand: async (args) => [
    { type: 'success', content: 'Command executed!' }
  ],
  // ... other commands
};
```

Or use the `registerCommand` function:

```typescript
import { registerCommand } from '@/lib/cli/parser';

registerCommand('mycommand', async (args) => [
  { type: 'success', content: 'My custom output' }
]);
```

## Configuration

User preferences are automatically saved to localStorage:

- **username**: Current user name
- **isLoggedIn**: Authentication status
- **theme**: Color theme preference
- **lastLogin**: Last login timestamp

Reset config with the config management functions in `lib/cli/config.ts`.

## Keyboard Shortcuts

- **Enter** - Execute command
- **Arrow Up** - Previous command in history
- **Arrow Down** - Next command in history
- **Ctrl+C** - Cancel input (browser support varies)

## Customization

### Change Default Theme
Edit `Terminal` component initialization in `app/page.tsx`:
```typescript
<Terminal initialTheme="blue" />
```

### Add New Color Scheme
1. Add theme colors to `themeColors` in components
2. Add theme case to color definitions
3. Update type definitions in `lib/cli/types.ts`

### Modify Terminal Header
Edit the header section in `components/terminal.tsx`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Lightweight (~50KB gzipped)
- No external dependencies for core CLI logic
- Efficient command parsing and execution
- Optimized rendering with React hooks

## Future Enhancements

- Command autocomplete
- Custom command macros
- File system simulation
- Network request simulation
- Script/batch command support
- Themes configuration UI
- Command documentation system

## License

MIT

## Contributing

Contributions welcome! Please ensure:
- Code follows existing patterns
- Commands are modular and self-contained
- Documentation is updated
- Mobile responsiveness is maintained

## Support

For issues or questions, create an issue in the repository or check the documentation above.

---

Built with ❤️ using Next.js, React, and TypeScript
