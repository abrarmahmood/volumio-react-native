import { ReduxAction } from "./utils";

export const PUSH_QUEUE = 'PUSH_QUEUE';
export const PUSH_QUEUE_TRANSFORMED = 'PUSH_QUEUE_TRANSFORMED';
export const QUEUE_DELETE = 'QUEUE_DELETE';


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

export const handleQueueDelete = (index: string): ReduxAction => ({
    type: QUEUE_DELETE,
    error: null,
    payload: {value: index},
});
