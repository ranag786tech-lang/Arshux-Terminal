<div align="center">

<img src="icons/icon-512.png" width="120" alt="ArshUX Logo"/>

# ⚡ ArshUX Terminal

### *A fully-featured Terminal Emulator PWA — built for the web, feels like native.*

[![PWA](https://img.shields.io/badge/PWA-Ready-00ffe7?style=for-the-badge&logo=googlechrome&logoColor=black)](https://github.com/arsh/arshux-terminal)
[![Offline](https://img.shields.io/badge/Offline-Supported-bf00ff?style=for-the-badge&logo=serviceworker&logoColor=white)](#)
[![IndexedDB](https://img.shields.io/badge/Storage-IndexedDB-ffb300?style=for-the-badge&logo=databricks&logoColor=black)](#)
[![No Backend](https://img.shields.io/badge/Backend-None-00ff41?style=for-the-badge&logo=serverless&logoColor=black)](#)
[![License](https://img.shields.io/badge/License-MIT-ff006e?style=for-the-badge)](#license)

<br/>

> **ArshUX Terminal** is a zero-dependency, fully offline-capable terminal emulator  
> that runs in your browser — with persistent file storage, 100+ commands, multi-tab
> support, a built-in file editor, and a gorgeous neon dark UI.

<br/>

**[🚀 Live Demo](#) &nbsp;·&nbsp; [📱 Install as App](#installation) &nbsp;·&nbsp; [🐛 Report Bug](../../issues) &nbsp;·&nbsp; [✨ Request Feature](../../issues)**

<br/>

![ArshUX Terminal Screenshot](screenshots/screen1.png)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Commands](#-commands)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation as PWA](#-installation-as-pwa)
- [File Structure](#-file-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 About

ArshUX Terminal started as a weekend experiment —  
*"Can a real terminal emulator live entirely in the browser?"*

The answer is **yes.** No Node.js server. No backend. No root access needed.  
Just a single HTML file, a Service Worker, and IndexedDB doing the heavy lifting.

It simulates a full Linux-like environment inside your browser tab, complete with:
- A **persistent virtual filesystem** that survives page refreshes
- A **safe math parser** (zero `eval` — security first)
- **80+ shell commands** with pipe, redirect, and command chaining
- A **built-in nano-style file editor**
- Full **PWA support** — install it like a native app

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗂 **Persistent VFS** | Virtual filesystem backed by IndexedDB — files survive refresh |
| 📑 **Multi-Tab** | Open multiple terminal sessions with `Ctrl+T` |
| ⌨️ **Autocomplete** | Tab-completion for commands and file paths |
| 🔼 **Command History** | Navigate with `↑` `↓` arrow keys |
| ✏️ **Built-in Editor** | `nano file.txt` — full editor with `Ctrl+S` to save |
| 🔗 **Pipe & Redirect** | `ls \| grep txt`, `echo hi > file.txt`, `cat a >> b` |
| 🔗 **Command Chaining** | `mkdir foo && cd foo && touch main.js` |
| 🛡 **No eval** | Safe recursive-descent math parser — zero security risk |
| 📴 **Offline Mode** | Service Worker caches everything — works with no internet |
| 🎨 **Neon Dark UI** | CRT scanlines, neon glow, monospace font — pure hacker aesthetic |
| 📱 **Mobile Friendly** | Special keys bar: Ctrl+C, Tab, arrows, `\|`, `>`, `&&` and more |
| 🌗 **Theme Toggle** | Switch between dark neon and light mode |

---

## 💻 Commands

ArshUX supports **100+ commands** across 10 categories:

<details>
<summary><b>📁 Navigation & Files</b></summary>

```
cd        pwd       ls        ls -la    tree
pushd     popd      find      mkdir     touch
rm        rm -r     cp        mv        ln
diff      wc        head      tail      cat
```
</details>

<details>
<summary><b>📝 Text Processing</b></summary>

```
echo      printf    grep      grep -i   sed
sort      sort -r   uniq      cut       tr
tee       xargs     base64    md5sum
```
</details>

<details>
<summary><b>🖥 System Info</b></summary>

```
ps        top       htop      kill      jobs
df        df -h     du        free      uname -a
uptime    date      cal       mount     lsof
whoami    hostname  id        strace    chmod
```
</details>

<details>
<summary><b>🌐 Network</b></summary>

```
ping      ping -c 4   curl      wget
ifconfig  ip          netstat   nslookup  ssh
```
</details>

<details>
<summary><b>📦 Package Management</b></summary>

```
pkg install <name>    pkg remove <name>
pkg list              pkg search <query>
apt   apt-get   npm   pip
```
</details>

<details>
<summary><b>🔧 Dev Tools</b></summary>

```
git init    git status    git add     git commit
git push    git pull      git log     git branch
python3     node          which       man
time        source        bc          expr
```
</details>

<details>
<summary><b>✏️ Editor</b></summary>

```
nano <file>    vim <file>    vi <file>
```
> Inside editor: `Ctrl+S` = Save, `Esc` = Close, `Tab` = indent
</details>

<details>
<summary><b>🎉 Fun</b></summary>

```
cowsay      fortune     sl        banner
matrix      lolcat      figlet    yes
```
</details>

<details>
<summary><b>🔀 Shell Features</b></summary>

```bash
# Pipe
ls | grep txt
cat file.txt | grep error | sort | uniq

# Redirect
echo "hello" > file.txt
echo "world" >> file.txt

# Command chaining
mkdir project && cd project && touch index.js

# Math
echo "3 * 7 + 2" | bc
expr 100 / 4

# Environment
export NAME=arsh
alias ll="ls -la"
```
</details>

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│              ArshUX Terminal v4.0 Pro                   │
├────────────────┬────────────────────────────────────┤
│  Layer         │  Technology                        │
├────────────────┼────────────────────────────────────┤
│  UI            │  Vanilla HTML + CSS (no framework) │
│  Logic         │  Vanilla JavaScript (ES2022)       │
│  Storage       │  IndexedDB (via custom DB module)  │
│  Offline       │  Service Worker (Cache-First)      │
│  Math Parser   │  Custom recursive descent (no eval)│
│  PWA           │  Web App Manifest + SW             │
│  Icons         │  Custom generated from logo        │
│  Dependencies  │  ZERO — not even npm               │
└────────────────┴────────────────────────────────────┘
```

**No React. No Vue. No npm. No build step. Just open `index.html`.**

---

## 🚀 Getting Started

### Option A — Direct (No Server Needed)

```bash
# 1. Clone the repo
git clone https://github.com/arsh/arshux-terminal.git

# 2. Open in browser
cd arshux-terminal
open index.html   # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

> ⚠️ Service Worker requires HTTPS or `localhost` — use Option B for full PWA features.

---

### Option B — Local Server (Recommended)

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Then open → `http://localhost:8080`

---

### Option C — GitHub Pages (One Click Deploy)

```
1. Fork this repo
2. Settings → Pages → Source: main branch / root
3. Visit: https://yourusername.github.io/arshux-terminal
```

---

## 📱 Installation as PWA

### Android (Chrome)
```
1. Open site in Chrome
2. Tap ⋮ menu → "Add to Home Screen"
3. Tap "Install"
4. ArshUX appears on your home screen like a native app ✓
```

### Desktop (Chrome / Edge)
```
1. Open site
2. Click ⊕ icon in address bar
3. Click "Install"
4. ArshUX opens in its own window ✓
```

### iOS (Safari)
```
1. Open site in Safari
2. Tap Share button → "Add to Home Screen"
3. Tap "Add"
```

---

## 📁 File Structure

```
arshux-terminal/
│
├── index.html              # 🏠 Main app — entire terminal lives here
├── manifest.json           # 📋 PWA manifest
├── sw.js                   # ⚙️  Service Worker — offline + caching
├── offline.html            # 📴 Offline fallback page
│
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png        # ← maskable (Android adaptive icon)
│   ├── icon-384.png
│   └── icon-512.png        # ← maskable
│
├── screenshots/
│   └── screen1.png         # Play Store / App Store style screenshot
│
└── README.md               # 📖 You are here
```

---

## 🗺 Roadmap

```
✅ Phase 1 — Stability (DONE)
   ✓ Persistent VFS with IndexedDB
   ✓ Modular JS architecture
   ✓ Safe math parser (no eval)
   ✓ PWA manifest + Service Worker
   ✓ 100+ commands
   ✓ Multi-tab, editor, autocomplete

🔄 Phase 2 — Real Power (DONE)
   ✓ Pyodide integration (Real Python) (real bash via StackBlitz SDK)
   ✓ Real Git execution (isomorphic-git)
   ○ File upload / download from VFS
   ○ Split-screen terminal panes
   ○ Theme presets (Dracula, Solarized, Nord)
   ○ Command aliases config file

☁️ Phase 3 — SaaS / Cloud (Future)
   ○ Google OAuth login
   ○ Cloud VFS sync (Firebase / Supabase)
   ○ Shareable terminal sessions
   ○ Collaborative terminals (pair programming)
   ○ Deploy as Web App + Android App (TWA)
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request
```

### Ways to contribute
- 🐛 **Bug reports** — open an [issue](../../issues)
- ✨ **New commands** — add to the `Cmds` map in `index.html`
- 🎨 **Themes** — add CSS variables for new color schemes
- 📖 **Docs** — improve this README or add a wiki

---

## 📄 License

```
MIT License

Copyright (c) 2025 Arsh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software — to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute.
```

---

<div align="center">

**Built with ❤️ and a lot of `console.log` debugging**

⭐ **Star this repo if it helped you!** ⭐

<br/>

[![GitHub stars](https://img.shields.io/github/stars/arsh/arshux-terminal?style=social)](../../stargazers)
[![GitHub forks](https://img.shields.io/github/forks/arsh/arshux-terminal?style=social)](../../forks)

<br/>

*ArshUX Terminal — Where the web meets the shell.*

</div>
