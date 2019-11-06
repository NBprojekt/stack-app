#!/bin/bash

ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../project_files/apkKey.jks ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk stack-app

zipalign -v 4 ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../platforms/android/app/build/outputs/apk/release/stack-app.apk

apksigner verify ../platforms/android/app/build/outputs/apk/release/stack-app.apk
