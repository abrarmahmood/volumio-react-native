import { ReduxAction } from "./utils";

export const PUSH_STATE = 'PUSH_STATE';
export const PUSH_STATE_TRANSFORMED = 'PUSH_STATE_TRANSFORMED';


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
