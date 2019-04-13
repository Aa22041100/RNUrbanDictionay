/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './screens/home-screen/home-screen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

interface Props {}

export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}