// Functionality
import PostRequest from "common/Helper/Requests/PostRequest";
import GetRequest from "common/Helper/Requests/GetRequest";

// Types
import { Network, ChatRoom } from "../types";

const Urls = {
	CreateRoom: "/Room/CreateRoom",
	GetRooms: "/Room/GetRooms",
	GetConnectedClients: "Room/GetConnectedClients"
}

export const getRooms = async () => {
	const request = new GetRequest<Network.GetRooms.Request>(Urls.GetRooms);
	return await request.get();
}

export const getConnectedClients = async (roomId: string) => {
	const request = new PostRequest<Network.GetConnectedClients.Request, Network.GetConnectedClients.Response>(Urls.GetConnectedClients);
	return await request.post({
		roomId,
	});
}

export const createRoom = async (chatRoom: ChatRoom) => {
	const request = new PostRequest<Network.CreateRoom.Request, Network.CreateRoom.Response>(Urls.CreateRoom);
	return await request.post(chatRoom);
}