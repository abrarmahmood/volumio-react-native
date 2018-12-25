import { takeEvery } from 'redux-saga/effects'
import { ReduxAction } from '../actions/utils';
import { PLAY, PAUSE, NEXT, PREV, ADD_PLAY } from '../actions/player-state';


export const handlePlaySaga = function* (params: any) {
	yield takeEvery(PLAY, (action: ReduxAction) => {
		params.socket.emit('play');
	});
}

export const handlePauseSaga = function* (params: any) {
	yield takeEvery(PAUSE, (action: ReduxAction) => {
		params.socket.emit('pause');
	});
}

export const handleNextSaga = function* (params: any) {
	yield takeEvery(NEXT, (action: ReduxAction) => {
		params.socket.emit('next');
	});
}

export const handlePrevSaga = function* (params: any) {
	yield takeEvery(PREV, (action: ReduxAction) => {
		params.socket.emit('prev');
	});
}

export const handleAddPlaySaga = function* (params: any) {
	yield takeEvery(ADD_PLAY, (action: ReduxAction) => {
		params.socket.emit('addPlay', action.value);
	});
}
