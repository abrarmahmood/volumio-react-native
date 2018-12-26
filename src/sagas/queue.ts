import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import { QUEUE_DELETE } from '../actions/queue';


export const handleQueueDeleteSaga = function* (params: SagaParams) {
	yield takeEvery(QUEUE_DELETE, (action: ReduxAction) => {
		params.socket.emit('removeFromQueue', action.payload);
	});
}
