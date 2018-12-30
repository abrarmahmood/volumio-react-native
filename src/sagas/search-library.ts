import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import { SEARCH_LIBRARY } from '../actions/search-library';

export const handleSearchSaga = function* (params: SagaParams) {
	yield takeEvery(SEARCH_LIBRARY, (action: ReduxAction) => {
		params.socket.emit('search', {
			type: "any",
			value: action.payload,
			plugin_name: "streaming_services",
			plugin_type: "music_service",
			uri: "tidal://"
		});
	});
}
