import React from "react";
import { View } from "react-native";
import ItemList from '../components/item-list';
import volumioService from '../services/volumio-service';


export default class SearchScreen extends React.Component {
    state = { data: [] };
    static navigationOptions = ({ navigation }) => {
        const str = navigation.getParam('searchText', 'london grammar');

        return {
            title: `${str}`
        };
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', 'london grammar');

        try {
            const data = await volumioService.search(searchText);

            this.setState({ data })
        } catch (e) {
            console.log(e);
        }
    }
    
    render() {
        const data = ItemList.mapData(this.state.data);

        return (
            <View style={{ flex: 1 }}>
                <ItemList data={data} />
            </View>
        )
    }
}