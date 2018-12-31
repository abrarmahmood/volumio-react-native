import React from "react";
import { Text, SectionList, StyleSheet, TouchableOpacity, Image, View, TouchableHighlight } from "react-native";
import { SearchItem, BrowseSearchResult } from "../sagas/mappers/transform-search";


interface Props {
    data: Array<BrowseSearchResult>;
    onPress(obj: any): any
}

export default class ItemList extends React.Component<Props> {
    renderHeader = ({ section: { title } }: any) => {
        return (
            <Text style={styles.listHeader}>{title}</Text>
        );
    }

    onItemPress = (item: SearchItem) => {
        this.props.onPress(item);
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "96%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    marginLeft: "2%",
                    marginRight: "2%",
                }}
            />
        );
    };

    renderItem = ({ item, index }: {item: SearchItem, index: number }) => {
        return (
            <TouchableHighlight onPress={() => this.onItemPress(item)} underlayColor='rgba(255,255,255,0.25)'>
                <View style={styles.listItemContainer}>
                    <Image
                        source={{uri: item.albumart}}
                        style={styles.listItemArt}
                    />
                    <Text key={index} style={styles.listItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return (
                <Text style={styles.noResults}>No results found.</Text>
            );
        }

        return (
            <SectionList
                style={styles.sectionList}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderHeader}
                sections={data}
                keyExtractor={(item, index) => JSON.stringify(item) + index}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

const styles = StyleSheet.create({
    sectionList: {
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'transparent',
        height: 60,
    },
    listItemText: {
        flex: 2,
        padding: 5,
        color: 'white'
    },
    listItemArt: {
        flex: 1,
        maxWidth: 50,
        maxHeight: 50,
    },
    listHeader: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        // borderBottomWidth: 3,
        // borderBottomColor: 'gray',
        fontWeight: 'bold',
        padding: 10,
    },
    noResults: {
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        padding: 5,
    },
});
