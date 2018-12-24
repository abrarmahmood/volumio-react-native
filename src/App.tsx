// In App.js in a new project

import React from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStackNavigator, createAppContainer, NavigationScreenProp, NavigationParams } from "react-navigation";
import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';
import PlayScreen from './screens/Play';
import reducer from './data-layer/tidal';


const client = axios.create({ baseURL: 'http://192.168.1.65:8080', responseType: 'json' });

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

const routeConfig = {
  initialRouteName: "Home",
  defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => {
    return {
      headerStyle: { backgroundColor: '#191919' },
      headerTitleStyle: { color: 'white' },
    }
  }
};

const AppNavigator = createStackNavigator(routes, routeConfig);
const AppContainer = createAppContainer(AppNavigator);
const store = createStore(combineReducers({tidal: reducer}), {}, composeWithDevTools(applyMiddleware(axiosMiddleware(client))));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer uriPrefix="/app" />
      </Provider>
    );
  }
}
