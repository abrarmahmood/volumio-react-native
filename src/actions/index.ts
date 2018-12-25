export const PUSH_STATE = 'PUSH_STATE';

export type PlayerStateAction = {
    type: string;
    state: any;
}

export const pushState = (playerState: any): PlayerStateAction => ({
    type: PUSH_STATE,
    state: playerState
});
