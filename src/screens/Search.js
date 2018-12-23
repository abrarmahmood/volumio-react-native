import React from "react";
import { View, Text, Button, FlatList, SectionList } from "react-native";
import ItemList from '../components/item-list';


export default class SearchScreen extends React.Component {
    state = { data: [] };
    static navigationOptions = ({ navigation }) => {
        const str = navigation.getParam('searchText', 'london grammar');

        return {
            title: `Search results for "${str}"`
        };
    };

    componentDidMount() {
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', 'london grammar');
        console.log('hello')

        fetch('http://192.168.1.65:8080/search')
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data.navigation.lists })
            })
            .catch(e => console.log(e));
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