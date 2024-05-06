import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Logo from './Logo';
import {BACKGROUND_COLOR} from '../constants';

const CustomHeader = ({route, options, navigation}: NativeStackHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={[
          styles.touchable,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            opacity: navigation.canGoBack() ? 1 : 0,
          },
        ]}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{options.title || route.name}</Text>
      <Logo />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  touchable: {
    padding: 10,
    borderRadius: 10,
  },
  back: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
  },
});
