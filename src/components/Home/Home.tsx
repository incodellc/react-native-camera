import React, {useCallback, useMemo, useState} from 'react';
import { FlatList, RefreshControl, View } from "react-native";
import styles from '~components/Home/styles';
import useGetPosts from '../../hooks/useGetPosts';
import {IPost} from '~types/Posts';
import {Spinner} from '~components/Spinner';
import {ThemeColors} from '~assets/theme';
import {Post} from '~components/Post';

const Home = () => {
  const {posts, retrieveData, hasMore, isLoading, refreshData} = useGetPosts();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshData();
    setRefreshing(false);
  }, [refreshData]);

  const renderItem = useCallback(({item}: {item: IPost}) => {
    return <Post post={item} />;
  }, []);

  const ListFooterComponent = useMemo(
    () => (isLoading ? <Spinner color={ThemeColors.white} /> : null),
    [isLoading],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={hasMore ? retrieveData : undefined}
        onEndReachedThreshold={0.1}
        style={styles.list}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={[styles.listContentContainer]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;
