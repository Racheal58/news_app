import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { INavigationProps } from '../home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../store/store';
import AppImage from './AppImage';
import { styles as externalStyles } from '../home/Home'
import { NewsTopicText } from '../../components/NewsTopicText';
import { FaintText } from '../../components/FaintText';
import AppText from '../../components/AppText';
import { Header } from '../../components/Header';
import { OverlayExample } from '../../components/AddComment';
import { Button, Input, Slider } from 'react-native-elements';
import { settings } from '../../misc/settings';

type CommentProp = {
  name: string;
  avatar: string;
  comment: string;
}

type ImageProp = {
  image: string;
}

type NewsProp = {
  author: string;
  title: string;
}


const News = ({ navigation }: INavigationProps) => {
  const {
    thisNews,
    id,
    loading,
    images,
    imageLoading,
    commentLoading,
    showAddComment,
    addCommentStatus,
    addImageStatus,
    showAddImage,
    showEditNews,
    editNewsStatus
  } = useSelector((state: RootState) => state.news);

  const [commentState, setCommentState] = useState<CommentProp>({
    name: "",
    avatar: "",
    comment: ""
  })

  const [imageState, setImageState] = useState<ImageProp>({
    image: "",
  });
  const [newsState, setNewsState] = useState<NewsProp>({
    author: "",
    title: ""
  });

  const { news } = useDispatch<Dispatch>();
  useEffect(() => {
    news.getImageById({});
    news.getNewsById({});
    news.getCommentsById({});

    return () => { news.reset() };
  }, [news]);

  useEffect(() => {
    setNewsState({
      author: thisNews.author,
      title: thisNews.title,
    })
  }, [thisNews])


  return (
    <ScrollView>
      <View style={styles.overall}>
        <Header navigation={navigation} title="News" />
        {loading === "success" && <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <View>
                <NewsTopicText>{thisNews.title}</NewsTopicText>
              </View>
              <View>
                <FaintText>{`By ${thisNews.author}`}</FaintText>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Button
                buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Add Image" onPress={() => news.showAddImageFn(true)} />
            </ View>
          </View>

          <View style={{ height: 20 }} />

          <ScrollView contentContainerStyle={{ alignItems: 'center' }} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {images && images.length > 0 && images.map((image: any, i: number) => {
              return <AppImage key={image.createdAt} image={image.image} />;
            })}
          </ScrollView>


          <View style={{ height: 20 }} />

          <View>
            <Text>
              <AppText>{thisNews.body}</AppText>
              <TouchableOpacity onPress={() => {
                news.showEditNews(true);
              }}>
                <Text style={{ color: '#bb3892', fontSize: 16 }}>&nbsp; ...edit</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={{ height: 20 }} />
        </>}
        {
          (loading === 'loading' || imageLoading === 'loading' ||
            commentLoading === 'loading') && (
            <View style={externalStyles.centralize}>
              <ActivityIndicator />
            </View>
          )
        }
        <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Add Comment" onPress={() => news.showAddCommentFn(true)} />
      </View>
      <OverlayExample {...{ show: showAddComment, setShow: news.showAddCommentFn, title: 'Add Comment' }}>
        <KeyboardAvoidingView>
          <View style={{ height: 20 }} />
          <Input
            placeholder="Comment"
            leftIcon={{ type: 'font-awesome', name: 'comment', color: settings.mainAppColor }}
            multiline={true}
            numberOfLines={3}
            onChangeText={value => setCommentState({ ...commentState, comment: value })}
            autoCompleteType=""
          />
          <Input
            placeholder="Name"
            leftIcon={{ type: 'font-awesome', name: 'user', color: settings.mainAppColor }}
            onChangeText={value => setCommentState({ ...commentState, name: value })}
            autoCompleteType=""
          />
          <Input
            placeholder="Avatar link"
            leftIcon={{ type: 'font-awesome', name: 'user', color: settings.mainAppColor }}
            onChangeText={value => setCommentState({ ...commentState, avatar: value })}
            autoCompleteType=""
          />
          <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Continue" disabled={addCommentStatus === 'loading'} onPress={() => {
            news.resetAddComment();
            news.createtComment(commentState)
          }} />
        </KeyboardAvoidingView>
      </OverlayExample>
      <OverlayExample {...{ show: showAddImage, setShow: news.showAddImageFn, title: 'Add an image' }}>
        <KeyboardAvoidingView>
          <View style={{ height: 20 }} />
          <Input
            placeholder="Image url"
            leftIcon={{ type: 'font-awesome', name: 'camera', color: settings.mainAppColor }}
            onChangeText={value => setImageState({ ...imageState, image: value })}
            autoCompleteType=""
          />
          <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Continue" disabled={addImageStatus === 'loading'} onPress={() => {
            news.resetAddImage();
            news.addImage(imageState)
          }} />
        </KeyboardAvoidingView>
      </OverlayExample>
      <OverlayExample {...{ show: showEditNews, setShow: news.showEditNewsFn, title: 'Edit News' }}>
        <KeyboardAvoidingView>
          <View style={{ height: 20 }} />
          <Input
            placeholder="Author"
            onChangeText={value => setNewsState({ ...newsState, author: value })}
            value={newsState.author}
            autoCompleteType=""
          />
          <Input
            placeholder="Title"
            onChangeText={value => setNewsState({ ...newsState, title: value })}
            autoCompleteType=""
            value={newsState.title}
          />
          <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Continue"
            disabled={editNewsStatus === 'loading'}
            onPress={() => {
              news.resetEditNews();
              news.editNews(newsState)
            }}
          />
        </KeyboardAvoidingView>
      </OverlayExample>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  centralize: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overall: {
    padding: 10,
    paddingHorizontal: settings.paddingHorizontal,
  },
  container: {
    paddingHorizontal: 10,
  },
  mainTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
  },
  bodyText: {},
});

export default News;
