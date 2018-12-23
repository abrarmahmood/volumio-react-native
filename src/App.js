// In App.js in a new project

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: SearchScreen
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
