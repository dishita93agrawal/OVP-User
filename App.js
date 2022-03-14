import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
 
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ActiveElectionsList from './screens/ActiveElectionsList';
import ActiveElectionsDet from './screens/ActiveElectionsDet';
import Settings from './screens/Settings'; 
const Stack = createStackNavigator() 

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={HomeStackNav} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const HomeStack = createStackNavigator()
export const HomeStackNav = () => {
  return (
    <HomeStack.Navigator initialRouteName="ActiveElectionsList" headerMode="none">
 
      <HomeStack.Screen
        name="ActiveElectionsList"
        component={ActiveElectionsList}
      />
    
      <HomeStack.Screen name="Setting" component={Settings} />
      
      <HomeStack.Screen
        name="ActiveElectionDet"
        component={ActiveElectionsDet}
      />
      
      
    </HomeStack.Navigator> 
  );
};
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
