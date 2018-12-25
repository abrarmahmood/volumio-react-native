import { takeEvery, put } from 'redux-saga/effects'
import { PUSH_STATE, pushStateTransformed } from '../actions/player-state';
import { ReduxAction } from '../actions/utils';


const ensure = (obj: any) => (property: string, defaultValue: any): any => {
    const result = (typeof obj[property] !== "undefined" && obj[property] !== null) ? obj[property] : defaultValue;

    return result;
}

export type PlayerState = {
    status: string;
    title: string;
    artist: string;
    album: string;
    albumart: string;
    service: string;
    uri: string;
    trackType: string;
    samplerate: string;
    bitdepth: string;

    position: number;
    seek: number;
    duration: number;
    volume: number;
    channels: number;

    random: boolean;
    repeat: boolean;
    repeatSingle: boolean;
    consume: boolean;
    disableVolumeControl: boolean;
    mute: boolean;
    updatedb: boolean;
    volatile: boolean;
    stream: boolean;
}

export function mapServerResponse(response: any = {}): PlayerState {
    const _ensure = ensure(response);

    const result = {
        status: _ensure('status', 'stop'),
        title: _ensure('title', ''),
        artist: _ensure('artist', ''),
        album: _ensure('album', ''),
        albumart: _ensure('albumart', undefined), // special case so <Image /> doesn't complain
        service: _ensure('service', 'unknown'),
        uri: _ensure('uri', ''),
        trackType: _ensure('trackType', ''),
        samplerate: _ensure('samplerate', ''),
        bitdepth: _ensure('bitdepth', ''),
        position: _ensure('position', 0),
        seek: _ensure('seek', 0),
        duration: _ensure('duration', 0),
        volume: _ensure('volume', 100),
        channels: _ensure('channels', 2),
        random: _ensure('random', false),
        repeat: _ensure('repeat', false),
        repeatSingle: _ensure('repeatSingle', false),
        consume: _ensure('consume', false),
        disableVolumeControl: _ensure('disableVolumeControl', false),
        mute: _ensure('mute', false),
        updatedb: _ensure('updatedb', false),
        volatile: _ensure('volatile', false),
        stream: _ensure('stream', false),
    };

    return result;
}


export const pushStateTransform = function* (params: any) {
    yield takeEvery(PUSH_STATE, function* (action: ReduxAction) {
        const { value } = action;
        const transformed = mapServerResponse(value);

        yield put(pushStateTransformed(transformed));
    });
}
