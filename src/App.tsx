import {WindowManager, XR} from '@callstack/react-native-visionos';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from './components/Button';
import {useAppStore} from './store';

const secondWindow = WindowManager.getWindow('SecondWindow');

function App(): React.JSX.Element {
  const [count, increment, decrement] = useAppStore(state => [
    state.count,
    state.increment,
    state.decrement,
  ]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={[styles.title, styles.text]}>Hello React Conf! 💙</Text>
      <Text style={[styles.subtitle, styles.text]}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Increment"
          onPress={() => {
            increment();
          }}
        />
        <Button
          title="Increment"
          onPress={() => {
            decrement();
          }}
        />
        <Text style={styles.sectionHeading}>XR</Text>
        <Button
          title="Open XR Session"
          onPress={() => {
            XR.requestSession('Callstack', {});
          }}
        />
        <Button
          title="Close XR Session"
          onPress={() => {
            XR.endSession();
          }}
        />
        <Text style={styles.sectionHeading}>Window Manager</Text>
        <Button
          title="Open Second Window"
          onPress={() => {
            secondWindow.open();
          }}
        />
        <Button
          title="Close Second Window"
          onPress={() => {
            secondWindow.close();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
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
    fontSize: 50,
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

export default App;
