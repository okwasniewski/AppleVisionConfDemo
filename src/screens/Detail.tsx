import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, Image, View, Platform} from 'react-native';
import Button from '../components/Button';
import {WindowManager} from '@callstack/react-native-visionos';
import {RootStackParamList} from '../types';

interface DetailProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const isVision = Platform.OS === 'ios' && Platform.isVision;

const Detail = ({route}: DetailProps) => {
  const item = route.params.item;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
        </View>
        {isVision ? (
          <Button
            title="Preview in 3D"
            onPress={() => {
              WindowManager.getWindow('SecondWindow').open({item});
            }}
          />
        ) : null}
      </View>
      <Image src={item.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: isVision ? 'row' : 'column',
    justifyContent: isVision ? 'space-around' : 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: isVision ? '100%' : 'auto',
  },
  text: {
    color: isVision ? 'white' : 'black',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    color: isVision ? 'white' : 'black',
    fontSize: 55,
    marginTop: isVision ? 20 : 0,
  },
  image: {
    width: isVision ? 400 : '100%',
    height: 400,
    borderRadius: 30,
    marginTop: isVision ? 0 : 20,
  },
});

export default Detail;
