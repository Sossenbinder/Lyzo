// Framework
import * as redux from "redux";

// Functionality
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";

// Types
import { ChatRoom } from "modules/Rooms/types";
import { MultiReducerState } from "./Reducer/types";

export type Reducers = {
	roomReducer: MultiReducerState<ChatRoom>;
}

export type ReduxStore = redux.Store & Reducers

export const store: ReduxStore = redux.createStore(
	redux.combineReducers<Reducers>({
		roomReducer: roomReducer.reducer,
	}),
);

export default store;