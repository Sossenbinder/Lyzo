// Framework
import { HubConnection } from "@microsoft/signalr";

// Functionality
import { IRoomService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";
import * as roomCommunication from "modules/Rooms/Communication/RoomCommunication";
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { ChatRoom, RoomNotifications } from "modules/Rooms/types";

export default class RoomService extends ModuleService implements IRoomService {

	private _hubConnection: HubConnection;

	public constructor(signalRConnectionProvider: ISignalRConnectionProvider) {
		super();

		this._hubConnection = signalRConnectionProvider.SignalRConnection;
		this._hubConnection.on(RoomNotifications.joined, this.onJoined);
	}

	public start() {
		return Promise.resolve();
	}

	public async createRoom(roomName: string, roomDescription: string) {
		await roomCommunication.createRoom({
			name: roomName,
			description: roomDescription,
		} as ChatRoom);
	}

	public async getRooms() {
		const getRoomsResponse = await roomCommunication.getRooms();
		this.dispatch(roomReducer.replace(getRoomsResponse.success ? getRoomsResponse.payload : []));
	}

	public async joinRoom(roomId: string) {
		await this._hubConnection.send("joinRoom", roomId);
	}

	private onJoined = (roomId: string) => {
		const state = this.getStore().roomReducer.data;
		const room = state.find(x => x.id === roomId);

		if (room) {
			const newRoom: ChatRoom = {
				...room,
				joined: true,
			};

			this.dispatch(roomReducer.update(newRoom));
		}
	}
}