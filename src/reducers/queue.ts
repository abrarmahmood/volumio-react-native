import { ReduxAction } from '../actions/utils';
import { PUSH_QUEUE_TRANSFORMED } from '../actions/queue';

const defaultState = {
	error: null,
    value: []
};

const queue = (state = defaultState, action: ReduxAction) => {
	switch (action.type) {
		case PUSH_QUEUE_TRANSFORMED:
			return Object.assign({}, state, {value: action.payload});
		default:
			return state;
	}
}

export default queue;
