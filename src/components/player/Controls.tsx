import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';


interface Props {
  paused: boolean;
  shuffleOn: boolean;
  repeatOn: boolean;
  onPressPlay(): void;
  onPressPause(): void;
  onBack(): void;
  onForward(): void;
  onPressShuffle(): void;
  onPressRepeat(): void;
  forwardDisabled: boolean;
}

export default class Controls extends Component<Props> {
  render() {
    const {
      paused,
      shuffleOn,
      repeatOn,
      onPressPlay,
      onPressPause,
      onBack,
      onForward,
      onPressShuffle,
      onPressRepeat,
      forwardDisabled,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
          <Image style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
            source={require('./img/ic_shuffle_white.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={onBack}>
          <Image source={require('./img/ic_skip_previous_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        {!paused ?
          <TouchableOpacity onPress={onPressPause}>
            <View style={styles.playButton}>
              <Image source={require('./img/ic_pause_white_48pt.png')} />
            </View>
          </TouchableOpacity> :
          <TouchableOpacity onPress={onPressPlay}>
            <View style={styles.playButton}>
              <Image source={require('./img/ic_play_arrow_white_48pt.png')} />
            </View>
          </TouchableOpacity>
        }
        <View style={{ width: 20 }} />
        <TouchableOpacity onPress={onForward}
          disabled={forwardDisabled}>
          <Image style={[forwardDisabled && { opacity: 0.3 }]}
            source={require('./img/ic_skip_next_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
          <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
            source={require('./img/ic_repeat_white.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
});
