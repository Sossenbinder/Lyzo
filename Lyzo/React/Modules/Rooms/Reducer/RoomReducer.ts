// Functionality
import { createReducer } from "common/Redux/Reducer/CrudReducer";

// Types
import { ChatRoom } from "modules/Rooms/types";

export const reducer = createReducer<ChatRoom>({
	actionIdentifier: "ChatRoom",
	key: "id",
});

export default reducer;