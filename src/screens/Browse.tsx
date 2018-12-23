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
        const type = navigation.getParam('type');
        const id = navigation.getParam('id');
        let title = `type: ${type} id: ${id}`;

        if (typeof searchText !== 'undefined') {
            title = `Results for ${searchText}`
        }

        return { title };
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText');
        const type = navigation.getParam('type');
        const id = navigation.getParam('id');

        try {
            let data = [];
            if (typeof searchText !== 'undefined') {
                data = await volumioService.search(searchText);
            } else {
                data = await volumioService.browse(type, id);
            }

            this.setState({ data })
        } catch (e) {
            console.log(e);
        }
    }

    async componentWillReceiveProps() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText');
        const type = navigation.getParam('type');
        const id = navigation.getParam('id');

        try {
            let data = [];
            if (typeof searchText !== 'undefined') {
                data = await volumioService.search(searchText);
            } else {
                data = await volumioService.browse(type, id);
            }

            this.setState({ data })
        } catch (e) {
            console.log(e);
        }
    }

    onPress(obj: any): void {
        this.props.navigation.push('Browse', {
            type: obj.type,
            id: obj.id
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
