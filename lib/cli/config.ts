/**
 * Configuration management for arshux
 * Handles persistent user preferences stored in localStorage
 */

import { CliConfig } from './types';

const CONFIG_KEY = 'arshux_config';

const DEFAULT_CONFIG: CliConfig = {
  username: 'user',
  isLoggedIn: false,
  theme: 'green',
};

/**
 * Load configuration from localStorage
 */
export function loadConfig(): CliConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_CONFIG;
  }

  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        lastLogin: parsed.lastLogin ? new Date(parsed.lastLogin) : undefined,
      };
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }

  return DEFAULT_CONFIG;
}

/**
 * Save configuration to localStorage
 */
export function saveConfig(config: CliConfig): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save config:', error);
  }
}

/**
 * Update a specific config property
 */
export function updateConfig(updates: Partial<CliConfig>): CliConfig {
  const current = loadConfig();
  const updated = { ...current, ...updates };
  saveConfig(updated);
  return updated;
}

/**
 * Reset configuration to defaults
 */
export function resetConfig(): CliConfig {
  saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
}
