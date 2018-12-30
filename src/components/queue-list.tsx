import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, FlatList, View } from "react-native";
import { QueueItem } from "../sagas/mappers/transform-queue";
import { FolderItem } from "../sagas/mappers/transform-folders";
import { TrackItem } from "../sagas/mappers/transform-tracks";


interface Props {
    data: Array<QueueItem | FolderItem | TrackItem>;
    removable?: boolean;
    onPress(index: number): any;
    onDeletePress?(index: number): any;
}

export default class QueueList extends React.Component<Props> {
    onItemPress = (index: number) => {
        this.props.onPress(index);
    }

    onDeletePress = (index: number) => {
        if (typeof this.props.onDeletePress !== 'undefined') {
            this.props.onDeletePress(index);
        }
    }

    renderItem = ({ item, index }: { item: QueueItem | FolderItem | TrackItem, index: number }) => {
        const {removable = false} = this.props;

        return (
            <View style={styles.sectionList}>
                <TouchableOpacity style={styles.listItemContainer} onPress={() => this.onItemPress(index)}>
                    <Image
                        source={{ uri: item.albumart }}
                        style={styles.listItemArt}
                    />
                    <Text key={index} style={styles.listItemText}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
                {removable && <TouchableOpacity onPress={() => this.onDeletePress(index)} style={styles.modifierButton}>
                    <Image
                        // FIXME: do not use external links for images
                        source={{ uri: 'data:image/png;base64,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' }}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>}
            </View>
        );
    }

    render() {
        const { data } = this.props;

        return (
            <FlatList
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    sectionList: {
        flexDirection: 'row',
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
    deleteIcon: {
        position: 'absolute',
        width: 20,
        height: 20,
        right: 15,
        top: 15,
    },
    modifierButton: {
        maxWidth: 60,
        flex: 1,
        // borderColor: 'red',
        // borderWidth: 5,
    },
});
