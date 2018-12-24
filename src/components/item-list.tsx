import React from "react";
import { Text, SectionList, StyleSheet, TouchableOpacity, Image } from "react-native";


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

interface Props {
    data: object
    onPress(obj: any): any
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
                data: li.items.map((item: any) => {
                    const { type, title, albumart, uri, service } = item;
                    return {
                        type,
                        title,
                        albumart: ensureAlbumArt(albumart),
                        service,
                        uri,
                        unmanaged: item,
                    }
                })
            };
        });

        return sections;
    }

    renderHeader = ({ section: { title } }) => {
        return (
            <Text style={styles.listHeader}>{title}</Text>
        );
    }

    onItemPress = (item: any) => {
        this.props.onPress(item);
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} onPress={() => this.onItemPress(item)}>
                <Image
                    source={{uri: item.albumart}}
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
            <SectionList
                style={styles.sectionList}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderHeader}
                sections={data}
                keyExtractor={(item, index) => JSON.stringify(item) + index}
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
