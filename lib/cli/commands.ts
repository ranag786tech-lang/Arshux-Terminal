import { CommandOutput } from './types';

export const whoami = async (): Promise<CommandOutput[]> => [
  { type: 'success', content: '┌── USER: Rana Hamza (Aaron)' },
  { type: 'info', content: '│ ROLE: Developer & ML Student' },
  { type: 'info', content: '│ BASE: Faisalabad, Pakistan' },
  { type: 'info', content: '└───────────────────────────' }
];

export const projects = async (): Promise<CommandOutput[]> => [
  { type: 'success', content: '--- ACTIVE PROJECTS ---' },
  { type: 'info', content: '> Neon Drift (Gravity Racing Game)' },
  { type: 'info', content: '> DigiD Universe (Digital Hub)' },
  { type: 'info', content: '> Inkwell (Notes/Diary App)' }
];
