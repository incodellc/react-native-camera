import React, {useCallback, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '~components/PhotoEditor/styles';
import {PhotoFile} from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import firestore from '@react-native-firebase/firestore';

interface IPhotoEditorProps {
  photo: PhotoFile;
  setPhoto: (photo: PhotoFile | undefined) => void;
  onDiscard: () => void;
}

const postsCollection = firestore().collection('Posts');

const PhotoEditor: React.FC<IPhotoEditorProps> = ({
  photo,
  setPhoto,
  onDiscard,
}) => {
  const [loading, setLoading] = useState<number | null>(null);

  const handleOnSave = useCallback(async () => {
    if (photo) {
      setLoading(0);
      const reference = storage().ref(
        'images/' + photo?.path.split('/')[photo?.path.split('/').length - 1],
      );

      try {
        const task = reference.putFile(photo?.path);

        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setLoading(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes);
        });

        task.then(async () => {
          try {
            await postsCollection.add({
              imagePath:
                'images/' +
                photo?.path.split('/')[photo?.path.split('/').length - 1],
              createdAt: new Date().toISOString(),
            });
            setLoading(null);
            setPhoto(undefined);
          } catch (err) {
            console.log('[ERROR writting to firestore] => ', err);
          }
        });
      } catch (e) {
        console.log('[ERROR upload photo to storage] => ', e);
        setLoading(null);
      }
    }
  }, [photo, setPhoto]);

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.editorHeader}>
        <TouchableOpacity onPress={onDiscard}>
          <Text style={[styles.buttonText, styles.gray]}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnSave}>
          <Text style={[styles.buttonText, styles.blue]}>Save</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={[styles.loaderContainer]}>
          <Progress.Pie
            progress={loading}
            size={150}
            animated
            color={'rgba(191, 189, 189, 0.4)'}
            borderWidth={0}
          />
        </View>
      ) : null}

      <Image
        source={{uri: photo?.path}}
        style={{width: '100%', height: '100%'}}
      />
      <Text>Editing photo here</Text>
    </SafeAreaView>
  );
};

export default PhotoEditor;
