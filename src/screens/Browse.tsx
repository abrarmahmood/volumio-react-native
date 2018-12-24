import React from "react";
import { connect } from 'react-redux';
import { View, StatusBar, TextInput, StyleSheet } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import ItemList from '../components/item-list';
import { search, browse } from '../data-layer/tidal';
import { BrowseSearchResult } from "../data-layer/tidal/map-response";


const DEFAULT_SEARCH_TEXT = undefined;
// const DEFAULT_SEARCH_TEXT = 'london grammar';

export interface BrowseNavState {
    searching: boolean;
    searchText: string;
    uri: string;
    prevUri: string;
}

interface Props extends NavigationInjectedProps {
    search(term: string): void;
    browse(uri: string, prevUri?: string): void;
    results: Array<BrowseSearchResult>;
}

interface State {
    searching: boolean;
    searchText: string;
}


@connect(
    (state: any) => ({
        results: state.tidal.results,
    }),
    {
        search: search,
        browse: browse,
    }
)
export default class SearchScreen extends React.Component<Props, State> {
    state = { searching: false, searchText: '' };

    static navigationOptions = {
        title: 'Browse',
    };

    componentDidMount() {
        const navState: BrowseNavState = this.props.navigation.getParam('state');

        if (navState.searching) {
            this.setState({searching: true, searchText: navState.searchText });
            this.props.search(navState.searchText);
        } else {
            this.props.browse(navState.uri, navState.prevUri);
        }
    }

    onPress(obj: any): void {
        const uri = this.props.navigation.getParam('uri');

        if (obj.type === 'song') {
            this.props.navigation.push('Play', {
                event: {
                    type: 'addPlay',
                    payload: {
                        uri: obj.uri,
                        title: obj.title,
                        albumart: obj.albumart,
                        service: obj.service,
                    }
                }
            })
        } else {
            // TOOD: This state should go in Redux
            const state: BrowseNavState = {
                searching: false,
                searchText: '',
                uri: obj.uri,
                prevUri: uri || 'tidal://'
            };

            this.props.navigation.push('Browse', {state})
        }
    }

    onSearchInput = (searchInput: string) => {
        console.log('search input', searchInput);
        this.setState({ searching: true });
        if (searchInput.length > 2) {
            this.props.search(searchInput);
        }
    }

    render() {
        const { searching, searchText } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar barStyle="light-content" />
                {searching === true && (
                    <TextInput
                        style={styles.textInput}
                        placeholder='Search...'
                        placeholderTextColor='#5b5b5b'
                        defaultValue={searchText}
                        onChangeText={this.onSearchInput}
                    />
                )}
                <ItemList data={this.props.results} onPress={data => this.onPress(data)} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#191919',
        color: 'white',
        fontSize: 18,
        margin: 10,
        padding: 5,
        borderRadius: 5,
    },
});
