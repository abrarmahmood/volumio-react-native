import { ReduxAction } from '../actions/utils';
import { PUSH_SEARCH_LIBRARY_TRANSFORMED } from '../actions/search-library';

const defaultState = {
	error: null,
    value: []
};

const search = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_SEARCH_LIBRARY_TRANSFORMED:
			return Object.assign({}, state, {value: action.payload});
		default:
			return state;
	}
}

export default search;
