import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Image, View, Text, FlatList } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import { fetchTracks } from "../actions/browse-library";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";
import { TrackItem } from "../sagas/mappers/transform-tracks";
import BackgroundAlbumArt from "../components/background-album-art";
import Header from "../components/player/Header";
import { renderListItem, listKeyExtractor, renderListSeparator } from "../components/list";


export interface TracksNavState {
    uri: string;
    prevUri: string;
    title: string;
    artist: string;
    albumart: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    fetch(uri: string, prevUri?: string): void;
    addPlay(uri: string, title: string, albumart: string): void;
    results: Array<TrackItem>;
}

@(connect(
    (state: any) => ({
        results: state.tracks.value,
    }),
    {
        fetch: fetchTracks,
        addPlay: addPlay,
    }
) as any)
export default class SearchScreen extends React.Component<Props> {
    static navigationOptions = {
        title: 'Browse',
    };

    componentDidMount() {
        const navState: TracksNavState = this.props.navigation.getParam('state');

        this.props.fetch(navState.uri, navState.prevUri);
    }

    onPress(obj: TrackItem): void {
        this.props.addPlay(obj.uri, obj.title, obj.albumart);
        this.props.navigation.push('Play');
    }

    render() {
        const { albumart, title, artist }: TracksNavState = this.props.navigation.getParam('state');

        return (
            <BackgroundAlbumArt albumart={albumart}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Header message="Tracks" onDownPress={() => this.props.navigation.goBack()} />
                    {/* Artist/Album/Playlist info goes here */}
                    <View style={styles.albumInfoContainer}>
                        <Image source={{uri: albumart}} style={styles.albumImage} />
                        <Text style={styles.albumName}>{title}</Text>
                        <Text style={styles.albumArtistName}>{artist}</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                            renderItem={renderListItem({
                                onItemPress: (item: any) => this.onPress(item),
                            })}
                            data={this.props.results}
                            keyExtractor={listKeyExtractor}
                            ItemSeparatorComponent={renderListSeparator}
                        />
                    </ScrollView>
                    <Footer />
                </SafeAreaView>
            </BackgroundAlbumArt>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    albumInfoContainer: {
        // TODO: Use flex
        width: '100%',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumImage: {
        width: 200,
        height: 200,
    },
    albumName: {
        color: 'white',
        fontSize: 11,
        padding: 8,
        fontWeight: 'bold',
    },
    albumArtistName: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'normal',
    },
});
