import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { StatusBar, SafeAreaView } from 'react-native';
import Header from '../components/player/Header';
import AlbumArt from '../components/player/AlbumArt';
import TrackDetails from '../components/player/TrackDetails';
import SeekBar from '../components/player/SeekBar';
import Controls from '../components/player/Controls';
import { PlayerState } from '../sagas/mappers/transform-state';
import * as actions from '../actions/player-state';
import { withCurrentTrackPosition } from '../hoc/current-track-position';
import BackgroundAlbumArt from '../components/background-album-art';


interface Props extends NavigationInjectedProps {
  playerState: PlayerState;
  currentPosition: number;
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
    play: actions.handlePlay,
    pause: actions.handlePause,
    next: actions.handleNext,
    prev: actions.handlePrev,
    setRandom: actions.setRandom,
    setRepeat: actions.setRepeat,
    seek: actions.handleSeek,
    getState: actions.getState,
  }
) as any)
@(withCurrentTrackPosition as any)
export default class Player extends Component<Props> {
  static navigationOptions = {
    // header: null,
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
      <BackgroundAlbumArt albumart={playerState.albumart}>
        <SafeAreaView >
          <StatusBar barStyle="light-content" />
          <Header message="Now Playing" onDownPress={this.goBack} onAltPress={() => this.goQueue()} queueIcon />
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
      </BackgroundAlbumArt>
    );
  }
}
