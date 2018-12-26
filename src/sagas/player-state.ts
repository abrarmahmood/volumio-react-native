import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { PLAY, PAUSE, NEXT, PREV, ADD_PLAY } from '../actions/player-state';
import { SagaParams } from '.';


export const handlePlaySaga = function* (params: SagaParams) {
	yield takeEvery(PLAY, (action: ReduxAction) => {
		params.socket.emit('play');
	});
}

export const handlePauseSaga = function* (params: SagaParams) {
	yield takeEvery(PAUSE, (action: ReduxAction) => {
		params.socket.emit('pause');
	});
}

export const handleNextSaga = function* (params: SagaParams) {
	yield takeEvery(NEXT, (action: ReduxAction) => {
		params.socket.emit('next');
	});
}

export const handlePrevSaga = function* (params: SagaParams) {
	yield takeEvery(PREV, (action: ReduxAction) => {
		params.socket.emit('prev');
	});
}

export const handleAddPlaySaga = function* (params: SagaParams) {
	yield takeEvery(ADD_PLAY, (action: ReduxAction) => {
		params.socket.emit('addPlay', action.payload);
	});
}
