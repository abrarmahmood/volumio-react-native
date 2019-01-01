import React from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity } from "react-native";
import { TrackItem } from "../../sagas/mappers/transform-tracks";
import { FolderItem } from "../../sagas/mappers/transform-folders";
import { SearchItem } from "../../sagas/mappers/transform-search";


export interface ListItemOptions {
    onItemPress?(obj: any): void;
    onAltPress?(obj: any): void;
    showAlbumArt?: boolean,
    icon?: string,
}

export const renderListItem = (options: ListItemOptions) => {
    return ({ item, index }: { item: TrackItem | FolderItem | SearchItem, index: number }) => {
        let onPress = undefined;
        if (typeof options.onItemPress !== 'undefined') {
            onPress = () => options.onItemPress(item);
        }

        let onAltPress = undefined;
        if (typeof options.onAltPress !== 'undefined') {
            onAltPress = () => options.onAltPress(item);
        }

        let iconImage: any = false;
        switch (options.icon) {
            case 'more':
                iconImage = require('./img/more_vert.png');
                break;
            case 'remove':
                iconImage = require('./img/clear.png');
                break;
            default:
                iconImage = false;
                break;
        }

        return (
            <TouchableHighlight onPress={onPress} underlayColor='rgba(255,255,255,0.25)'>
                <View style={styles.container}>
                    {options.showAlbumArt === true && <Image
                        source={{ uri: item.albumart }}
                        style={styles.image}
                    />}
                    <View style={styles.textContainer}>
                        <Text style={styles.text1}>{item.title}</Text>
                        <Text style={styles.text2}>{item.artist}</Text>
                    </View>
                    {iconImage && <TouchableOpacity style={styles.altContainer} onPress={onAltPress}>
                        <Image
                            source={iconImage}
                            style={styles.altImage}
                        />
                    </TouchableOpacity>}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'transparent',
        height: 60,
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer: {
        flex: 1,
        padding: 5,
    },
    altContainer: {
        width: 30,
        height: '100%',
        position: 'relative',
        // backgroundColor: 'red',
    },
    altImage: {
        position: 'absolute',
        top: 12,
    },
    text1: {
        color: 'white',
        fontSize: 15,
        paddingTop: 3,
        paddingBottom: 3,
    },
    text2: {
        color: 'white',
        fontSize: 12,
    },
});
