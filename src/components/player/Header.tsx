import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';


interface Props {
  message: string;
  queueIcon?: boolean;
  noBack?: boolean;
  onDownPress? (): any;
  onAltPress? (): any;
  onMessagePress? (): any;
}

export default class Header extends Component<Props> {
  render() {
    const { message, onDownPress, onAltPress: onQueuePress, onMessagePress, queueIcon = false, noBack = false } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onDownPress}>
          {noBack === false && <Image style={styles.buttonBack} source={require('./img/ic_keyboard_arrow_down_white.png')} />}
        </TouchableOpacity>
        <Text onPress={onMessagePress}
          style={styles.message}>{message.toUpperCase()}</Text>
        <TouchableOpacity onPress={onQueuePress}>
          <Image style={styles.button}
            source={queueIcon === true ? require('./img/ic_queue_music_white.png') : require('./img/more_horiz.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 10,
  },
  button: {
    opacity: 0.72
  },
  buttonBack: {
    opacity: 0.72,
    transform: [{ rotate: '90deg'}]
  },
});
