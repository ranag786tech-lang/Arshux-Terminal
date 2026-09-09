# Arshux Omni repository audit

**Audit date:** 2026-09-09  
**Scope:** every tracked application source file, manifest, service worker, documentation, icons, and screenshots in this repository.

## Current implementation classification

| Area | Status before this change | Evidence and finding |
| --- | --- | --- |
| PWA shell | Fully implemented | Manifest, install icons, offline service worker, responsive static shell were present. |
| Terminal sessions and input | Partially implemented | Multiple tabs, history, special keys, aliases, and completion existed; tabs cannot yet be closed/renamed and shell grammar is intentionally not POSIX. |
| Virtual filesystem | Partially implemented | IndexedDB persistence plus `ls`, `cd`, `pwd`, `mkdir`, `touch`, `cat`, `write`, `rm`, and `tree` existed. `cp`, `mv`, editing, import/export, and File System Access were missing. |
| Python | Partially implemented | `python3` dynamically loaded Pyodide but did not capture `print()` output or document its runtime limitations. |
| Git/GitHub | Missing | No source or command integration was present. |
| AI | Missing | No command, interface, endpoint contract, or security model was present. |
| Package manager | Missing | No package command or explicit simulation boundary was present. |
| SSH/native shell | Missing by browser constraint | A static browser page cannot create arbitrary TCP/SSH connections, spawn processes, or access the host filesystem. |
| Portfolio/fun output | Demo-only | Portfolio and novelty commands remain presentation content; they are not developer-environment features. |

## Constraints discovered

This is a dependency-free static web app, not a Next.js application. There is no `package.json`, build pipeline, server runtime, authentication model, test runner, or backend. Therefore direct system-shell execution, native Git, secure provider API keys, and SSH must be implemented through a separately deployed backend rather than simulated as real local capabilities.

## Risk notes

* Public GitHub API requests work only for public repositories and are subject to unauthenticated rate limits.
* Pyodide requires a network download the first time it is used and cannot run native extension modules or host processes.
* Browser persistence can be cleared by the user/browser and is not a substitute for a versioned project workspace.
