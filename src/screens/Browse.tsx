import React from "react";
import { View } from "react-native";
import ItemList from '../components/item-list';
import volumioService from '../services/volumio-service';
import { NavigationInjectedProps } from "react-navigation";


interface State {
    data: Array<object>
}

export default class SearchScreen extends React.Component<NavigationInjectedProps, State> {
    state = { data: [] };
    static navigationOptions = ({ navigation }) => {
        const searchText = navigation.getParam('searchText');
        const uri = navigation.getParam('uri');
        let title = `uri: ${uri}`;

        if (typeof searchText !== 'undefined') {
            title = `Results for ${searchText}`
        }

        return { title };
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText');
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
        const searchText = navigation.getParam('searchText');
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

        this.props.navigation.push('Browse', {
            uri: obj.uri,
            prevUri: uri || 'tidal://',
        })
    }

    render() {
        const data = ItemList.mapData(this.state.data);

        return (
            <View style={{ flex: 1 }}>
                <ItemList data={data} onPress={data => this.onPress(data)} />
            </View>
        )
    }
}
