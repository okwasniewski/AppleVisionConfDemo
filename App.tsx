import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

function App(): React.JSX.Element {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello React Conf! 💙</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
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
