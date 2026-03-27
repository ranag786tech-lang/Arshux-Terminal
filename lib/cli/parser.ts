import * as commands from './commands';
import { CommandOutput } from './types';

const COMMAND_REGISTRY: Record<string, { desc: string; usage: string }> = {
  help: { desc: 'View all available commands', usage: 'help [command]' },
  whoami: { desc: 'Display user identification', usage: 'whoami' },
  projects: { desc: 'View active DigiD projects', usage: 'projects' },
  theme: { desc: 'Change terminal colors', usage: 'theme [green|blue|amber]' },
  clear: { desc: 'Clear the terminal screen', usage: 'clear' },
};

const getSuggestion = (input: string): string | null => {
  const cmds = Object.keys(COMMAND_REGISTRY);
  let bestMatch = null;
  let minDistance = 3;
  cmds.forEach(cmd => {
    const distance = Math.abs(cmd.length - input.length);
    if (cmd.startsWith(input.substring(0, 2)) && distance < minDistance) {
      bestMatch = cmd;
    }
  });
  return bestMatch;
};

const handleHelp = (args: string[]): string => {
  if (args.length > 0 && COMMAND_REGISTRY[args[0]]) {
    const cmd = COMMAND_REGISTRY[args[0]];
    return `\nHELP: ${args[0].toUpperCase()}\nUsage       : ${cmd.usage}\nDescription : ${cmd.desc}\n`;
  }
  let output = "\nAVAILABLE COMMANDS:\n";
  Object.keys(COMMAND_REGISTRY).forEach(key => {
    output += `➜ ${key.padEnd(12)} : ${COMMAND_REGISTRY[key].desc}\n`;
  });
  output += "\nTip: Type 'help [command]' for more info.\n";
  return output;
};

export const executeCommand = async (command: string, args: string[]): Promise<CommandOutput[]> => {
  const cmd = command.toLowerCase();
  if (cmd === 'help') return [{ type: 'info', content: handleHelp(args) }];
  if (commands[cmd as keyof typeof commands]) {
    return await (commands[cmd as keyof typeof commands] as Function)(args);
  }
  const suggestion = getSuggestion(cmd);
  const errorMsg = suggestion ? `Command not found. Did you mean: '${suggestion}'?` : `Unknown command: '${cmd}'. Type 'help' for assistance.`;
  return [{ type: 'error', content: errorMsg }];
};
