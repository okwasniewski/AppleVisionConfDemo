import React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import StashItem from '../components/StashItem';
import {Item, items} from '../data';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';

const keyExtractor = (item: Item) => item.id;

interface HomeProps {
  navigation: NavigationProp<RootStackParamList>;
}

const Home = ({navigation}: HomeProps) => {
  const onStashItemPress = React.useCallback(
    (item: Item) => {
      navigation.navigate('Detail', {item: item});
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}: {item: Item}) => {
      return <StashItem onPress={onStashItemPress} item={item} />;
    },
    [onStashItemPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const isVision = Platform.OS === 'ios' && Platform.isVision;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  flatList: {
    width: '100%',
    height: '100%',
    paddingHorizontal: isVision ? 40 : 20,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Courier New',
    color: isVision ? 'white' : 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: isVision ? 50 : 30,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 35,
  },
  sectionHeading: {
    marginTop: 30,
    marginBottom: 10,
    color: 'white',
    fontSize: 30,
  },
});
export default Home;
