import React from "react";
import { connect } from 'react-redux';
import { StatusBar, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import { fetchTracks } from "../actions/browse-library";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";
import QueueList from "../components/queue-list";
import { TrackItem } from "../sagas/transform-tracks";


export interface BrowseNavState {
    uri: string;
    prevUri: string;
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

    private fetchBrowseLibrary(props: Props) {
        const navState: BrowseNavState = props.navigation.getParam('state');

        props.fetch(navState.uri, navState.prevUri);
    }

    componentDidMount() {
        this.fetchBrowseLibrary(this.props);
    }

    onPress(index: number): void {
        const obj: any = this.props.results[index];

        this.props.addPlay(obj.uri, obj.title, obj.albumart);
        this.props.navigation.push('Play');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                {/* Artist/Album/Playlist info goes here */}
                <ScrollView>
                    <QueueList
                        data={this.props.results}
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
});
