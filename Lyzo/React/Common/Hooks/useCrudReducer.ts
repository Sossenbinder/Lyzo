// Framework
import { useReducer } from "react";
// @ts-ignore
import { ReducerAction } from "react-redux";

// Functionality
import { createReducer, MultiReducerParams } from "common/Redux/Reducer/CrudReducer";
import { ensureArray } from "common/Helper/arrayUtils";

// Types
import { CouldBeArray } from "common/Types/arrayTypes";

export const useCrudReducer = <TDataType>(
	options: MultiReducerParams<TDataType>,
	initialState: CouldBeArray<TDataType> = []) => {

	const crudReducer = createReducer<TDataType>(options);

	const [state, dispatch] = useReducer(crudReducer.reducer, {
		data: ensureArray(initialState),
	});

	const dispatchActionGenerator = (action: (data: CouldBeArray<TDataType>) => ReducerAction<CouldBeArray<TDataType>>) => (data: CouldBeArray<TDataType>) => {
		dispatch(action(data));
	};

	return {
		state,
		add: dispatchActionGenerator(crudReducer.add),
		delete: dispatchActionGenerator(crudReducer.delete),
		update: dispatchActionGenerator(crudReducer.update),
		replace: dispatchActionGenerator(crudReducer.replace)
	};
}

export default useCrudReducer;