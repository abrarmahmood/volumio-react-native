import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { PlayerState } from '../sagas/push-state-transform';
import {
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
} from '../actions/player-state';


interface Props {
    playerState: PlayerState;
    play(): void;
    pause(): void;
    next(): void;
    prev(): void;
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
    }
) as any)
export default class Footer extends Component<Props> {
    onPressPlay = () => {

    }
    onPressPause = () => {

    }

    render() {
        const { playerState } = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.seekBar]}>
                    <View style={styles.seekBarEndContainer}>
                        <View style={styles.seekBarEnd} />
                    </View>
                </View>
                <Image
                    source={{ uri: playerState.albumart }}
                    style={styles.image}
                />
                <Text style={styles.title}>{playerState.title}</Text>
                <Text style={styles.album}>{playerState.album}</Text>
                <Text style={styles.artist}>{playerState.artist}</Text>
                <View style={styles.controls}>
                    {playerState.status === 'play' ?
                        (
                            <TouchableOpacity onPress={this.onPressPlay}>
                                <View style={styles.playButton}>
                                    <Image style={styles.playButtonImage} source={require('./player/img/ic_play_arrow_white_48pt.png')} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={this.onPressPause}>
                                <View style={styles.playButton}>
                                    <Image style={styles.playButtonImage} source={require('./player/img/ic_pause_white_48pt.png')} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(20,20,20,1.0)',
        height: 70,
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
    },
    seekBar: {
        backgroundColor: 'white',
        height: 1,
        width: 200,
        alignItems: 'flex-end',
    },
    seekBarEndContainer: {
        position: 'relative',
    },
    seekBarEnd: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 6,
        width: 6,
        borderRadius: 180,
        top: -2.5,
    },
    image: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 50,
        height: 50,
    },
    title: {
        position: 'absolute',
        top: 10,
        left: 70,
        color: 'white',
        fontSize: 15,
    },
    album: {
        position: 'absolute',
        top: 30,
        left: 70,
        color: 'white',
        fontSize: 10,
    },
    artist: {
        position: 'absolute',
        top: 43,
        left: 70,
        color: 'white',
        fontSize: 10,
    },
    controls: {
        position: 'absolute',
        right: 18,
        top: 18,
    },
    playButton: {
        height: 36,
        width: 36,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 36 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButtonImage: {
        width: 18,
        height: 18,
    }
});
