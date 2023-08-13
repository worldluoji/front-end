# platform specific code
React Native provides two ways to organize your code and separate it by platform:
- Using the Platform module.
- Using platform-specific file extensions.

## Platform module
Platform.OS
```
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```
Platform.select
```
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

## Android Version
```
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```
Version is set to the Android API version not the Android OS version. To find a mapping please refer to:
https://en.wikipedia.org/wiki/Android_version_history#Overview

## IOS Version
```
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

## Platform-specific extensions
For example, say you have the following files in your project:
```
BigButton.ios.js
BigButton.android.js
```
You can then import the component as follows:
```
import BigButton from './BigButton';
```
React Native will automatically pick up the right file based on the running platform.

```
Container.js # picked up by Webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

## reference
- https://reactnative.dev/docs/platform-specific-code