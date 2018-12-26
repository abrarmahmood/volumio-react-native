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
import { PlayerState } from '../sagas/push-state-transform';
import {
  handlePlay,
  handlePause,
  handleNext,
  handlePrev,
  setRandom,
  setRepeat,
} from '../actions/player-state';


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
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
  setRandom(bool: boolean): void;
  setRepeat(bool: boolean): void;
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
  }
) as any)
export default class Player extends Component<Props, State> {

  static navigationOptions = {
    header: null,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      paused: true,
      totalLength: 80,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      isChanging: false,
    };
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({ totalLength: Math.floor(data.duration) });
  }

  setTime(data) {
    //console.log(data);
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
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
    const { playerState } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header message="Now Playing" onDownPress={this.goBack} onQueuePress={() => this.goQueue()} />
        <AlbumArt url={playerState.albumart} />
        <TrackDetails title={playerState.title} artist={playerState.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={playerState.duration}
          onSlidingStart={() => this.setState({ paused: true })}
          paused={playerState.status !== 'play'}
          currentPosition={playerState.seek} />
        <Controls
          onPressRepeat={this.onRepeat}
          repeatOn={playerState.repeat}
          shuffleOn={playerState.random}
          forwardDisabled={this.state.selectedTrack === /*this.props.tracks.length - 1*/ 8}
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
