import {XR} from '@callstack/react-native-visionos';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from './components/Button';

function App(): React.JSX.Element {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello React Conf! 💙</Text>
      <View style={styles.buttonContainer}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  buttonContainer: {justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 50,
    fontFamily: 'Courier New',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
