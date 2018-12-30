import React from "react";
import { connect } from 'react-redux';
import { StatusBar, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationInjectedProps, withNavigationFocus, NavigationFocusInjectedProps } from "react-navigation";
import { browseLibrary } from "../actions/browse-library";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";
import QueueList from "../components/queue-list";
import { FolderItem } from "../sagas/transform-folders";
import { TrackItem } from "../sagas/transform-tracks";


export interface BrowseNavState {
    uri: string;
    prevUri: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    addPlay(uri: string, title: string, albumart: string): void;
    browse(uri: string, prevUri?: string): void;
    resultsFolders: Array<FolderItem>;
    resultsTracks: Array<TrackItem>;
}

@(connect(
    (state: any) => ({
        resultsFolders: state.folders.value,
        resultsTracks: state.tracks.value,
    }),
    {
        browse: browseLibrary,
        addPlay: addPlay,
    }
) as any)
@(withNavigationFocus as any)
export default class SearchScreen extends React.Component<Props> {
    static navigationOptions = {
        title: 'Browse',
    };

    private fetchBrowseLibrary(props: Props) {
        const navState: BrowseNavState = props.navigation.getParam('state');

        props.browse(navState.uri, navState.prevUri);
    }

    componentDidMount() {
        this.fetchBrowseLibrary(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
        // If user pressed 'back' from a browse screen 2 to browse screen 1
        if (nextProps.isFocused === true && this.props.isFocused === false) {
            this.fetchBrowseLibrary(this.props);
        }
    }

    onPress(index: number): void {
        const navState: BrowseNavState = this.props.navigation.getParam('state');
        const isFolder = navState.uri.split('/').length < 5;
        const {resultsFolders, resultsTracks} = this.props;
        const obj: any = (isFolder ? resultsFolders : resultsTracks)[index];

        const uri = this.props.navigation.getParam('uri');

        if (obj.type === 'song') {
            this.props.addPlay(obj.uri, obj.title, obj.albumart);
            this.props.navigation.push('Play');
        } else {
            // TOOD: This state should go in Redux
            const state: BrowseNavState = {
                uri: obj.uri,
                prevUri: uri || 'tidal://'
            };

            this.props.navigation.push('Browse', { state })
        }
    }

    render() {
        // Hacked until I seperate this screen in to folders/tracks
        const navState: BrowseNavState = this.props.navigation.getParam('state');
        const isFolder = navState.uri.split('/').length < 5;
        const {resultsFolders, resultsTracks} = this.props;


        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                {/* Artist/Album/Playlist info goes here */}
                <ScrollView>
                    <QueueList
                        data={isFolder ? resultsFolders : resultsTracks}
                        onPress={index => this.onPress(index)}
                    />
                </ScrollView>
                <Footer />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    textInput: {
        backgroundColor: '#191919',
        color: 'white',
        fontSize: 18,
        margin: 10,
        padding: 5,
        borderRadius: 5,
    },
});
