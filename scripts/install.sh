#!/bin/bash

version=$(grep -oP 'widget.*version="\K\d+\.\d+\.\d+' config.xml)

function spinner() {
  local pid=$!
  local spin='⣾⣽⣻⢿⡿⣟⣯⣷'

  local i=0
  local t="\t\t\t\t\t\t\t"

  while kill -0 $pid 2>/dev/null
  do
    i=$(( (i+1) %${#spin} ))
    printf "\r$t${spin:$i:1}\t"
    sleep .15
  done

  printf "\r$t✔\n"
}

function welcome () {
  printf "     _____ _             _                          \n"
  printf "    / ____| |           | |                         \n"
  printf "   | (___ | |_ __ _  ___| | __   __ _ _ __  _ __    \n"
  printf "    \___ \| __/ _\` |/ __| |/ /  / _\` | '_ \| '_ \ \n"
  printf "    ____) | || (_| | (__|   <  | (_| | |_) | |_) |  \n"
  printf "   |_____/ \__\__,_|\___|_|\_\  \__,_| .__/| .__/   $version\n"
  printf "                                     | |   | |      \n"
  printf "                                     |_|   |_|      \n\n"

  printf "✨ Welcome to the stack app installer ✨ \n\n"
  printf "  • Install all cli's needed and dependencies \n"
  printf "  • Fix audits, when needed \n"
  printf "  • Restore mobile resources \n"
  printf "  • Add support for android and ios \n\n"

  read -n 1 -s -r -p "Press any key to start"
}

function install() {
  printf "\n\n>\n> ✨ Starting installation ✨\n"
  printf "> Installing global cli's"
  npm i -g @angular/cli@^8.0.0 ionic@^5.0.0 cordova@^9.0.0 >/dev/null 2>&1 & spinner

  printf "> Installing dependencies"
  npm i >/dev/null 2>&1 & spinner

  printf "> Fixing audits, when needed"
  npm audit fix >/dev/null 2>&1 & spinner
}

function configure() {
  printf ">\n> ✨ Starting configuration ✨\n"
  printf "> Restoring resources"
  ionic cordova resources  >/dev/null 2>&1 & spinner

  printf "> Do you want to add the android  platform? [Y/n]"
  read -r -p " " response
  case "$response" in
      [nN]) ;;
      *)
        ionic cordova platform add android
        ;;
  esac

  printf "> Do you want to add the ios platform? [Y/n]"
  read -r -p " " response
  case "$response" in
      [nN]) ;;
      *)
        ionic cordova platform add ios
        ;;
  esac
}

# Start
welcome
install
configure


printf "\n\n> Done.\n"
