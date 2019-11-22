#!/bin/bash

os=android

while [ "$1" != "" ]; do
  case $1 in
    -a | --android ) os=android ;;
    -i | --ios ) os=ios ;;
  esac
  shift
done

ionic cordova run $os --list && ionic cordova run $os --device --livereload --consolelogs
