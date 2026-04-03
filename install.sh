#!/bin/bash
# ====================================================
# Arshux-Terminal Installer
# Created by: ranag786tech-lang
# ====================================================

echo -e "\e[1;32m[+] Installing Arshux-Terminal...\e[0m"

# Update and install python if not present
pkg update -y && pkg upgrade -y
pkg install python -y

# Download the main script from your repo
curl -L -o ~/mobile_cli_tool.py https://raw.githubusercontent.com/ranag786tech-lang/Arshux-Terminal/main/mobile_cli_tool.py

# Create a shortcut alias
echo "alias arshux='python3 ~/mobile_cli_tool.py'" >> ~/.bashrc

# Finish
echo -e "\e[1;34m[!] Installation Complete!\e[0m"
echo -e "\e[1;33m[!] Type 'source ~/.bashrc' then 'arshux' to start the tool.\e[0m"
