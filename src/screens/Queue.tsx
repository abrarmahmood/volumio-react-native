import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../components/player/Header';
import { QueueItem } from '../sagas/mappers/transform-queue';
import QueueList from '../components/queue-list';
import { handleDeleteQueueItem, handlePlayQueueItem, handleClearQueue } from '../actions/queue';
import BackgroundAlbumArt from '../components/background-album-art';
import { PlayerState } from '../sagas/mappers/transform-state';


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
  queue: Array<QueueItem>;
  delete(index: number): void;
  play(index: number): void;
  clearQueue(): void;
}

@(connect(
  (state: any) => ({
    playerState: state.playerState.value,
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
    const { queue, playerState } = this.props;

    return (
      <BackgroundAlbumArt albumart={playerState.albumart}>
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
      </BackgroundAlbumArt>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  options: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-end',
  },
  optionsButton: {
    padding: 10,
  },
  optionsText: {
    color: 'white',
  }
});
