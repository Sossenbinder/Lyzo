// Framework
import * as signalR from "@microsoft/signalr";

// Functionality
import { IWebRTCService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";

export default class WebRTCService extends ModuleService implements IWebRTCService {

	private _rtcConnection: RTCPeerConnection;

	get rtcConnection(): RTCPeerConnection {
		return this._rtcConnection;
	}

	public constructor(signalRConnectionProvider: ISignalRConnectionProvider) {
		super();

		const connection: signalR.HubConnection = signalRConnectionProvider.SignalRConnection;

		connection.on
	}

	public start() {

		const configuration = {
			'iceServers': [{
				'urls': 'stun:stun.l.google.com:19302'
			}]
		};
		this._rtcConnection = new RTCPeerConnection(configuration);

		return Promise.resolve();
	}

	public addStreamToPeerConnection(stream: MediaStream) {
		this._rtcConnection.addTrack(stream.getTracks()[0], stream);
	}
}