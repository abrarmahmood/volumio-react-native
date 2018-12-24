import React from "react";
import { View, StatusBar, TextInput, StyleSheet } from "react-native";
import ItemList from '../components/item-list';
import volumioService from '../services/volumio-service';
import { NavigationInjectedProps, NavigationParams, NavigationScreenProp } from "react-navigation";


// const DEFAULT_SEARCH_TEXT = undefined;
const DEFAULT_SEARCH_TEXT = 'london grammar';

interface State {
    data: Array<object>
}

export default class SearchScreen extends React.Component<NavigationInjectedProps, State> {
    state = { data: [] };
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

    async componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', DEFAULT_SEARCH_TEXT);
        const uri = navigation.getParam('uri');
        const prevUri = navigation.getParam('prevUri');

        try {
            let data = [];
            if (typeof searchText !== 'undefined') {
                data = await volumioService.search(searchText);
            } else {
                data = await volumioService.browse(uri, prevUri);
            }

            this.setState({ data })
        } catch (e) {
            console.log(e);
        }
    }

    async componentWillReceiveProps() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', DEFAULT_SEARCH_TEXT);
        const uri = navigation.getParam('uri');
        const prevUri = navigation.getParam('prevUri');

        try {
            let data = [];
            if (typeof searchText !== 'undefined') {
                data = await volumioService.search(searchText);
            } else {
                data = await volumioService.browse(uri, prevUri);
            }

            this.setState({ data })
        } catch (e) {
            console.log(e);
        }
    }

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

    render() {
        const data = ItemList.mapData(this.state.data);

        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    style={styles.textInput}
                    placeholder='Search...'
                    placeholderTextColor='#5b5b5b'
                />
                <ItemList data={data} onPress={data => this.onPress(data)} />
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
