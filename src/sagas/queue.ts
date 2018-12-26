import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import { DELETE_QUEUE_ITEM } from '../actions/queue';


export const handleQueueDeleteSaga = function* (params: SagaParams) {
	yield takeEvery(DELETE_QUEUE_ITEM, (action: ReduxAction) => {
		params.socket.emit('removeFromQueue', action.payload);
	});
}
