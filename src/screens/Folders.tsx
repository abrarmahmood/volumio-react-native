import React from "react";
import { connect } from 'react-redux';
import { StatusBar, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import { fetchFolders } from "../actions/browse-library";
import Footer from "../components/Footer";
import QueueList from "../components/queue-list";
import { FolderItem } from "../sagas/mappers/transform-folders";


export interface FoldersNavState {
    uri: string;
    prevUri: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    fetch(uri: string, prevUri?: string): void;
    results: Array<FolderItem>;
}

@(connect(
    (state: any) => ({
        results: state.folders.value,
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
        const obj: any = this.props.results[index];
        const uri = this.props.navigation.getParam('uri');

        const state: TracksNavState = {
            uri: obj.uri,
            prevUri: uri || 'tidal://'
        };

        this.props.navigation.push('Tracks', { state })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                {/* Artist/Album/Playlist info goes here */}
                <ScrollView>
                    <QueueList data={this.props.results} onPress={index => this.onPress(index)} />
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
