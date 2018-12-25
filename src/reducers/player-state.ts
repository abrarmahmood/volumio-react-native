import {PUSH_STATE, PlayerStateAction} from '../actions';

const defaultState = {
    value: {

    }
};

const playerState = (state = defaultState, action: PlayerStateAction) => {
	switch (action.type) {
		case PUSH_STATE:
			return Object.assign({}, state, {value: action.state});
		default:
			return state;
	}
}

export default playerState;
