import { takeEvery, put } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import { PUSH_SEARCH_LIBRARY, pushSearchLibraryTransformed } from '../actions/search-library';


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

const ensureAlbumArt = (url = '') => {
    if (url.includes('http')) {
        return url;
    }
    return DEFAULT_ALBUM_ART;
}

export type ListItem = {
    type: string
    title: string;
    albumart: string;
    service: string;
    uri: string;
    unmanaged?: any;
}

export type BrowseSearchResult = {
    title: string;
    data: Array<ListItem>
}

const makeListItem = (obj: any): ListItem => {
    return {
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
        const listItems = group.items.map(makeListItem);

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
