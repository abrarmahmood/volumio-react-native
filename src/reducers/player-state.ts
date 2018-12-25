import {PUSH_STATE_TRANSFORMED} from '../actions/player-state';
import { ReduxAction } from '../actions/utils';

const defaultState = {
	error: null,
    value: {

    }
};

const playerState = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_STATE_TRANSFORMED:
			return {error: null, value: action.value};
		default:
			return state;
	}
}

export default playerState;
