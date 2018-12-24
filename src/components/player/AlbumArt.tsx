import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';


interface Props {
  url: string;
  onPress? (): void;
}

export default class AlbumArt extends Component<Props> {
  render() {
    const {url, onPress} = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.image}
            source={{ uri: url }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const { width } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})
