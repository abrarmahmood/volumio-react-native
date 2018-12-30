import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { PlayerState } from '../sagas/mappers/transform-state';
import {
    handlePlay,
    handlePause,
    handleNext,
} from '../actions/player-state';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';


interface Props extends NavigationInjectedProps {
    playerState: PlayerState;
    play(): void;
    pause(): void;
    next(): void;
}

@(connect(
    (state: any) => ({
        playerState: state.playerState.value,
    }),
    {
        play: handlePlay,
        pause: handlePause,
        next: handleNext,
    }
) as any)
@(withNavigation as any)
export default class Footer extends Component<Props> {
    onPressFooter = () => {
        this.props.navigation.push('Play');
    }

    render() {
        const { playerState } = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPressFooter}>
                <View style={[styles.seekBar]}>
                    <View style={styles.seekBarEndContainer}>
                        <View style={styles.seekBarEnd} />
                    </View>
                </View>
                <Image
                    source={{ uri: playerState.albumart }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>{playerState.title}</Text>
                    <Text numberOfLines={1} style={styles.album}>{playerState.album}</Text>
                    <Text numberOfLines={1} style={styles.artist}>{playerState.artist}</Text>
                </View>
                <View style={styles.controlsBlock}/>
                <View style={styles.controls}>
                    {playerState.status === 'play' ?
                        (
                            <TouchableOpacity onPress={() => this.props.pause()}>
                                <View style={styles.playButton}>
                                    <Image style={styles.playButtonImage} source={require('./player/img/ic_pause_white_48pt.png')} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => this.props.play()}>
                                <View style={styles.playButton}>
                                    <Image style={styles.playButtonImage} source={require('./player/img/ic_play_arrow_white_48pt.png')} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 70,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        width: '100%',
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
    },
    textContainer: {
        width: '80%',
        overflow: 'hidden',
        height: 70,
        position: 'relative',
    },
    controlsBlock: {
        width: 100,
    },
});
