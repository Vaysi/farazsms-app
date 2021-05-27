/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Groups from './components/Groups';
import Dashboard from './components/Dashboard';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Root} from 'native-base';
import Common from './components/helpers/Common';

const RootStack = createStackNavigator({
  Register: Register,
  Dashboard: Dashboard,
  Login:Login,
  Groups: Groups
},
{
  initialRouteName: 'Dashboard',
  headerMode: 'none'
});


const AppContainer = createAppContainer(RootStack);

const App: () => React$Node = () => {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};


export default App;