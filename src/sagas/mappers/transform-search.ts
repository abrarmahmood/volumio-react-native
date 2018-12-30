import { takeEvery, put } from 'redux-saga/effects'
import { ReduxAction } from '../../actions/utils';
import { SagaParams } from '..';
import { PUSH_SEARCH_LIBRARY, pushSearchLibraryTransformed } from '../../actions/search-library';


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

const ensureAlbumArt = (url = '') => {
    if (url.includes('http')) {
        return url;
    }
    return DEFAULT_ALBUM_ART;
}

export enum ItemTypes {
    ARTIST = 'artist',
    ALBUM = 'album',
    PLAYLIST = 'playlist',
    TRACK = 'track',
    UNKNOWN = 'unknown',
}

export type SearchItem = {
    itemType: ItemTypes,
    type: string
    title: string;
    albumart: string;
    service: string;
    uri: string;
    unmanaged?: any;
}

export type BrowseSearchResult = {
    title: string;
    data: Array<SearchItem>
}

const parseItemType = (title: string): ItemTypes => {
    let libraryType: ItemTypes = ItemTypes.UNKNOWN;
    const sanitized = title.trim().toLowerCase();

    if (sanitized.includes('artists')) {
        libraryType = ItemTypes.ARTIST;
    } else if (sanitized.includes('albums')) {
        libraryType = ItemTypes.ALBUM;
    } else if (sanitized.includes('playlists')) {
        libraryType = ItemTypes.PLAYLIST;
    } else if (sanitized.includes('tracks')) {
        libraryType = ItemTypes.TRACK;
    }

    return libraryType;
}

const makeListItem = (title: string) => (obj: any): SearchItem => {
    return {
        itemType: parseItemType(title),
        type: obj.type,
        title: obj.title,
        albumart: ensureAlbumArt(obj.albumart),
        service: obj.service,
        uri: obj.uri,
        // unmanaged: obj,
    }
}

function mapServerResponse(response: any): Array<BrowseSearchResult> {
    const groups = response.navigation.lists;
    const result = groups.map((group: any) => {
        const listItems = group.items.map(makeListItem(group.title));

        return {
            title: group.title,
            data: listItems,
        };
    });

    return result;
}


export const pushSearchTransform = function* (_params: SagaParams) {
    yield takeEvery(PUSH_SEARCH_LIBRARY, function* (action: ReduxAction) {
        const { payload: value } = action;
        const transformed = mapServerResponse(value);

        yield put(pushSearchLibraryTransformed(transformed));
    });
}
