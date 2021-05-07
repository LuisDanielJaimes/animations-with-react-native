import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/index';
import Section2 from './src/Section2/index';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Section2} />
        </Tab.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
