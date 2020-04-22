## Scripts

Overview of all available scripts and options.

 + [Install](#install)
 + [Start](#start)
 + [Test](#test)
 + [Lint](#lint)
 + [Build](#build)
 + [Emulate](#emulate)
 + [Debug](#debug)
 + [Sign](#sign)


### Install
If you just cloned this repository run this command. It will install all dependencies and configure cordova.  
You have also the option to add platforms Android and iOS.

> Note: [Ionic][1] and [Cordova][2] get installed globaly
```
  npm run installation
```
 
### Start
Starts up ionic on `localhost:8100` and opens a new browser tab with the application.
```
npm start
```

### Test
Start angular karma unit test.

```
npm test
```

### Lint
Start linting according to your `tslint.json`.

```
npm run lint
```

### Build
Build the app for `-a` Android (default) or `-i` iOS.  
Outputfile can be found in `./platforms/android/app/build/outputs/apk/debug/`.

```
npm run build -- -a
```

### Emulate
Emulate the app for `-a` Android (default) or `-i` iOS on a virtual device.  
Also livereload is anabled and logs are displayed in the console.

```
  npm run emulate -- -a
```

### Debug
just like the [emulate](#emulate) command only that it runs on a real device.  
Also livereload is anabled and logs are displayed in the console.

```
npm run debug -- -a
```

### Sign
Automatically  building and signing an APK with a given key.  
Outputfile can be found in `./platforms/android/app/build/outputs/apk/release/stack-app.apk`.

```
npm run sign -- myKey
```


[1]: https://www.npmjs.com/package/ionic
[2]: https://www.npmjs.com/package/cordova
