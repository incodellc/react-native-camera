import React, {useCallback, useRef, useState} from 'react';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TakePhoto} from '~assets/icons';
import styles from '~components/Camera/styles';
import {PhotoEditor} from '~components/PhotoEditor';

const CameraComponent = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<PhotoFile>();

  const handleTakePhoto = useCallback(async () => {
    const newPhoto = await camera.current?.takePhoto({});
    setPhoto(newPhoto);
  }, []);

  console.log(photo);

  const handleDiscardPhoto = () => {
    setPhoto(undefined);
  };

  console.log(photo?.path.split('/')[photo?.path.split('/').length - 1]);

  if (device == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      {photo ? (
        <PhotoEditor
          photo={photo}
          onDiscard={handleDiscardPhoto}
          setPhoto={setPhoto}
        />
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive
            photo
          />
          <SafeAreaView>
            <View style={styles.container}>
              <View />
              <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={handleTakePhoto}>
                  <TakePhoto />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default CameraComponent;
