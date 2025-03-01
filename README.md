# SanarKit: react-native-sanarkit

A React Native library for integrating Sanar Services seamlessly into your application.

## Features
- **SanarKit**: Core SDK for authentication and session management.
- **SKConsultation**: Module for chat-based teleconsultation.

For complete integration, refer to our [Installation Guide](#).

## Installation

### iOS
To enable camera and microphone usage, add the following entries to your `Info.plist` file:

```xml
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>
```

### Android
To enable camera and microphone usage, add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
<uses-feature android:name="android.hardware.microphone" android:required="false" />
```

## Initialization
Before using any Sanar SDK features, initialize the SDK by setting up required configurations to ensure communication with Sanar Services.

## SanarKit Implementation

### Connect
The `connect` method is used for authentication and session creation with Sanar Services.

#### Usage
```javascript
import { SanarKit } from 'react-native-sanarkit';

SanarKit.connect(
  cid: <sanar-client-access-token>,
  info: <UserInfo>,
  lang: <string>
);
```

#### Parameters
- `cid` (String): Client ID provided by Sanar.
- `info` (Object): User details required for session creation.
- `lang` (String, optional): Language preference (default: English).

#### UserInfo Format
```javascript
const userInfo = {
  first_name: "John",
  last_name: "Doe",
  dob: "1990-01-01",
  gender: "M",
  nationality: "Saudi Arabia",
  document_id: "2469433220",
  mid: "MG2",
  document_type: 1,
  phone_code: "91",
  phone_no: "81794771111",
  maritalStatus: "0"
};
```

### Disconnect
To terminate the session when it's no longer needed, use the `disconnect` method:
```javascript
SanarKit.disconnect();
```

## SKConsultation Implementation
`SKConsultation` is a chat-based teleconsultation module, providing real-time communication for users and medical professionals.

#### Usage
```javascript
import { SKConsultation } from 'react-native-sanarkit';

<SKConsultation
  enable={isConsultationEnable} 
  appointmentId={appId} 
  empId={docId}
  onEndFlow={() => setIsConsultationEnable(false)}
/>
```

#### Parameters
- `enable` (Boolean): Controls whether consultation module is active.
- `appointmentId` (String): Unique id for the appointment.
- `empId` (String): ID of the consulting Doctor.
- `onEndFlow` (Function): Callback triggered when consultation module is closed / ends on back button.

## Removing SanarKit
Follow the [Deintegration Guide](#) to remove SanarKit from your project.

## Example Repository
For detailed implementation and usage, check the [Example Repository](#).
