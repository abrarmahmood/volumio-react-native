// In App.js in a new project

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import volumioService from './services/volumio-service';
import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';


volumioService.init('http://192.168.1.65:8080');

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Browse: {
    screen: BrowseScreen
  }
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    // headerStyle: {
    //   backgroundColor: '#000000',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'normal'
    // },
  }
});


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer
      uriPrefix="/app"
    />;
  }
}
