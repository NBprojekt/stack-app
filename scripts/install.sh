#!/bin/bash

echo "> Installing dependencies"
npm i

echo "> Restoring resources"
ionic cordova resources

echo ""
read -r -p "> Do you want to add the android  platform? [Y/n] " response
case "$response" in
    [nN]) ;;
    *)
      ionic cordova platform add android
      ;;
esac

echo ""
read -r -p "> Do you want to add the ios platform? [Y/n] " response
case "$response" in
    [nN]) ;;
    *)
      ionic cordova platform add ios
      ;;
esac

echo ""
echo "> Done."
