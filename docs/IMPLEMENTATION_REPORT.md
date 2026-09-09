# Arshux Omni implementation report

This change turns the existing static PWA into a more honest, useful browser developer workspace while preserving its zero-build deployment model.

## Implemented now

* Filesystem: `cp`, `mv`, `mkdir -p`, protected workspace deletion, persistence, text editor, upload, download, and File System Access API directory import.
* Python: a real Pyodide session that retains variables between commands and routes Python stdout/stderr to terminal output.
* GitHub: `git clone owner/repo` imports bounded public repository text files into the local workspace; `git log owner/repo` reads commit history; `git repos` lists imports.
* AI: `ai help`, `ai explain`, `ai code`, `ai summarize`, and `ai config` provide a safe client contract. Configured endpoints receive `{ action, prompt }`; credentials remain a backend responsibility.
* Developer UX: every production command appears in `help`, has per-command usage, and returns action/error output. `pkg` is labelled simulation rather than a false native package manager claim.

## Deliberately not claimed as browser capabilities

* Native interactive shell sessions and process execution.
* Real `git clone`, commits, branches, or credentialed pushes.
* SSH connections.
* Native package installation.
* Private GitHub access or secure AI provider credentials.

Those require the control-plane/execution-plane design in `ARCHITECTURE_ROADMAP.md`.
