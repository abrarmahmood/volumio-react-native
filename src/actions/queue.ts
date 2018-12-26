import { ReduxAction } from "./utils";

export const PUSH_QUEUE = 'PUSH_QUEUE';
export const PUSH_QUEUE_TRANSFORMED = 'PUSH_QUEUE_TRANSFORMED';
export const DELETE_QUEUE_ITEM = 'DELETE_QUEUE_ITEM';
export const PLAY_QUEUE_ITEM = 'PLAY_QUEUE_ITEM';


export const pushQueue = (data: any): ReduxAction => ({
    type: PUSH_QUEUE,
    error: null,
    payload: data,
});

export const pushQueueTransformed = (data: any): ReduxAction => ({
    type: PUSH_QUEUE_TRANSFORMED,
    error: null,
    payload: data,
});

export const handleDeleteQueueItem = (index: string): ReduxAction => ({
    type: DELETE_QUEUE_ITEM,
    error: null,
    payload: {value: index},
});

export const handlePlayQueueItem = (index: string): ReduxAction => ({
    type: PLAY_QUEUE_ITEM,
    error: null,
    payload: {value: index},
});
