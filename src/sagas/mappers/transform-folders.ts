import { takeEvery, put } from 'redux-saga/effects'
import { PUSH_BROWSE_FOLDERS, pushBrowseFoldersTransformed } from '../../actions/browse-library';
import { ReduxAction } from '../../actions/utils';
import { SagaParams } from '..';


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

const ensureAlbumArt = (url = '') => {
    if (url.includes('http')) {
        return url;
    }
    return DEFAULT_ALBUM_ART;
}

export type FolderItem = {
    type: string
    title: string;
    albumart: string;
    artist: string;
    service: string;
    uri: string;
    unmanaged?: any;
}

const makeListItem = (obj: any): FolderItem => {
    return {
        type: obj.type,
        title: obj.title,
        albumart: ensureAlbumArt(obj.albumart),
        service: obj.service,
        artist: obj.artist,
        uri: obj.uri,
        // unmanaged: obj,
    }
}

function mapServerResponse(response: any): Array<FolderItem> {
    const group = response.navigation.lists[0];
    const result = group.items.map(makeListItem);

    return result;
}


export const pushBrowseFoldersTransform = function* (_params: SagaParams) {
    yield takeEvery(PUSH_BROWSE_FOLDERS, function* (action: ReduxAction) {
        const { payload: value } = action;
        const transformed = mapServerResponse(value);

        yield put(pushBrowseFoldersTransformed(transformed));
    });
}
