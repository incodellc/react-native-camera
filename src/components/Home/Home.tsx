import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text} from 'react-native';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import styles from '~components/Home/styles';

const reference = storage().ref('images');

const Home = () => {
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [photos, setPhotos] = useState<FirebaseStorageTypes.Reference[] | null>(
    null,
  );

  const getPhotos = (
    storageReference: FirebaseStorageTypes.Reference,
    pageToken?: string,
  ) => {
    return storageReference.list({pageToken}).then(result => {
      setPhotos(result.items);

      if (result.nextPageToken) {
        setNextPage(result.nextPageToken);
      } else {
        setNextPage(null);
      }

      return Promise.resolve();
    });
  };

  useEffect(() => {
    (async () => {
      await getPhotos(reference);
    })();
  }, []);

  const renderItem = useCallback(
    ({item}: {item: FirebaseStorageTypes.Reference}) => {
      console.log(
        item.fullPath,
        '\n',
        'https://firebasestorage.googleapis.com/v0/b/' + item.fullPath,
      );

      return <Image source={{uri: ''}} style={styles.photo} />;
    },
    [],
  );

  return (
    <>
      <Text>Home</Text>
      <FlatList
        data={photos}
        keyExtractor={item => item.fullPath}
        renderItem={renderItem}
      />
    </>
  );
};

export default Home;
