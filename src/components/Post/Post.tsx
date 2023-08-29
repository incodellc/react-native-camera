import React, {useEffect, useState} from 'react';
import {IPost} from '~types/Posts';
import storage from '@react-native-firebase/storage';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '~components/Post/styles';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {
  post?: IPost;
}

const Post: React.FC<Props> = ({post}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const imageLink = await storage().ref(post?.imagePath).getDownloadURL();
      setImageUrl(imageLink);
    })();
  }, [post?.imagePath]);

  return (
    <TouchableOpacity>
      {imageUrl ? (
        <View>
          <Image
            source={{uri: imageUrl}}
            style={styles.photo}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
          <Text style={styles.date}>
            {moment(post?.createdAt).format('DD MMM YYYY HH:MM A')}
          </Text>
          {isLoading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                position={'absolute'}
                width={'100%'}
                height={250}
                borderRadius={20}
              />
            </SkeletonPlaceholder>
          ) : null}
        </View>
      ) : (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={250}
            borderRadius={20}
          />
        </SkeletonPlaceholder>
      )}
    </TouchableOpacity>
  );
};

export default Post;
