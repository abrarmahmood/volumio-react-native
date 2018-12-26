import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import { DELETE_QUEUE_ITEM, PLAY_QUEUE_ITEM } from '../actions/queue';


export const handleDeleteQueueItemSaga = function* (params: SagaParams) {
	yield takeEvery(DELETE_QUEUE_ITEM, (action: ReduxAction) => {
		params.socket.emit('removeFromQueue', action.payload);
	});
}

export const handlePlayQueueItemSaga = function* (params: SagaParams) {
	yield takeEvery(PLAY_QUEUE_ITEM, (action: ReduxAction) => {
		params.socket.emit('play', action.payload);
	});
}
