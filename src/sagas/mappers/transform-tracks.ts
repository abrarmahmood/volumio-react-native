import { takeEvery, put } from 'redux-saga/effects'
import { PUSH_BROWSE_TRACKS, pushBrowseTracksTransformed } from '../../actions/browse-library';
import { ReduxAction } from '../../actions/utils';
import { SagaParams } from '..';


const DEFAULT_ALBUM_ART = 'https://media.npr.org/assets/img/2014/10/29/icon-songswelove_sq-63f2f310c2ba4797b8e9e87a7c9dcf9acfb75407-s800-c85.png';

const ensureAlbumArt = (url = '') => {
    if (url.includes('http')) {
        return url;
    }
    return DEFAULT_ALBUM_ART;
}

export type TrackItem = {
    type: string
    title: string;
    albumart: string;
    artist: string;
    service: string;
    uri: string;
    unmanaged?: any;
}

const makeListItem = (obj: any): TrackItem => {
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

function mapServerResponse(response: any): Array<TrackItem> {
    const group = response.navigation.lists[0];
    const result = group.items.map(makeListItem);

    return result;
}


export const pushBrowseTracksTransform = function* (_params: SagaParams) {
    yield takeEvery(PUSH_BROWSE_TRACKS, function* (action: ReduxAction) {
        const { payload: value } = action;
        const transformed = mapServerResponse(value);

        yield put(pushBrowseTracksTransformed(transformed));
    });
}
