import { ReduxAction } from "./utils";

export const PUSH_SEARCH_LIBRARY = 'PUSH_SEARCH_LIBRARY';
export const PUSH_SEARCH_LIBRARY_TRANSFORMED = 'PUSH_SEARCH_LIBRARY_TRANSFORMED';
export const SEARCH_LIBRARY = 'SEARCH_LIBRARY';

export const pushSearchLibrary = (data: any): ReduxAction => ({
    type: PUSH_SEARCH_LIBRARY,
    error: null,
    payload: data,
});

export const pushSearchLibraryTransformed = (data: any): ReduxAction => ({
    type: PUSH_SEARCH_LIBRARY_TRANSFORMED,
    error: null,
    payload: data,
});

export const searchLibrary = (phrase: string): ReduxAction => ({
    type: SEARCH_LIBRARY,
    error: null,
    payload: phrase,
});
