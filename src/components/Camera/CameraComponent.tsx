import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChangeCamera, Flash, FlashOff, Hdr, TakePhoto} from '~assets/icons';
import styles from '~components/Camera/styles';
import {PhotoEditor} from '~components/PhotoEditor';
import {TORCH_STATE} from '~types/Camera';
import FlashAuto from '~assets/icons/FlashAuto';
import HdrOff from '~assets/icons/HdrOff';

const CameraComponent = () => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState(devices.front);
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<PhotoFile>();
  const [torch, setTorch] = useState<TORCH_STATE>(TORCH_STATE.AUTO);
  const [hdr, setHdr] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState({x: 0, y: 0});

  useEffect(() => {
    setDevice(devices.back);
  }, [devices]);

  const handleChangeCamera = useCallback(() => {
    if (device?.position === 'front') {
      setDevice(devices.back);
    } else {
      setDevice(devices.front);
    }
  }, [device?.position, devices.back, devices.front]);

  const handleTakePhoto = useCallback(async () => {
    const newPhoto = await camera.current?.takePhoto({
      flash: torch,
      qualityPrioritization: 'balanced',
    });
    setPhoto(newPhoto);
  }, [torch]);

  const handleDiscardPhoto = () => {
    setPhoto(undefined);
  };

  const FlashIcon = useMemo(() => {
    switch (torch) {
      case TORCH_STATE.AUTO:
        return <FlashAuto />;
      case TORCH_STATE.OFF:
        return <FlashOff />;
      case TORCH_STATE.ON:
        return <Flash />;
      default:
        setTorch(TORCH_STATE.AUTO);
        break;
    }
  }, [torch]);

  const changeTorchState = useCallback(() => {
    switch (torch) {
      case TORCH_STATE.AUTO:
        setTorch(TORCH_STATE.OFF);
        break;
      case TORCH_STATE.OFF:
        setTorch(TORCH_STATE.ON);
        break;
      case TORCH_STATE.ON:
        setTorch(TORCH_STATE.AUTO);
        break;
      default:
        setTorch(TORCH_STATE.OFF);
        break;
    }
  }, [torch]);

  const handleCameraTap = async (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;

    setCoordinates({x: locationX, y: locationY});
    console.log(locationY, locationX);

    if (camera.current) {
      if (device?.supportsFocus) {
        try {
          await camera.current.focus({x: locationX, y: locationY});
        } catch (err) {
          console.log('[ERROR focusing camera] => ', err);
        }
      }
    }
  };

  const FocusCircle = useMemo(
    () => (
      <View
        style={[
          styles.focusCircle,
          {
            top: coordinates.y - 30,
            left: coordinates.x - 30,
          },
        ]}
      />
    ),
    [coordinates],
  );

  if (!device) {
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
        <View style={styles.flex}>
          <Camera
            ref={camera}
            onTouchStart={handleCameraTap}
            style={StyleSheet.absoluteFill}
            device={device}
            hdr={hdr}
            preset={'photo'}
            isActive
            photo
            enableZoomGesture
          />
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={changeTorchState}>
                {FlashIcon}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHdr(prevState => !prevState)}>
                {hdr ? <Hdr /> : <HdrOff />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleTakePhoto}>
              <TakePhoto />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightContainer}
              onPress={handleChangeCamera}>
              <ChangeCamera />
            </TouchableOpacity>
          </View>

          {device.supportsFocus ? FocusCircle : null}
        </View>
      )}
    </>
  );
};

export default CameraComponent;
