import { combineReducers } from "redux"
import playerState from "./player-state"
import library from "./library"

const chat = combineReducers({
    playerState,
    library
});

export default chat;
