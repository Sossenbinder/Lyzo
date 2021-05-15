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
	initializeStreamForRoom(roomId: string): Promise<void>;
	setLocalStreamInfo(mediaStream: MediaStream): void;
	handleRemoteOffer(roomId: string, offeringConnectionId: string, offer: string): Promise<void>;
	createConnection(): RTCPeerConnection;
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