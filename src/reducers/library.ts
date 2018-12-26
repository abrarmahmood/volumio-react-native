import { PUSH_BROWSE_LIBRARY_TRANSFORMED } from '../actions/browse-library';
import { ReduxAction } from '../actions/utils';

const defaultState = {
	error: null,
    value: []
};

const library = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_BROWSE_LIBRARY_TRANSFORMED:
			return Object.assign({}, state, {value: action.payload});
		default:
			return state;
	}
}

export default library;
