import React from "react";
import { View, Text, Button, FlatList, SectionList } from "react-native";
import { searchResult } from './data';
import ItemList from '../components/item-list';


export default class SearchScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const str = navigation.getParam('searchText', 'london grammar');

        return {
            title: `Search results for "${str}"`
        };
    };

    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const searchText = navigation.getParam('searchText', 'london grammar');

        const data = ItemList.mapData(searchResult.navigation.lists)

        return (
            <View style={{ flex: 1 }}>
                <ItemList data={data} />
            </View>
        )
    }
}