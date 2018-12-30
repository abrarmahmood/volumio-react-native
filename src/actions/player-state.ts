import { ReduxAction } from "./utils";

export const PUSH_STATE = 'PUSH_STATE';
export const PUSH_STATE_TRANSFORMED = 'PUSH_STATE_TRANSFORMED';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const NEXT = 'NEXT';
export const PREV = 'PREV';
export const ADD_PLAY = 'ADD_PLAY';
export const SET_RANDOM = 'SET_RANDOM';
export const SET_REPEAT = 'SET_REPEAT';
export const SEEK = 'SEEK';
export const GET_STATE = 'GET_STATE';


export const pushState = (playerState: any): ReduxAction => ({
    type: PUSH_STATE,
    error: null,
    payload: playerState,
});

export const pushStateTransformed = (playerState: any): ReduxAction => ({
    type: PUSH_STATE_TRANSFORMED,
    error: null,
    payload: playerState,
});

export const handlePlay = (): ReduxAction => ({
    type: PLAY,
    error: null,
    payload: null,
});

export const handlePause = (): ReduxAction => ({
    type: PAUSE,
    error: null,
    payload: null,
});

export const handleNext = (): ReduxAction => ({
    type: NEXT,
    error: null,
    payload: null,
});

export const handlePrev = (): ReduxAction => ({
    type: PREV,
    error: null,
    payload: null,
});

export const addPlay = (uri: string, title: string, albumart: string): ReduxAction => ({
    type: ADD_PLAY,
    error: null,
    payload: {uri, title, albumart, service: 'streaming_services'},
});

export const setRandom = (bool: boolean): ReduxAction => ({
    type: SET_RANDOM,
    error: null,
    payload: {value: bool},
});

export const setRepeat = (bool: boolean): ReduxAction => ({
    type: SET_REPEAT,
    error: null,
    payload: {value: bool},
});

export const handleSeek = (seconds: number): ReduxAction => ({
    type: SEEK,
    error: null,
    payload: seconds,
});

export const getState = (): ReduxAction => ({
    type: GET_STATE,
    error: null,
    payload: null,
});
