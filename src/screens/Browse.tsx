import React from "react";
import { connect } from 'react-redux';
import { View, StatusBar, TextInput, StyleSheet } from "react-native";
import { NavigationInjectedProps, NavigationParams, NavigationScreenProp } from "react-navigation";
import ItemList from '../components/item-list';
import { search, browse } from '../data-layer/tidal';
import { BrowseSearchResult } from "../data-layer/tidal/map-response";


// const DEFAULT_SEARCH_TEXT = undefined;
const DEFAULT_SEARCH_TEXT = 'london grammar';


interface Props extends NavigationInjectedProps {
    search(term: string): void;
    browse(uri: string, prevUri?: string): void;
    results: Array<BrowseSearchResult>;
}

interface State {
    searchInput: string;
}

class SearchScreen extends React.Component<Props, State> {
    state = { searchInput: '' };

    static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => {
        const searchText = navigation.getParam('searchText', DEFAULT_SEARCH_TEXT);
        const uri = navigation.getParam('uri');
        let title = `uri: ${uri}`;

        if (typeof searchText !== 'undefined') {
            title = `Results for ${searchText}`
        }

        return {
            title: title,
        };
    };

    componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', DEFAULT_SEARCH_TEXT);
        const uri = navigation.getParam('uri');
        const prevUri = navigation.getParam('prevUri');

        if (typeof searchText !== 'undefined') {
            this.props.search(searchText);
        } else {
            this.props.browse(uri, prevUri);
        }
    }

    // componentWillReceiveProps() {
    //     const { navigation } = this.props;
    //     const searchText = navigation.getParam('searchText', DEFAULT_SEARCH_TEXT);
    //     const uri = navigation.getParam('uri');
    //     const prevUri = navigation.getParam('prevUri');

    //     if (typeof searchText !== 'undefined') {
    //         this.props.search(searchText);
    //     } else {
    //         this.props.browse(uri, prevUri);
    //     }
    // }

    onPress(obj: any): void {
        const uri = this.props.navigation.getParam('uri');
        console.log(obj)

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
            this.props.navigation.push('Browse', {
                uri: obj.uri,
                prevUri: uri || 'tidal://',
            })
        }
    }

    onSearchInput = (searchInput: string) => {
        console.log('search input', searchInput);
        this.props.search(searchInput);
        // this.setState({ searchInput });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    style={styles.textInput}
                    placeholder='Search...'
                    placeholderTextColor='#5b5b5b'
                    onChangeText={this.onSearchInput}
                />
                <ItemList data={this.props.results} onPress={data => this.onPress(data)} />
            </View>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        results: state.tidal.results,
    };
};

const mapDispatchToProps = {
    search,
    browse,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);


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
