import React from "react";
import { connect } from 'react-redux';
import { StatusBar, TextInput, StyleSheet, ScrollView, SafeAreaView, SectionList } from "react-native";
import { NavigationInjectedProps, NavigationFocusInjectedProps } from "react-navigation";
import { BrowseSearchResult, SearchItem, ItemTypes } from "../sagas/mappers/transform-search";
import { addPlay } from "../actions/player-state";
import Footer from "../components/Footer";
import { searchLibrary } from "../actions/search-library";
import { TracksNavState } from "./Tracks";
import { FoldersNavState } from "./Folders";
import { PlayerState } from "../sagas/mappers/transform-state";
import BackgroundAlbumArt from "../components/background-album-art";
import Header from "../components/player/Header";
import { renderListItem, renderListHeader, listKeyExtractor, renderListSeparator } from "../components/list";


export interface SearchNavState {
    searching: boolean;
    searchText: string;
}

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
    search(term: string): void;
    addPlay(uri: string, title: string, albumart: string): void;
    results: Array<BrowseSearchResult>;
    playerState: PlayerState;
}

interface State {
    searchText: string;
}


@(connect(
    (state: any) => ({
        results: state.search.value,
        playerState: state.playerState.value,
    }),
    {
        search: searchLibrary,
        addPlay: addPlay,
    }
) as any)
export default class SearchScreen extends React.Component<Props, State> {
    state = { searchText: '' };

    static navigationOptions = {
        title: 'Browse',
    };

    componentDidMount() {
        const navState: SearchNavState = this.props.navigation.getParam('state');

        this.setState({ searchText: navState.searchText });
        this.props.search(navState.searchText);
    }

    onPress(obj: SearchItem): void {
        let state: FoldersNavState | TracksNavState;

        switch (obj.itemType) {
            case ItemTypes.ARTIST:
                state = {
                    uri: obj.uri,
                    prevUri: 'tidal://',
                    title: obj.title,
                    albumart: obj.albumart,
                };
                this.props.navigation.push('Folders', { state });
                break;
            case ItemTypes.ALBUM:
            case ItemTypes.PLAYLIST:
                state = {
                    uri: obj.uri,
                    prevUri: 'tidal://',
                    title: obj.title,
                    albumart: obj.albumart,
                    artist: obj.artist,
                };
                this.props.navigation.push('Tracks', { state });
                break;
            case ItemTypes.TRACK:
                this.props.addPlay(obj.uri, obj.title, obj.albumart);
                this.props.navigation.push('Play');
                break;
            default:
                throw new Error(`Failed parsing item type ${obj.type}`);
        }
    }

    onSearchInput = (searchInput: string) => {
        if (searchInput.length > 2) {
            this.props.search(searchInput);
        }
    }

    render() {
        const { searchText } = this.state;
        const { playerState } = this.props;

        return (
            <BackgroundAlbumArt albumart={playerState.albumart}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Header message="Tracks" onDownPress={() => this.props.navigation.goBack()} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Search...'
                        placeholderTextColor='#5b5b5b'
                        defaultValue={searchText}
                        onChangeText={this.onSearchInput}
                    />
                    <ScrollView>
                        <SectionList
                            renderItem={renderListItem({
                                onItemPress: (item: any) => this.onPress(item),
                                showAlbumArt: true,
                            })}
                            renderSectionHeader={renderListHeader}
                            sections={this.props.results}
                            keyExtractor={listKeyExtractor}
                            ItemSeparatorComponent={renderListSeparator}
                        />
                    </ScrollView>
                    <Footer />
                </SafeAreaView>
            </BackgroundAlbumArt>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        fontSize: 18,
        margin: 10,
        padding: 5,
        borderRadius: 5,
    },
});
