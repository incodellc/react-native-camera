import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from '~containers/Core/navigation/Navigation';
import {
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Alert} from 'react-native';

function App(): JSX.Element {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<PermissionStatus | null>(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const permissionStatus = await request(PERMISSIONS.IOS.CAMERA);

    setCameraPermissionStatus(permissionStatus);
  };

  const requestCameraPermission = async () => {
    const permissionStatus = await request(PERMISSIONS.IOS.CAMERA);

    if (permissionStatus === RESULTS.GRANTED) {
      Alert.alert('Permission Granted', 'You can now use the camera.');
    } else {
      Alert.alert('Permission Denied', 'Camera permission denied.');
    }
  };

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
