# arshux Quick Start Guide

Welcome to arshux! A retro terminal emulator with modern web technology.

## What You Get

✅ **Modular CLI System** - Easy to add new commands  
✅ **Retro Terminal UI** - Beautiful black background with green/blue/amber text  
✅ **Command History** - Navigate with arrow keys (↑/↓)  
✅ **Auto-Focus Input** - Terminal ready when page loads  
✅ **Persistent Config** - User preferences saved locally  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Well-Structured Code** - Beginner-friendly, easy to extend  

## First Steps

### 1. Run the App
```bash
pnpm dev
```
Open http://localhost:3000

### 2. Try Default Commands
```bash
help          # See all available commands
about         # Learn about arshux
date          # Check current date/time
echo hello    # Echo text
theme blue    # Switch to blue theme
clear         # Clear terminal screen
```

### 3. Explore the Code

The project is organized into clear modules:

```
lib/cli/
├── types.ts      # Type definitions
├── config.ts     # User preferences (localStorage)
├── commands.ts   # Command implementations
└── parser.ts     # Command parsing & execution

components/
├── terminal.tsx           # Main component
├── terminal-history.tsx   # History display
└── terminal-input.tsx     # Input field

hooks/
└── use-terminal.ts        # State management hook
```

## Add Your First Command

Want to add a custom command? It's easy!

### Option 1: Edit commands.ts

Add a new command function:
```typescript
// lib/cli/commands.ts
export const mycommand = async (args: string[]): Promise<CommandOutput[]> => {
  return [{ 
    type: 'success', 
    content: `Hello from my command! Args: ${args.join(', ')}`
  }];
};
```

Then register it in parser.ts:
```typescript
const commandRegistry = {
  mycommand: mycommand,
  // ... other commands
};
```

### Option 2: Use registerCommand

```typescript
import { registerCommand } from '@/lib/cli/parser';

registerCommand('greet', async (args) => [
  {
    type: 'success',
    content: `Hello ${args[0] || 'friend'}!`
  }
]);
```

## Change the Theme

Default themes: green, blue, amber

Switch via:
1. **Terminal command**: `theme blue`
2. **Code**: Edit `initialTheme` in `app/page.tsx`
3. **Colors**: Modify `themeColors` in `components/terminal-history.tsx`

## Key Features Explained

### Command History Navigation
- Press **↑** to go back through previous commands
- Press **↓** to go forward
- The input field updates automatically
- Type to search (modify parser for search functionality)

### Auto-Focus
The input field automatically focuses when the app loads, so you can start typing immediately.

### Error Handling
Invalid commands show helpful error messages:
```
arshux: command not found: xyz
Type 'help' to see available commands
```

### Persistent Storage
User preferences are stored in localStorage:
- Username
- Login status
- Theme preference
- Last login time

Clear with browser dev tools or reset config functions.

## Understanding the Flow

1. **User types command** → Handled by `terminal-input.tsx`
2. **Input submitted** → `Terminal.tsx` calls `handleCommandSubmit`
3. **parseInput()** → Splits command and arguments
4. **executeCommand()** → Finds and runs handler from registry
5. **Output returned** → Displayed via `terminal-history.tsx`
6. **History saved** → Added to state and localStorage if needed

## Mobile Responsiveness

The app is fully responsive:
- **Mobile**: Touch input, optimized text size, scrollable history
- **Tablet**: Medium padding and text
- **Desktop**: Full width, larger text, comfortable padding

Breakpoints used:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px

## Performance Tips

The CLI is lightweight because:
- ✨ No external CLI libraries - built from scratch
- ✨ Minimal dependencies - uses only Next.js & React
- ✨ Efficient parsing - simple string splitting
- ✨ Smart rendering - only updates changed parts

## Troubleshooting

**Input not focusing?**
- Check browser console for errors
- Ensure `inputRef.current?.focus()` is called in useEffect

**Commands not executing?**
- Verify command is registered in `commandRegistry`
- Check command name matches exactly (case-sensitive)
- Test in browser console: `await executeCommand('help', [])`

**Theme not changing?**
- Verify theme name: green, blue, or amber only
- Check `themeColors` object has the theme
- Theme persists via localStorage - clear if stuck

**History not showing?**
- Check browser console for errors
- Verify history state is updating
- Ensure `TerminalHistoryDisplay` receives entries

## What's Next?

Try these enhancements:
1. Add command autocomplete
2. Create a file system simulation
3. Build a game within the terminal
4. Add command macros
5. Create themed backgrounds
6. Add sound effects
7. Build authentication system

## Need Help?

1. Check the **README.md** for detailed documentation
2. Review code comments - they explain the logic
3. Use browser DevTools to debug
4. Check `console.log` in command handlers

## Tips for Extensions

**Modular Design:**
- Each command is independent
- Easy to add/remove commands
- No global state needed (except theme/config)

**Type Safety:**
- TypeScript ensures correct types
- Autocomplete helps development
- Catch errors early

**Testing:**
- Test commands directly: `parseInput("echo hello")`
- Test parsing separately from execution
- Verify history tracking

---

**Happy coding!** The arshux terminal is your playground. Start small, build incrementally, and have fun extending it!
