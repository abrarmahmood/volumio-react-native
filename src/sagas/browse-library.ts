import { takeEvery } from 'redux-saga/effects'
import { FETCH_FOLDERS, FETCH_TRACKS } from '../actions/browse-library';
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';


export const handleFetchFoldersSaga = function* (params: SagaParams) {
	yield takeEvery(FETCH_FOLDERS, (action: ReduxAction) => {
		params.socket.emit('browseLibrary', {
			uri: action.payload.uri,
			prevUri: action.payload.prevUri,
		});
	});
}

export const handleFetchTracksSaga = function* (params: SagaParams) {
	yield takeEvery(FETCH_TRACKS, (action: ReduxAction) => {
		params.socket.emit('browseLibrary', {
			uri: action.payload.uri,
			prevUri: action.payload.prevUri,
		});
	});
}
