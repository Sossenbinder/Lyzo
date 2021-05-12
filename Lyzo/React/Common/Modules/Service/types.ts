//Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";

export interface IModuleService {
	start?(): Promise<void>;
}

export type ServiceNotification = {
	name: keyof Services;
	service: IModuleService;
}

export interface IWebRTCService extends IModuleService {
	readonly rtcConnection: RTCPeerConnection;
	initializeStreamForRoom(roomId: string, stream: MediaStream): Promise<void>;
}

export interface IRoomService extends IModuleService {
	createRoom(roomName: string, roomDescription: string): Promise<void>;
	getRooms(): Promise<void>;
	joinRoom(roomId: string): Promise<void>;
}

export type Services = {
	WebRTCService: IWebRTCService;
	RoomService: IRoomService;
	SignalRConnectionProvider: ISignalRConnectionProvider;
}