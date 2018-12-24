// In App.js in a new project

import React from "react";
import { createStackNavigator, createAppContainer, NavigationScreenProp, NavigationParams } from "react-navigation";
import volumioService from './services/volumio-service';
import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';
import PlayScreen from './screens/Play';
import { Button } from "react-native";


volumioService.init('http://192.168.1.65:8080');

const routes = {
  Home: {
    screen: HomeScreen
  },
  Browse: {
    screen: BrowseScreen
  },
  Play: {
    screen: PlayScreen
  },
};

const config = {
  initialRouteName: "Browse",
  defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => {
    return {
      headerStyle: { backgroundColor: '#191919' },
      headerTitleStyle: { color: 'white' },
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Search"
        // color="#00000"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Home"
        // color="#00000"
        />
      ),
    }
  }
};

const AppNavigator = createStackNavigator(routes, config);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer
      uriPrefix="/app"
    />;
  }
}
