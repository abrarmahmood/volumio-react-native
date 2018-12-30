import React from "react";
import { connect } from 'react-redux';
import { StatusBar, TextInput, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import ItemList from '../components/item-list';
import { browseLibrary } from "../actions/browse-library";
import { BrowseSearchResult } from "../sagas/push-browse-transform";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";
import { BrowseNavState } from "./Browse";
import { searchLibrary } from "../actions/search-library";


export interface SearchNavState {
    searching: boolean;
    searchText: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    search(term: string): void;
    addPlay(uri: string, title: string, albumart: string): void;
    browse(uri: string, prevUri?: string): void;
    results: Array<BrowseSearchResult>;
}

interface State {
    searchText: string;
}


@(connect(
    (state: any) => ({
        results: state.search.value,
    }),
    {
        search: searchLibrary,
        browse: browseLibrary,
        addPlay: addPlay,
    }
) as any)
export default class SearchScreen extends React.Component<Props, State> {
    state = { searchText: '' };

    static navigationOptions = {
        title: 'Browse',
    };

    componentDidMount() {
        const navState: SearchNavState = this.props.navigation.getParam('state');

        this.setState({ searchText: navState.searchText });
        this.props.search(navState.searchText);
    }

    // TODO: This needs to handle clicks on artists, albums, playlists or songs
    onPress(obj: any): void {
        if (obj.type === 'song') {
            this.props.addPlay(obj.uri, obj.title, obj.albumart);
            this.props.navigation.push('Play');
        } else {
            const state: BrowseNavState = {
                uri: obj.uri,
                prevUri: 'tidal://'
            };

            this.props.browse(obj.uri, 'tidal://');
            this.props.navigation.push('Browse', { state })
        }
    }

    onSearchInput = (searchInput: string) => {
        if (searchInput.length > 2) {
            this.props.search(searchInput);
        }
    }

    render() {
        const { searchText } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    style={styles.textInput}
                    placeholder='Search...'
                    placeholderTextColor='#5b5b5b'
                    defaultValue={searchText}
                    onChangeText={this.onSearchInput}
                />
                <ScrollView>
                    <ItemList data={this.props.results} onPress={data => this.onPress(data)} />
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
