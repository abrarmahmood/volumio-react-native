import {PUSH_STATE} from '../actions/player-state';
import { ReduxAction } from '../actions/utils';

const defaultState = {
	error: null,
    value: {

    }
};

const playerState = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_STATE:
			return Object.assign({}, state, {value: action.value});
		default:
			return state;
	}
}

export default playerState;
