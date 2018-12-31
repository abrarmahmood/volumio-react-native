import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text, View } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import { fetchFolders } from "../actions/browse-library";
import Footer from "../components/Footer";
import QueueList from "../components/queue-list";
import { FolderItem } from "../sagas/mappers/transform-folders";
import { TracksNavState } from "./Tracks";
import BackgroundAlbumArt from "../components/background-album-art";
import { PlayerState } from "../sagas/mappers/transform-state";
import Header from "../components/player/Header";


export interface FoldersNavState {
    uri: string;
    prevUri: string;
    title: string;
    albumart: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    fetch(uri: string, prevUri?: string): void;
    results: Array<FolderItem>;
    playerState: PlayerState;
}

@(connect(
    (state: any) => ({
        results: state.folders.value,
        playerState: state.playerState.value,
    }),
    {
        fetch: fetchFolders,
    }
) as any)
export default class FoldersScreen extends React.Component<Props> {
    static navigationOptions = {
        title: 'Folders',
    };

    private fetchBrowseLibrary(props: Props) {
        const navState: FoldersNavState = props.navigation.getParam('state');

        props.fetch(navState.uri, navState.prevUri);
    }

    componentDidMount() {
        this.fetchBrowseLibrary(this.props);
    }

    onPress(index: number): void {
        const obj: FolderItem = this.props.results[index];
        const uri = this.props.navigation.getParam('uri');

        const state: TracksNavState = {
            uri: obj.uri,
            prevUri: uri || 'tidal://',
            albumart: obj.albumart,
            artist: obj.artist,
            title: obj.title,
        };

        this.props.navigation.push('Tracks', { state })
    }

    render() {
        const { playerState } = this.props;
        const { title }: FoldersNavState = this.props.navigation.getParam('state');

        return (
            <BackgroundAlbumArt albumart={playerState.albumart}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Header message="Folders" onDownPress={() => this.props.navigation.goBack()} />
                    {/* Artist/Album/Playlist info goes here */}
                    <View style={styles.albumInfoContainer}>
                        <Text style={styles.artistName}>{title}</Text>
                    </View>
                    <ScrollView>
                        <QueueList albumart data={this.props.results} onPress={index => this.onPress(index)} />
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
    },
    albumInfoContainer: {
        // TODO: Use flex
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    artistName: {
        color: 'white',
        fontSize: 15,
        padding: 8,
        fontWeight: 'bold',
    },
});
