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
import { pushQueueTransform } from './push-queue-transform';
import { handleDeleteQueueItemSaga, handlePlayQueueItemSaga } from './queue';

// Circular dep doesn't seem to be an issue
export type SagaParams = {
    socket: SocketIOClient.Socket
}

export default function* rootSaga(params: SagaParams) {
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
        fork(pushQueueTransform, params),
        fork(handleDeleteQueueItemSaga, params),
        fork(handlePlayQueueItemSaga, params),
    ]
}
