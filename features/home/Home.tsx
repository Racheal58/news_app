import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dispatch, RootState } from '../store/store';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { NewsTitleText } from '../../components/NewsTitleText';
import { FaintText } from '../../components/FaintText';
import { settings } from '../../misc/settings';
import { Button, Input } from 'react-native-elements';
import { OverlayExample } from '../../components/AddComment';

export interface INavigationProps {
  navigation: NavigationProp<ParamListBase>;
  route?: RouteProp<{ params: { id: string } }>;
}

type NewsProp = {
  author: string;
  title: string;
}


const Home = ({ navigation }: INavigationProps) => {
  const { home, news } = useDispatch<Dispatch>();
  const { newsItems, loading, page } = useSelector(
    (state: RootState) => state.home,
  );
  const { showAddNews, addNewsStatus } = useSelector(
    (state: RootState) => state.news,
  );
  const [newsState, setNewsState] = useState<NewsProp>({
    author: '',
    title: ""
  })
  const nextPage = () => home.incrementPage();
  const prevPage = () => home.decrementPage();


  useEffect(() => {
    home.getNews({});
    return () => {
      home.reset();
    }
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <Button buttonStyle={styles.buttonStyle} title="Create News" onPress={() => news.showAddNewsFn(true)} />
      <View style={{ height: 20 }} />
      <View style={styles.container}>
        {loading === 'loading' && (
          <View style={styles.centralize}>
            <ActivityIndicator />
          </View>
        )}
        {loading === 'success' &&
          newsItems.map(newsItem => (
            <TouchableWithoutFeedback
              key={newsItem.id}
              onPress={() => {
                news.replaceId({ id: newsItem.id });
                navigation.navigate('news', { id: newsItem.id });
              }}>
              <View style={styles.overall}>
                <View style={styles.titleView}>
                  <NewsTitleText>{newsItem.title}</NewsTitleText>
                </View>
                <View style={styles.authorView}>
                  <FaintText>{newsItem.author}</FaintText>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Prev" onPress={prevPage} />
        <View style={{ width: 20 }} />
        <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Next" onPress={nextPage} />
      </View>

      <OverlayExample {...{ show: showAddNews, setShow: news.showAddNewsFn, title: 'Add News' }}>
        <KeyboardAvoidingView>
          <View style={{ height: 20 }} />
          <Input
            placeholder="Author"
            onChangeText={value => setNewsState({ ...newsState, author: value })}
            autoCompleteType=""
          />
          <Input
            placeholder="Title"
            onChangeText={value => setNewsState({ ...newsState, title: value })}
            autoCompleteType=""
          />
          <Button buttonStyle={{ backgroundColor: settings.mainAppColor }} title="Continue"
            disabled={addNewsStatus === 'loading'}
            onPress={() => {
              news.resetAddNews();
              news.createNews(newsState)
            }}
          />
        </KeyboardAvoidingView>
      </OverlayExample>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  navigation: {
    padding: 10,
    backroundColor: 'brown',
  },
  navigationText: {
    color: 'red',
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  overall: {
    padding: 10,
    paddingHorizontal: settings.paddingHorizontal,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#888',
    backgroundColor: '#eee'
  },
  centralize: {
    flex: 1,
    height: Dimensions.get('window').height - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  author: {
    fontSize: 12,
  },
  titleView: {},
  bodyView: {
    marginVertical: 10,
  },
  buttonStyle: { backgroundColor: settings.mainAppColor },
  authorView: {},
});

export default Home;
