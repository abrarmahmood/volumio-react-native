import { ReduxAction } from "./utils";

export const PUSH_BROWSE_LIBRARY = 'PUSH_BROWSE_LIBRARY';
export const PUSH_BROWSE_LIBRARY_TRANSFORMED = 'PUSH_BROWSE_LIBRARY_TRANSFORMED';
export const BROWSE_LIBRARY = 'BROWSE_LIBRARY';

export const pushBrowseLibrary = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_LIBRARY,
    error: null,
    payload: data,
});

export const pushBrowseLibraryTransformed = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_LIBRARY_TRANSFORMED,
    error: null,
    payload: data,
});

export const browseLibrary = (uri: string, prevUri: string): ReduxAction => ({
    type: BROWSE_LIBRARY,
    error: null,
    payload: {uri, prevUri},
});
