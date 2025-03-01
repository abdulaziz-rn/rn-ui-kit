# React Native SanarKit SDK

## Installation Guide

### Install the React Native SanarKit SDK
Run the following command to install the SDK:

```sh
npm install https://github.com/abdulaziz-rn/rn-ui-kit.git
# or using yarn
yarn add https://github.com/abdulaziz-rn/rn-ui-kit.git
```

### SanarKit SDK Dependencies Installation

The SanarKit SDK requires several peer dependencies to be installed in your project. These dependencies will be automatically installed when you run the setup script.

Create a Sanar config file `sanar.config.js` in your project root directory and copy the snippet below:

```javascript
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Checking dependencies setup...');

// Read the package.json files
const mainPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const uiKitPackageJson = JSON.parse(fs.readFileSync('./node_modules/react-native-sanarkit/package.json', 'utf8'));

// Get peer dependencies from react-native-sanarkit
const peerDeps = uiKitPackageJson.peerDependencies || {};

// Track if any new dependencies were installed
let installedNewDependencies = false;

// Check and install missing peer dependencies
for (const [pkg, version] of Object.entries(peerDeps)) {
  // Skip React and React Native checks
  if (pkg === 'react' || pkg === 'react-native') continue;
  
  if (!mainPackageJson.dependencies[pkg]) {
    console.log(`📦 Installing peer dependency: ${pkg}@${version}`);
    execSync(`npm install ${pkg}@${version}`, { stdio: 'inherit' });
    installedNewDependencies = true;
  } else {
    console.log(`✅ ${pkg} is already installed`);
  }
}

// Run pod install for iOS only if new dependencies were installed
if (process.platform === 'darwin' && installedNewDependencies) {
  console.log('🔄 Installing iOS pods due to new dependencies...');
  execSync('cd ios && pod install', { stdio: 'inherit' });
} else if (process.platform === 'darwin') {
  console.log('✅ No new dependencies - skipping pod install');
}

console.log('✨ Setup completed successfully!');
```

### Add Setup to `package.json`
Add the following to your `package.json` file:

```json
"scripts": {
  "sanar:setup": "node ./sanar.config.js"
}
```

### Install Peer Dependencies
Run the following command to automatically install all required peer dependencies:

```sh
npm run sanar:setup
# or using yarn
yarn sanar:setup
```

> **Note**: Make sure you have Node.js version 16 or higher installed.

### Manual Installation
If you prefer to install dependencies manually, here are the required peer dependencies:
```json
{
  "react-native-device-info": "^3.0.0",
  "react-native-webview": "^13.0.0",
  "react-native-agora": "^4.5.1",
  // Other dependencies will be listed here based on the current version
}
```

### This Script Will:
- Check for missing peer dependencies
- Install any missing dependencies automatically
- Run `pod install` for iOS projects if new dependencies were added

## Troubleshooting

### iOS Issues
If you encounter any issues with iOS, try the following:
1. Clean the build folder:
   ```sh
   cd ios && rm -rf build/
   ```
2. Remove Pods:
   ```sh
   cd ios && rm -rf Pods && rm -rf Podfile.lock
   ```
3. Reinstall pods:
   ```sh
   cd ios && pod install
   ```
4. If issues persist, try clearing the Metro bundler cache:
   ```sh
   npm start -- --reset-cache
   # or
   yarn start -- --reset-cache
   ```

### Android Issues
If you encounter any issues with Android, try the following:
1. Clean the gradle build:
   ```sh
   cd android && ./gradlew clean
   ```
2. Rebuild the project in Android Studio

## Support
For any issues or questions, please visit our [GitHub repository](https://github.com/abdulaziz-rn/rn-ui-kit).

## License
This project is licensed under the MIT License - see the LICENSE file for details.
