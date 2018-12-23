import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { NavigationInjectedProps } from "react-navigation";

const PLAY_PAUSE_ICON = 'https://cdn0.iconfinder.com/data/icons/controls-essential/48/v-33-512.png';


export default class SearchScreen extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Now Playing'
    };

    toggleOnPress = () => {
        console.log('toggle play/pause');
    }

    render() {
        const event = this.props.navigation.getParam('event', {
            action: 'addPlay',
            payload: {
                uri: "tidal://song/71635119",
                album: "If You Wait (Remixes)",
                artist: "London Grammar",
                title: "Wasting My Young Years",
                albumart: "https://resources.tidal.com/images/461559ff/1603/4193/9e4b/31ed7b7549ba/480x480.jpg",
                service: "streaming_services"
            }
        });

        return (
            <View style={styles.container}>
                <Text style={styles.trackName}>{event.payload.title}</Text>
                <Text style={styles.artistAlbum}>{event.payload.artist} / {event.payload.album}</Text>
                <Image source={{ uri: event.payload.albumart }} style={styles.albumart} resizeMode="contain" resizeMethod="scale" />
                <TouchableOpacity onPress={() => this.toggleOnPress()} style={styles.playPause}>
                    <Image source={{ uri: PLAY_PAUSE_ICON }} style={styles.playPause}  resizeMethod="resize"/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    albumart: {
        flex: 1,
        // maxWidth: '80%',
        // maxHeight: '80%',
    },
    trackName: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    artistAlbum: {
        textAlign: 'center',
    },
    playPause: {
        flex: 1,
        maxWidth: 20,
    },
});
