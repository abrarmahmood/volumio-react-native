import { ReduxAction } from "./utils";

export const PUSH_STATE = 'PUSH_STATE';
export const PUSH_STATE_TRANSFORMED = 'PUSH_STATE_TRANSFORMED';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const NEXT = 'NEXT';
export const PREV = 'PREV';


export const pushState = (playerState: any): ReduxAction => ({
    type: PUSH_STATE,
    error: null,
    value: playerState,
});

export const pushStateTransformed = (playerState: any): ReduxAction => ({
    type: PUSH_STATE_TRANSFORMED,
    error: null,
    value: playerState,
});

export const handlePlay = (): ReduxAction => ({
    type: PLAY,
    error: null,
    value: null,
});

export const handlePause = (): ReduxAction => ({
    type: PAUSE,
    error: null,
    value: null,
});

export const handleNext = (): ReduxAction => ({
    type: NEXT,
    error: null,
    value: null,
});

export const handlePrev = (): ReduxAction => ({
    type: PREV,
    error: null,
    value: null,
});
