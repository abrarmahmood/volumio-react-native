// In App.js in a new project

import React from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStackNavigator, createAppContainer, NavigationScreenProp, NavigationParams } from "react-navigation";
import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';
import PlayScreen from './screens/Play';
import reducer from './reducers';
import * as sagas from "./sagas";
import initSocketio from "./socketio";


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
  initialRouteName: "Play",
  defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => {
    return {
      headerStyle: { backgroundColor: '#191919' },
      headerTitleStyle: { color: 'white' },
    }
  }
};

const AppNavigator = createStackNavigator(routes, routeConfig);
const AppContainer = createAppContainer(AppNavigator);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const socket = initSocketio('http://192.168.1.81/', store.dispatch);

sagaMiddleware.run(sagas.handleBrowseSaga, {socket});
sagaMiddleware.run(sagas.handleSearchSaga, {socket});
sagaMiddleware.run(sagas.pushBrowseTransform, {socket});
sagaMiddleware.run(sagas.pushStateTransform, {socket});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer uriPrefix="/app" />
      </Provider>
    );
  }
}
