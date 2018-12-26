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
import { handleDeleteQueueItem, handlePlayQueueItem } from '../actions/queue';


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
  delete(index: number): void;
  play(index: number): void;
}

@(connect(
  (state: any) => ({
    queue: state.queue.value,
  }),
  {
    delete: handleDeleteQueueItem,
    play: handlePlayQueueItem,
  }
) as any)
export default class Queue extends Component<Props, State> {

  static navigationOptions = {
    header: null,
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  onPress = (index: number) => {
    this.props.play(index);
    this.props.navigation.goBack();
  }

  onDeletePress = (index: number) => {
    this.props.delete(index);
  }

  render() {
    const { queue } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Play Queue" onDownPress={this.goBack} />
        <QueueList data={queue} onPress={this.onPress} onDeletePress={this.onDeletePress} />
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
