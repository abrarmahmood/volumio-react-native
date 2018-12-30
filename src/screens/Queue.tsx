import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import {
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/player/Header';
import { QueueItem } from '../sagas/mappers/transform-queue';
import QueueList from '../components/queue-list';
import { handleDeleteQueueItem, handlePlayQueueItem, handleClearQueue } from '../actions/queue';


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
  clearQueue(): void;
}

@(connect(
  (state: any) => ({
    queue: state.queue.value,
  }),
  {
    delete: handleDeleteQueueItem,
    clearQueue: handleClearQueue,
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

  onClearPress = () => {
    this.props.clearQueue();
  }

  render() {
    const { queue } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Play Queue" onDownPress={this.goBack} />
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionsButton} onPress={this.onClearPress}>
            <Text style={styles.optionsText}>Clear queue</Text>
          </TouchableOpacity>
        </View>
        <QueueList removable data={queue} onPress={this.onPress} onDeletePress={this.onDeletePress} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  options: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'flex-end',
  },
  optionsButton: {
    padding: 10,
  },
  optionsText: {
    color: 'white',
  }
});
