import { fork } from 'redux-saga/effects';

import { handleFetchFoldersSaga, handleFetchTracksSaga } from './browse-library';
import { pushBrowseTracksTransform } from './mappers/transform-tracks';
import { pushBrowseFoldersTransform } from './mappers/transform-folders';
import { pushStateTransform } from './mappers/transform-state';
import {
    handlePlaySaga,
    handlePauseSaga,
    handleNextSaga,
    handlePrevSaga,
    handleAddPlaySaga,
    handleSetRandomSaga,
    handleSetRepeatSaga,
    handleSeekSaga,
    handleGetStateSaga,
} from './player-state';
import { pushQueueTransform } from './mappers/transform-queue';
import {
    handleDeleteQueueItemSaga,
    handlePlayQueueItemSaga,
    handleClearQueueSaga,
} from './queue';
import { pushSearchTransform } from './mappers/transform-search';
import { handleSearchSaga } from './search-library';

// Circular dep doesn't seem to be an issue
export type SagaParams = {
    socket: SocketIOClient.Socket
}

export default function* rootSaga(params: SagaParams) {
    yield [
        fork(handleFetchFoldersSaga, params),
        fork(handleFetchTracksSaga, params),
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
        fork(handleGetStateSaga, params),
    ]
}
