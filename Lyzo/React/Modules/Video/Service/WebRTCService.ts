// Framework
import * as signalR from "@microsoft/signalr";

// Functionality
import { IWebRTCService, IRoomService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { VideoNotifications, VideoParticipant } from "modules/Video/types";

export default class WebRTCService extends ModuleService implements IWebRTCService {

	private readonly _configuration = {
		'iceServers': [{
			'urls': 'stun:stun.l.google.com:19302'
		}]
	};

	private _ownConnection: RTCPeerConnection;

	private _signalRConnection: signalR.HubConnection;

	get rtcConnection(): RTCPeerConnection {
		return this._ownConnection;
	}

	public constructor(signalRConnectionProvider: ISignalRConnectionProvider) {
		super();

		this._signalRConnection = signalRConnectionProvider.SignalRConnection;
		this._signalRConnection.on(VideoNotifications.remoteOffer, this.onRemoteOffer);
		this._signalRConnection.on(VideoNotifications.offerRespondedTo, this.onOfferRespondedTo);
	}

	public start() {
		return Promise.resolve();
	}

	public async initializeStreamForRoom(roomId: string, stream: MediaStream) {

		const ownStream = this._ownConnection = new RTCPeerConnection(this._configuration);
		stream.getTracks().forEach(track => ownStream.addTrack(track));

		const offer = await ownStream.createOffer();
		await ownStream.setLocalDescription(offer);

		await this._signalRConnection.send(VideoNotifications.offerRtc, roomId, JSON.stringify(offer));
	}

	private onRemoteOffer = async (roomId: string, offeringConnectionId: string, offer: string) => {
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);

		const connection = new RTCPeerConnection(this._configuration);

		const remoteDescription: RTCSessionDescriptionInit = JSON.parse(offer);
		await connection.setRemoteDescription(remoteDescription);

		const answer = await connection.createAnswer();

		await connection.setLocalDescription(answer);

		await this._ownConnection.setRemoteDescription(answer);

		const participant: VideoParticipant = {
			connection,
			id: offeringConnectionId,
		};

		room.participants = [...room.participants, participant];

		await this._signalRConnection.send(VideoNotifications.respondToRemoteOffer, roomId, offeringConnectionId, JSON.stringify(answer));
	}

	private onOfferRespondedTo = async (roomId: string, respondingId: string, answer: string) => {
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);

		const participant = room.participants.find(x => x.id === respondingId);

		if (participant) {
			await participant.connection.setRemoteDescription(JSON.parse(answer));
		}
	}
}