import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/index';
import Section2 from './src/Section2/index';
import Section3 from './src/Section3/index';
import Section4 from './src/Section4';
import Section5 from './src/Section5';
import Section6 from './src/Section6';
import Section7 from './src/Section7';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Interpolation" component={Section2} />
          <Tab.Screen name="Cards" component={Section3} />
          <Tab.Screen name="Login" component={Section4} />
          <Tab.Screen name="Questionnaire" component={Section5} />
          <Tab.Screen name="Photos" component={Section6} />
          <Tab.Screen name="Button Float" component={Section7} />
        </Tab.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
