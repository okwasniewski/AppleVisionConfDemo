import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Detail from './screens/Detail';
import {RootStackParamList} from './types';
import Logo from './components/Logo';
import {BACKGROUND_COLOR} from './constants';
import CustomHeader from './components/CustomHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const isVision = Platform.OS === 'ios' && Platform.isVision;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...(isVision
      ? {
          text: 'white',
          background: BACKGROUND_COLOR,
        }
      : {}),
  },
};

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerRight: Logo,
            ...(isVision && {header: CustomHeader}),
          }}>
          <Stack.Screen
            name="Home"
            options={{title: 'My Stash'}}
            component={Home}
          />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
