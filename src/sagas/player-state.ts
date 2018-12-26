import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { SagaParams } from '.';
import {
	PLAY,
	PAUSE,
	NEXT,
	PREV,
	ADD_PLAY,
	SET_RANDOM,
	SET_REPEAT,
	SEEK,
} from '../actions/player-state';


export const handlePlaySaga = function* (params: SagaParams) {
	yield takeEvery(PLAY, (_action: ReduxAction) => {
		params.socket.emit('play');
	});
}

export const handlePauseSaga = function* (params: SagaParams) {
	yield takeEvery(PAUSE, (_action: ReduxAction) => {
		params.socket.emit('pause');
	});
}

export const handleNextSaga = function* (params: SagaParams) {
	yield takeEvery(NEXT, (_action: ReduxAction) => {
		params.socket.emit('next');
	});
}

export const handlePrevSaga = function* (params: SagaParams) {
	yield takeEvery(PREV, (_action: ReduxAction) => {
		params.socket.emit('prev');
	});
}

export const handleAddPlaySaga = function* (params: SagaParams) {
	yield takeEvery(ADD_PLAY, (action: ReduxAction) => {
		params.socket.emit('addPlay', action.payload);
	});
}

export const handleSetRandomSaga = function* (params: SagaParams) {
	yield takeEvery(SET_RANDOM, (action: ReduxAction) => {
		params.socket.emit('setRandom', action.payload);
	});
}

export const handleSetRepeatSaga = function* (params: SagaParams) {
	yield takeEvery(SET_REPEAT, (action: ReduxAction) => {
		params.socket.emit('setRepeat', action.payload);
	});
}

export const handleSeekSaga = function* (params: SagaParams) {
	yield takeEvery(SEEK, (action: ReduxAction) => {
		params.socket.emit('seek', action.payload);
	});
}
