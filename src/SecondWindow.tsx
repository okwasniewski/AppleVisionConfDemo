import {WindowManager} from '@callstack/react-native-visionos';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from './components/Button';
import {useAppStore} from './store';

function SecondWindow(): React.JSX.Element {
  const [count, increment, decrement] = useAppStore(state => [
    state.count,
    state.increment,
    state.decrement,
  ]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={[styles.title, styles.text]}>Second Window!</Text>
      <Text style={[styles.subtitle, styles.text]}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Close Window"
          onPress={() => {
            WindowManager.getWindow('SecondWindow').close();
          }}
        />
        <Button
          title="Increment"
          onPress={() => {
            increment();
          }}
        />
        <Button
          title="Decrement"
          onPress={() => {
            decrement();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
