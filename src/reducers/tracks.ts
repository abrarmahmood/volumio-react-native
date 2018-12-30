import { PUSH_BROWSE_TRACKS_TRANSFORMED } from '../actions/browse-library';
import { ReduxAction } from '../actions/utils';

const defaultState = {
	error: null,
    value: []
};

const tracks = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_BROWSE_TRACKS_TRANSFORMED:
			return Object.assign({}, state, {value: action.payload});
		default:
			return state;
	}
}

export default tracks;
