import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";


interface Props {
    data: any;
    onPress(obj: any): any;
}

export default class QueueList extends React.Component<Props> {
    onItemPress = (item: any) => {
        this.props.onPress(item);
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} onPress={() => this.onItemPress(item)}>
                <Image
                    source={{ uri: item.albumart }}
                    style={styles.listItemArt}
                />
                <Text key={index} style={styles.listItemText}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { data } = this.props;

        return (
            <FlatList
                data={data}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    sectionList: {
        backgroundColor: 'black',
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
        backgroundColor: '#191919',
        color: 'white',
        // borderBottomWidth: 3,
        // borderBottomColor: 'gray',
        fontWeight: 'bold',
        padding: 10,
    }
});
