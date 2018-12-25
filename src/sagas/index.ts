import { takeEvery } from 'redux-saga/effects'

const handleSearch = function* handleNewMessage(params: any) {
	yield takeEvery('ADD_MESSAGE', (action: any) => {
		action.author = params.username

		params.socket.emit(JSON.stringify(action))
	})
}

export default handleSearch;
