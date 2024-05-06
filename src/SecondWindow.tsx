import {WindowManager} from '@callstack/react-native-visionos';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './components/Button';
import AnimatedModel3D from './components/AnimatedModel3D';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Item} from './data';
import {BACKGROUND_COLOR} from './constants';

interface SecondWindowProps {
  item?: Item;
}

function SecondWindow({item}: SecondWindowProps): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {item ? <AnimatedModel3D source={item?.model3d} /> : null}
        <View style={styles.buttonContainer}>
          <Button
            title="Close Window"
            onPress={() => {
              WindowManager.getWindow('SecondWindow').close();
            }}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    fontFamily: 'Courier New',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 35,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 25,
  },
});

export default SecondWindow;
