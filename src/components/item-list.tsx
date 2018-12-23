import React from "react";
import { Text, SectionList, StyleSheet, View, Image } from "react-native";


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

interface Props {
    data: object
}

export default class ItemList extends React.Component<Props> {
    static mapData (data: any) {
        const ensureAlbumArt = (url = '') => {
            if (url.includes('http')) {
                return url;
            }
            return DEFAULT_ALBUM_ART;
        }
        const sections = data.map((li: any) => {
            return {
                title: li.title,
                data: li.items.map(({ title, albumart, uri }) => ({
                    title,
                    albumart: ensureAlbumArt(albumart),
                    uri,
                }))
            };
        });

        return sections;
    }

    renderHeader = ({ section: { title } }) => {
        return (
            <Text style={styles.listHeader}>{title}</Text>
        );
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItemContainer}>
                <Image
                    source={{uri: item.albumart}}
                    // style={styles.listItemArt}
                    style={{
                        flex: 1,
                        maxWidth: 50,
                        maxHeight: 50,
                    }}
                />
                <Text key={index} style={styles.listItemText}>
                    {item.title}
                </Text>
            </View>
        );
    }

    render() {
        const { data } = this.props;

        return (
            <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderHeader}
                sections={data}
                keyExtractor={(item, index) => JSON.stringify(item) + index}
            />
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
    listItemText: {
        flex: 2,
        padding: 5,
        color: 'gray'
    },
    listItemArt: {
        flex: 1,
        width: 10,
        height: 10,
    },
    listHeader: {
        backgroundColor: 'white',
        // borderBottomWidth: 3,
        // borderBottomColor: 'gray',
        fontWeight: 'bold',
        padding: 10,
    }
});
