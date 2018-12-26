import { fork } from 'redux-saga/effects';

import {handleBrowseSaga, handleSearchSaga} from './browse-library';
import {pushBrowseTransform} from './push-browse-transform';
import {pushStateTransform} from './push-state-transform';
import {
    handlePlaySaga,
    handlePauseSaga,
    handleNextSaga,
    handlePrevSaga,
    handleAddPlaySaga,
} from './player-state';


export default function* rootSaga(params: any) {
    yield [
        fork(handleBrowseSaga, params),
        fork(handleSearchSaga, params),
        fork(pushBrowseTransform, params),
        fork(pushStateTransform, params),
        fork(handlePlaySaga, params),
        fork(handlePauseSaga, params),
        fork(handleNextSaga, params),
        fork(handlePrevSaga, params),
        fork(handleAddPlaySaga, params),
    ]
}
