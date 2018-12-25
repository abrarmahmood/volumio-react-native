import { ReduxAction } from "./utils";

export const PUSH_STATE = 'PUSH_STATE';

export const pushState = (playerState: any): ReduxAction => ({
    type: PUSH_STATE,
    error: null,
    value: playerState,
});
