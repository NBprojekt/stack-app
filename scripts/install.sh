#!/bin/bash

cd ..

echo "> Installing dependencies"
npm i

echo "> Restoring project"
ionic state restore

read -r -p "> Do you want to add the android  platform? [Y/n] " response
case "$response" in
    [nN])
      exit
      ;;
    *)
      ionic cordova platform add android
      ;;
esac

read -r -p "> Do you want to add the ios platform? [Y/n] " response
case "$response" in
    [nN])
      exit
      ;;
    *)
      ionic cordova platform add ios
      ;;
esac

echo "> Restoring resources"
ionic resources

echo "> Done."
