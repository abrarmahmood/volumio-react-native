import { takeEvery } from 'redux-saga/effects'
import { SEARCH_LIBRARY, BROWSE_LIBRARY } from '../actions/browse-library';
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';

export const handleSearchSaga = function* (params: SagaParams) {
	yield takeEvery(SEARCH_LIBRARY, (action: ReduxAction) => {
		params.socket.emit('search', {
			type: "any",
			value: action.value,
			plugin_name: "streaming_services",
			plugin_type: "music_service",
			uri: "tidal://"
		});
	});
}

export const handleBrowseSaga = function* (params: SagaParams) {
	yield takeEvery(BROWSE_LIBRARY, (action: ReduxAction) => {
		params.socket.emit('browseLibrary', {
			uri: action.value.uri,
			prevUri: action.value.prevUri,
		});
	});
}
