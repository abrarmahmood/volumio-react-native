import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../components/player/Header';
import { PlayerState } from '../sagas/push-state-transform';
import { handlePlay, handlePause, handleNext, handlePrev } from '../actions/player-state';


interface State {
  paused: boolean;
  totalLength: number;
  currentPosition: number;
  selectedTrack: number;
  repeatOn: boolean;
  shuffleOn: boolean;
  isChanging: boolean;
}

interface Props extends NavigationInjectedProps {
  playerState: PlayerState;
  play (): void;
  pause (): void;
  next (): void;
  prev (): void;
}

@(connect(
  (state: any) => ({
      playerState: state.playerState.value,
  }),
  {
    play: handlePlay,
    pause: handlePause,
    next: handleNext,
    prev: handlePrev,
  }
) as any)
export default class Queue extends Component<Props, State> {

  static navigationOptions = {
    header: null,
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Play Queue" onDownPress={this.goBack}/>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
