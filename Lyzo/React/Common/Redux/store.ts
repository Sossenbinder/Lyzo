// Framework
import * as redux from "redux";

// Functionality

// Types
// @ts-ignore
import { MultiReducerState } from "./Reducer/types";
export type ReduxStore = redux.Store & {

}

// export const store: ReduxStore = redux.createStore(
// 	redux.combineReducers({

// 	}),
// );

export const store: ReduxStore = redux.createStore(state => state);

export default store;