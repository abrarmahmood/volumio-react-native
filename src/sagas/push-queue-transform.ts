import { takeEvery, put } from 'redux-saga/effects'

import { pushQueueTransformed, PUSH_QUEUE } from '../actions/queue';
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';


const ensure = (obj: any) => (property: string, defaultValue: any): any => {
    const result = (typeof obj[property] !== "undefined" && obj[property] !== null) ? obj[property] : defaultValue;

    return result;
}

export type QueueItem = {
    uri: string;
    service: string;
    name: string;
    title: string;
    artist: string;
    album: string;
    type: string;
    albumart: string;
    tracknumber: number;
    volumenumber: number;
    duration: number;
    explicit: boolean;
}

export function mapServerResponse(response: any = {}): Array<QueueItem> {
    const result = response.map((item: any): QueueItem => {
        const _ensure = ensure(item);

        return {
            uri: _ensure('uri', 'tidal://song/'),
            service: _ensure('service', 'streaming_services'),
            name: _ensure('name', ''),
            title: _ensure('title', ''),
            artist: _ensure('artist', ''),
            album: _ensure('album', ''),
            type: _ensure('type', 'track'),
            albumart: _ensure('albumart', 'https://resources.tidal.com/'),
            tracknumber: _ensure('tracknumber', 0),
            volumenumber: _ensure('volumenumber', 0),
            duration: _ensure('duration', 0),
            explicit: _ensure('explicit', false),
        };
    })

    return result;
}


export const pushQueueTransform = function* (params: SagaParams) {
    yield takeEvery(PUSH_QUEUE, function* (action: ReduxAction) {
        const { payload: value } = action;
        const transformed = mapServerResponse(value);

        yield put(pushQueueTransformed(transformed));
    });
}
