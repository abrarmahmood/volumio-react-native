import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../components/player/Header';
import AlbumArt from '../components/player/AlbumArt';
import TrackDetails from '../components/player/TrackDetails';
import SeekBar from '../components/player/SeekBar';
import Controls from '../components/player/Controls';
import { PlayerState } from '../sagas/mappers/transform-state';
import {
  handlePlay,
  handlePause,
  handleNext,
  handlePrev,
  setRandom,
  setRepeat,
  handleSeek,
  getState,
} from '../actions/player-state';
import { withCurrentTrackPosition, InjectedCurrentPositionProps } from '../hoc/current-track-position';


interface Props extends NavigationInjectedProps, InjectedCurrentPositionProps {
  playerState: PlayerState;
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
  setRandom(bool: boolean): void;
  setRepeat(bool: boolean): void;
  seek(seconds: number): void;
  getState(): void;
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
    setRandom: setRandom,
    setRepeat: setRepeat,
    seek: handleSeek,
    getState: getState,
  }
) as any)
@(withCurrentTrackPosition as any)
export default class Player extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getState();
  }

  onSeek = (time: number) => {
    const seconds = Math.round(time);
    console.log('time', time);

    this.props.seek(seconds);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  goQueue = () => {
    this.props.navigation.push('Queue');
  }

  onRandom = () => {
    const { playerState } = this.props;

    this.props.setRandom(!playerState.random);
  }

  onRepeat = () => {
    const { playerState } = this.props;

    this.props.setRepeat(!playerState.repeat);
  }

  render() {
    const { playerState, currentPosition } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Now Playing" onDownPress={this.goBack} onQueuePress={() => this.goQueue()} />
        <AlbumArt url={playerState.albumart} />
        <TrackDetails title={playerState.title} artist={playerState.artist} />
        <SeekBar
          onSeek={this.onSeek}
          trackLength={playerState.duration}
          onSlidingStart={() => this.props.pause()}
          currentPosition={currentPosition} />
        <Controls
          onPressRepeat={this.onRepeat}
          repeatOn={playerState.repeat}
          shuffleOn={playerState.random}
          forwardDisabled={/*this.state.selectedTrack === this.props.tracks.length - 1*/ false}
          onPressShuffle={this.onRandom}
          onPressPlay={() => this.props.play()}
          onPressPause={() => this.props.pause()}
          onBack={() => this.props.prev()}
          onForward={() => this.props.next()}
          paused={playerState.status !== 'play'} />
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
