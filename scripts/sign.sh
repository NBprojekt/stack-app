#!/bin/bash

if [ -z "$1" ]
then
  echo "> App key not found."
  exit 0
fi

ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $1 ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk stack-app

zipalign -v 4 ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../platforms/android/app/build/outputs/apk/release/stack-app.apk

apksigner verify ../platforms/android/app/build/outputs/apk/release/stack-app.apk

echo ""
echo "> Done."
