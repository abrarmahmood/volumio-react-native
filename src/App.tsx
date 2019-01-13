// In App.js in a new project

import React from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import sagas, { SagaParams } from "./sagas";
import initSocketio from "./socketio";
import * as reducers from './reducers';
import { AppContainer, getRouteDebugInfo } from "./router";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers(reducers), {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const socket = initSocketio('http://volumio.local/', store.dispatch);
const sagaParams: SagaParams = {socket};

sagaMiddleware.run(sagas, sagaParams);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          uriPrefix="/app"
          onNavigationStateChange={(prevState: any, currentState: any) => {
            if (prevState.isTransitioning === false) {
              console.log('prevState', getRouteDebugInfo(prevState));
            }
            if (currentState.isTransitioning === false) {
              console.log('currentState', getRouteDebugInfo(currentState));
            }
          }}
        />
      </Provider>
    );
  }
}
