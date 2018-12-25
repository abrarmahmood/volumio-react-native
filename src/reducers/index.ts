import { combineReducers } from "redux"
import playerState from "./player-state"

const chat = combineReducers({
    playerState
});

export default chat;
