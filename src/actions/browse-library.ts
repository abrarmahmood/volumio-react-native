import { ReduxAction } from "./utils";

export const PUSH_BROWSE_TRACKS = 'PUSH_BROWSE_TRACKS';
export const PUSH_BROWSE_TRACKS_TRANSFORMED = 'PUSH_BROWSE_TRACKS_TRANSFORMED';

export const PUSH_BROWSE_FOLDERS = 'PUSH_BROWSE_FOLDERS';
export const PUSH_BROWSE_FOLDERS_TRANSFORMED = 'PUSH_BROWSE_FOLDERS_TRANSFORMED';
export const BROWSE_LIBRARY = 'BROWSE_LIBRARY';

export const pushBrowseFolders = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_FOLDERS,
    error: null,
    payload: data,
});

export const pushBrowseFoldersTransformed = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_FOLDERS_TRANSFORMED,
    error: null,
    payload: data,
});

export const pushBrowseTracks = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_TRACKS,
    error: null,
    payload: data,
});

export const pushBrowseTracksTransformed = (data: any): ReduxAction => ({
    type: PUSH_BROWSE_TRACKS_TRANSFORMED,
    error: null,
    payload: data,
});

// Works for tracks and folders
export const browseLibrary = (uri: string, prevUri: string): ReduxAction => ({
    type: BROWSE_LIBRARY,
    error: null,
    payload: { uri, prevUri },
});