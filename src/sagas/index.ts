import { fork } from 'redux-saga/effects';

import { handleBrowseSaga } from './browse-library';
import { pushBrowseTracksTransform } from './transform-tracks';
import { pushBrowseFoldersTransform } from './transform-folders';
import { pushStateTransform } from './push-state-transform';
import {
    handlePlaySaga,
    handlePauseSaga,
    handleNextSaga,
    handlePrevSaga,
    handleAddPlaySaga,
    handleSetRandomSaga,
    handleSetRepeatSaga,
    handleSeekSaga,
} from './player-state';
import { pushQueueTransform } from './push-queue-transform';
import {
    handleDeleteQueueItemSaga,
    handlePlayQueueItemSaga,
    handleClearQueueSaga,
} from './queue';
import { pushSearchTransform } from './push-search-transform';
import { handleSearchSaga } from './search-library';

// Circular dep doesn't seem to be an issue
export type SagaParams = {
    socket: SocketIOClient.Socket
}

export default function* rootSaga(params: SagaParams) {
    yield [
        fork(handleBrowseSaga, params),
        fork(handleSearchSaga, params),
        fork(pushBrowseTracksTransform, params),
        fork(pushBrowseFoldersTransform, params),
        fork(pushStateTransform, params),
        fork(handlePlaySaga, params),
        fork(handlePauseSaga, params),
        fork(handleNextSaga, params),
        fork(handlePrevSaga, params),
        fork(handleAddPlaySaga, params),
        fork(pushQueueTransform, params),
        fork(handleDeleteQueueItemSaga, params),
        fork(handlePlayQueueItemSaga, params),
        fork(handleSetRandomSaga, params),
        fork(handleSetRepeatSaga, params),
        fork(handleSeekSaga, params),
        fork(handleClearQueueSaga, params),
        fork(pushSearchTransform, params),
    ]
}
