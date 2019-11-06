#!/bin/bash

os=android

while [ "$1" != "" ]; do
  case $1 in
    -a | --android ) os=android ;;
    -i | --ios ) os=ios ;;
  esac
  shift
done

ionic cordova build $os --prod
