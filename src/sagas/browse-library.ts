import { takeEvery } from 'redux-saga/effects'
import { BROWSE_LIBRARY } from '../actions/browse-library';
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';


export const handleBrowseSaga = function* (params: SagaParams) {
	yield takeEvery(BROWSE_LIBRARY, (action: ReduxAction) => {
		params.socket.emit('browseLibrary', {
			uri: action.payload.uri,
			prevUri: action.payload.prevUri,
		});
	});
}
