export interface IModuleService {
	start?(): Promise<void>;
}

export type ServiceNotification = {
	name: keyof Services;
	service: IModuleService;
}

export interface IWebRTCService extends IModuleService {
	readonly rtcConnection: RTCPeerConnection;
	addStreamToPeerConnection(stream: MediaStream): void;
}

export type Services = {
	WebRTCService: IWebRTCService,
}