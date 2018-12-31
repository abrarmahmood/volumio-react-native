import React from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight } from "react-native";
import { TrackItem } from "../../sagas/mappers/transform-tracks";
import { FolderItem } from "../../sagas/mappers/transform-folders";
import { SearchItem } from "../../sagas/mappers/transform-search";

export interface ListItemOptions {
    onItemPress?(obj: any): void;
    showAlbumArt?: boolean,
}


export const renderListItem = (options: ListItemOptions) => {
    return ({ item, index }: { item: TrackItem | FolderItem | SearchItem, index: number }) => {
        let onPress = undefined;
        if (typeof options.onItemPress !== 'undefined') {
            onPress = () => options.onItemPress(item);
        }

        return (
            <TouchableHighlight onPress={onPress} underlayColor='rgba(255,255,255,0.25)'>
                <View style={styles.listItemContainer}>
                    {options.showAlbumArt === true && <Image
                        source={{ uri: item.albumart }}
                        style={styles.listItemArt}
                    />}
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.text1}>{item.title}</Text>
                        <Text style={styles.text2}>{item.artist}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'transparent',
        height: 60,
    },
    listItemTextContainer: {
        flex: 2,
        padding: 5,
    },
    listItemArt: {
        flex: 1,
        maxWidth: 50,
        maxHeight: 50,
    },
    text1: {
        color: 'white',
        fontSize: 15,
    },
    text2: {
        color: 'white',
        fontSize: 12,
    },
});
