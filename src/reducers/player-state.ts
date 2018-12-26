import {PUSH_STATE_TRANSFORMED} from '../actions/player-state';
import { ReduxAction } from '../actions/utils';
import { mapServerResponse } from '../sagas/push-state-transform';

const defaultState = {
	error: null,
    value: mapServerResponse()
};

const playerState = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_STATE_TRANSFORMED:
			return {error: null, value: action.payload};
		default:
			return state;
	}
}

export default playerState;
