import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Scan from './pages/Scan';
import {Appearance, SafeAreaView, StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
      }}>
      <StatusBar
        backgroundColor={
          Appearance.getColorScheme() === 'dark' ? '#fff' : '#000'
        }
        barStyle={
          Appearance.getColorScheme() === 'dark'
            ? 'dark-content'
            : 'light-content'
        }
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

// NOTE: Uncomment this to run Storybook
// export {default} from '../.storybook';
