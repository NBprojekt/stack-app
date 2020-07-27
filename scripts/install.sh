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
  printf "   |_____/ \__\__,_|\___|_|\_\  \__,_| .__/| .__/   \n"
  printf "                                     | |   | |      \n"
  printf "      v$version\t\t\t     |_|   |_|                 \n\n"

  printf "✨ Welcome to the stack app installer ✨ \n\n"
  printf "  • Install all cli's needed and dependencies \n"
  printf "  • Restore mobile resources \n"
  printf "  • Add support for android and ios \n\n"

  read -n 1 -s -r -p "Press any key to start"
}

function install() {
  printf "\n\n\n> ✨ Starting installation ✨\n"
  printf "> Installing global cli's"
  npm i -g @angular/cli@^9.0.0 ionic@^5.0.0 cordova@^9.0.0 >/dev/null 2>&1 & spinner

  printf "> Installing dependencies"
  npm i >/dev/null 2>&1 & spinner
}

function configure() {
  printf "\n> ✨ Starting configuration ✨\n"
  printf "> Restoring resources"
  ionic cordova resources  >/dev/null 2>&1 & spinner

  printf "> Do you want to add the android  platform? [Y/n]"
  read -r -p " " response
  case "$response" in
      [nN])
        printf "> Skipped adding android platform\n"
        ;;
      *)
        printf "> Adding android platform"
        ionic cordova platform add android >/dev/null 2>&1 & spinner
        ;;
  esac

  printf "\n> Do you want to add the ios platform? [Y/n]"
  read -r -p " " response
  case "$response" in
      [nN])
        printf "> Skipped adding ios platform\n"
        ;;
      *)
        printf "> Adding ios platform"
        ionic cordova platform add ios >/dev/null 2>&1 & spinner
        ;;
  esac
}

# Start
welcome
install
configure

printf "\n\n> Done.\n"
