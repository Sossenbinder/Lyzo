// Functionality
import PostRequest from "common/Helper/Requests/PostRequest";
import GetRequest from "common/Helper/Requests/GetRequest";

// Types
import { Network, ChatRoom } from "../types";

const Urls = {
	CreateRoom: "/Room/CreateRoom",
	GetRooms: "/Room/GetRooms",
}

export const getRooms = async () => {
	const request = new GetRequest<Network.GetRooms.Request>(Urls.GetRooms);
	return await request.get();
}

export const createRoom = async (chatRoom: ChatRoom) => {
	const request = new PostRequest<Network.CreateRoom.Request, Network.CreateRoom.Response>(Urls.CreateRoom);
	return await request.post(chatRoom);
}