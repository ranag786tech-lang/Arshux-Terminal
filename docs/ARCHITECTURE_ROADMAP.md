# Arshux Omni staged architecture roadmap

## Target architecture

```text
PWA client (this repository)
  ├─ terminal parser, editor, IndexedDB workspace, Pyodide
  ├─ GitHub public API browser/import adapter
  └─ AI client contract
                 │ HTTPS / WebSocket
                 ▼
Omni control plane (Next.js + API routes or dedicated service)
  ├─ authenticated AI provider proxy and policy/audit layer
  ├─ GitHub OAuth/token vault and Git provider adapter
  ├─ workspace/project metadata service
  └─ WebSocket session broker
                 │
                 ▼
Isolated execution plane
  ├─ per-user ephemeral Linux containers / microVMs
  ├─ real shell, Python, package installation, and Git
  ├─ SSH gateway using short-lived certificates
  └─ object storage + encrypted persistent volumes
```

## Stage 0 — truthful browser workspace (implemented)

* Persistent virtual filesystem in IndexedDB, editor, file import/download, and supported File System Access import.
* Persistent Pyodide Python session with captured stdout/stderr.
* Public GitHub repository import and commit-log browsing through the GitHub REST API.
* Explicit AI endpoint contract and deterministic offline fallback guidance.
* Explicit browser-package simulation rather than claims of native package installation.

## Stage 1 — product foundation

1. Migrate the static shell into a Next.js application shell with typed command modules and automated Playwright tests.
2. Add account authentication, workspace/project metadata, encrypted backup/export, and GitHub OAuth.
3. Add a GitHub repository browser with lazy tree loading, branch selection, rate-limit UX, and authenticated imports.
4. Define a versioned command protocol and telemetry/privacy controls.

## Stage 2 — AI developer workflows

1. Deploy an authenticated server-side AI proxy; never ship provider keys to the PWA.
2. Add provider adapters, streaming responses, consented workspace context, redaction, quotas, and audit records.
3. Implement `ai explain`, `ai code`, and `ai summarize` with structured outputs and patch review before writes.

## Stage 3 — real execution and Git

1. Broker WebSocket sessions to isolated containers/microVMs, with strict CPU, memory, egress, filesystem, and lifetime limits.
2. Mount each workspace into the isolated session and expose a real PTY for interactive shells.
3. Run real Python, package managers, language servers, test tools, and native Git inside the isolated environment.
4. Use GitHub App/OAuth credentials held only by the control plane for clone, branch, commit, and pull-request operations.

## Stage 4 — secure remote access

1. Add an SSH bastion that issues short-lived user certificates after strong authentication.
2. Do not expose arbitrary SSH from browser JavaScript; use the gateway plus WebSocket-to-PTY for web terminal access.
3. Add host allowlists, session recording with consent, command policy, secret scanning, and revocation.

## Acceptance gates

Every stage must include mobile touch/keyboard testing, accessibility testing, CSP/SRI review, offline behavior tests, data export tests, and threat modeling before release.
