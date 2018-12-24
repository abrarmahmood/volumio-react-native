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
  onDownPress? (): any;
  onQueuePress? (): any;
  onMessagePress? (): any;
}

export default class Header extends Component<Props> {
  render() {
    const { message, onDownPress, onQueuePress, onMessagePress } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onDownPress}>
          <Image style={styles.button}
            source={require('./img/ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>
        <Text onPress={onMessagePress}
          style={styles.message}>{message.toUpperCase()}</Text>
        <TouchableOpacity onPress={onQueuePress}>
          <Image style={styles.button}
            source={require('./img/ic_queue_music_white.png')} />
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
  }
});
