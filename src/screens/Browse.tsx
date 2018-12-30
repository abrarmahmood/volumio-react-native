import React from "react";
import { connect } from 'react-redux';
import { StatusBar, TextInput, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationInjectedProps, withNavigationFocus, NavigationFocusInjectedProps } from "react-navigation";
import ItemList from '../components/item-list';
import { searchLibrary, browseLibrary } from "../actions/browse-library";
import { BrowseSearchResult } from "../sagas/push-browse-transform";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";


export interface BrowseNavState {
    searching: boolean;
    searchText: string;
    uri: string;
    prevUri: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    search(term: string): void;
    addPlay(uri: string, title: string, albumart: string): void;
    browse(uri: string, prevUri?: string): void;
    results: Array<BrowseSearchResult>;
}

interface State {
    searching: boolean;
    searchText: string;
}


@(connect(
    (state: any) => ({
        results: state.library.value,
    }),
    {
        search: searchLibrary,
        browse: browseLibrary,
        addPlay: addPlay,
    }
) as any)
@(withNavigationFocus as any)
export default class SearchScreen extends React.Component<Props, State> {
    state = { searching: false, searchText: '' };

    static navigationOptions = {
        title: 'Browse',
    };

    private fetchBrowseLibrary(props: Props) {
        const navState: BrowseNavState = props.navigation.getParam('state');

        if (typeof navState === 'undefined') {
            this.setState({ searching: true, searchText: '' });
            props.search('');
            return;
        }

        if (navState.searching) {
            this.setState({ searching: true, searchText: navState.searchText });
            props.search(navState.searchText);
        } else {
            props.browse(navState.uri, navState.prevUri);
        }
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

    onPress(obj: any): void {
        const uri = this.props.navigation.getParam('uri');

        if (obj.type === 'song') {
            this.props.addPlay(obj.uri, obj.title, obj.albumart);
            this.props.navigation.push('Play');
        } else {
            // TOOD: This state should go in Redux
            const state: BrowseNavState = {
                searching: false,
                searchText: '',
                uri: obj.uri,
                prevUri: uri || 'tidal://'
            };

            this.props.navigation.push('Browse', { state })
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
            <SafeAreaView style={styles.container}>
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
