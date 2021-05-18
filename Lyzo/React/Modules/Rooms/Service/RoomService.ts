// Framework
import { HubConnection } from "@microsoft/signalr";

// Functionality
import { IRoomService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";
import * as roomCommunication from "modules/Rooms/Communication/RoomCommunication";
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { ChatRoom, SignalR } from "modules/Rooms/types";
import { IWebRTCService } from 'common/Modules/Service/types';
import { Notification } from "common/Helper/SignalR/types";

export default class RoomService extends ModuleService implements IRoomService {

	private _hubConnection: HubConnection;

	private _webRtcService: IWebRTCService;

	public constructor(
		signalRConnectionProvider: ISignalRConnectionProvider,
		webRtcService: IWebRTCService) {
		super();

		this._webRtcService = webRtcService;

		this._hubConnection = signalRConnectionProvider.SignalRConnection;
		this._hubConnection.on(SignalR.Incoming.joinConfirmation, this.onJoinConfirmed);
		this._hubConnection.on(SignalR.Incoming.newParticipant, this.onNewParticipant);
		signalRConnectionProvider.registerNotificationHandler(SignalR.Incoming.participantUpdate, this.onParticipantUpdated);
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
			rooms.forEach(room => {
				room.participants = [];
			});
		}

		this.dispatch(roomReducer.replace(getRoomsResponse.success ? getRoomsResponse.payload : []));
	}

	public async joinRoom(roomId: string) {
		await this._hubConnection.send("joinRoom", roomId);
	}

	private onJoinConfirmed = (roomId: string) => {

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

	private onNewParticipant = (roomId: string, connectionId: string) => {

		const state = this.getStore().roomReducer.data;
		const room = state.find(x => x.id === roomId);

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

	private onParticipantUpdated = (notification: Notification<SignalR.Payloads.ParticipantUpdate>): Promise<void> => {

		const payload = notification.payload;

		const state = this.getStore().roomReducer.data;
		const room = state.find(x => x.id === payload.roomId);

		this.dispatch(roomReducer.update({
			...room,
			participantCount: payload.count,
		}));

		return Promise.resolve();
	}
}