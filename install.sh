#!/bin/bash

# Arshux Terminal Installer for Termux/Linux
clear
echo -e "\e[1;33m"
echo "    _                 _                 "
echo "   / \   _ __ ___| |__  _   ___  __ "
echo "  / _ \ | '__/ __| '_ \| | | \ \/ / "
echo " / ___ \| |  \__ \ | | | |_| |>  <  "
echo "/_/   \_\_|  |___/_| |_|\__,_/_/\_\ "
echo -e "\e[0m"
echo -e "\e[1;32m[*] Starting Arshux Installation...\e[0m"

# Update and install dependencies
echo -e "\e[1;34m[*] Updating packages...\e[0m"
pkg update -y && pkg upgrade -y
pkg install python git -y

# Clone Repository
echo -e "\e[1;34m[*] Cloning Arshux from GitHub...\e[0m"
git clone https://github.com/ranag786tech-lang/Arshux-Terminal.git $HOME/Arshux-Terminal

# Setup Alias (taake 'arshux' likhne se tool khul jaye)
echo "alias arshux='python $HOME/Arshux-Terminal/main.py'" >> $HOME/.bashrc

echo -e "\e[1;32m[+] Installation Complete!\e[0m"
echo -e "\e[1;33m[!] Please restart Termux or type 'source ~/.bashrc'\e[0m"
echo -e "\e[1;36m[!] Type 'arshux' to launch your standalone environment.\e[0m"
