// Framework
import { HubConnection } from "@microsoft/signalr";

// Functionality
import { IRoomService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";
import * as roomCommunication from "modules/Rooms/Communication/RoomCommunication";
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";
import { asyncForEachParallel } from "common/Helper/asyncUtils";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { ChatRoom, RoomNotifications, ConnectedParticipant } from "modules/Rooms/types";
import { IWebRTCService } from 'common/Modules/Service/types';

export default class RoomService extends ModuleService implements IRoomService {

	private _hubConnection: HubConnection;

	private _webRtcService: IWebRTCService;

	public constructor(
		signalRConnectionProvider: ISignalRConnectionProvider,
		webRtcService: IWebRTCService) {
		super();

		this._webRtcService = webRtcService;

		this._hubConnection = signalRConnectionProvider.SignalRConnection;
		this._hubConnection.on(RoomNotifications.joined, this.onJoined);
		this._hubConnection.on(RoomNotifications.newParticipant, this.onNewParticipant);
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

		let rooms: Array<ChatRoom> = [];

		if (getRoomsResponse.success) {
			rooms = getRoomsResponse.payload;
			rooms.forEach(room => room.participants = []);
		}

		this.dispatch(roomReducer.replace(getRoomsResponse.success ? getRoomsResponse.payload : []));
	}

	public async joinRoom(roomId: string) {
		await this._hubConnection.send("joinRoom", roomId);
	}

	private onJoined = async (roomId: string) => {

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

	private onNewParticipant = async (roomId: string, connectionId: string) => {

		const state = this.getStore().roomReducer.data;
		const room = state.find(x => x.id === roomId);

		if (room) {
			const participants = [...(room.participants ?? [])];

			participants.push({
				connection: this._webRtcService.createConnection(),
				id: connectionId,
			});

			this.dispatch(roomReducer.update({
				...room,
				participants,
			}));
		}
	}
}