import {useState, useEffect, useCallback} from 'react';
import {IPost} from '~types/Posts';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('Posts');
const LIMIT = 8;

const useGetPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] =
    useState<
      FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    >();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [firstDoc, setFirstDoc] =
    useState<
      FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    >();

  useEffect(() => {
    const subscriber = postsCollection.onSnapshot(documentSnapshot => {
      console.log('Post data: ', documentSnapshot.docs, documentSnapshot.size);
    });

    retrieveData();

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveData = useCallback(() => {
    setIsLoading(true);
    let query = postsCollection.orderBy('createdAt', 'desc');
    if (lastDoc !== undefined) {
      query = query.startAfter(lastDoc);
    }
    query
      .limit(LIMIT)
      .get()
      .then(querySnapshot => {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        if (!firstDoc) {
          setFirstDoc(querySnapshot.docs[0]);
        }
        let templist: IPost[] = [];
        querySnapshot.docs.forEach(doc => {
          console.log(doc);

          templist.push({...doc.data(), id: doc.id} as IPost);
        });
        if (!posts.length) {
          setPosts(templist as IPost[]);
        } else if (
          templist[templist.length - 1].createdAt <
          posts[posts.length - 1].createdAt
        ) {
          setPosts([...posts, ...templist] as IPost[]);
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e.message);
      });
  }, [firstDoc, lastDoc, posts]);

  console.log(firstDoc);

  const refreshData = useCallback(() => {
    let query = postsCollection.orderBy('createdAt', 'asc');
    if (firstDoc !== undefined) {
      query = query.startAfter(firstDoc);

      query
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs[querySnapshot.docs.length - 1]) {
            setFirstDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          }
          let templist: IPost[] = [];

          querySnapshot.docs.forEach(doc => {
            templist.push({...doc.data(), id: doc.id} as IPost);
          });
          if (!posts.length) {
            setPosts(templist as IPost[]);
          } else {
            setPosts([...templist, ...posts] as IPost[]);
          }
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  }, [firstDoc, posts]);

  return {posts, retrieveData, hasMore, isLoading, refreshData};
};

export default useGetPosts;
