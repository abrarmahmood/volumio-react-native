import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../components/player/Header';
import { QueueItem } from '../sagas/push-queue-transform';
import QueueList from '../components/queue-list';


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
  queue: Array<QueueItem>;
}

@(connect(
  (state: any) => ({
      queue: state.queue.value,
  }),
  {
    // play: handlePlay,
    // pause: handlePause,
    // next: handleNext,
    // prev: handlePrev,
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
    const { queue } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Play Queue" onDownPress={this.goBack}/>
        <QueueList data={queue} />
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
