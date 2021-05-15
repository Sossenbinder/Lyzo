// Framework
import * as signalR from "@microsoft/signalr";

// Functionality
import { IWebRTCService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";
import { getConnectedClients } from "modules/Rooms/Communication/RoomCommunication";
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { VideoNotifications, VideoParticipant } from "modules/Video/types";
import { asyncForEachParallel } from "common/Helper/asyncUtils";
import { ChatRoom } from 'modules/Rooms/types';

export default class WebRTCService extends ModuleService implements IWebRTCService {

	private readonly _configuration: RTCConfiguration = {
		iceServers: [{
			urls: 'stun:stun.l.google.com:19302'
		}],
	};

	private _ownConnection: RTCPeerConnection;

	private _signalRConnection: signalR.HubConnection;

	get rtcConnection(): RTCPeerConnection {
		return this._ownConnection;
	}

	public constructor(signalRConnectionProvider: ISignalRConnectionProvider) {
		super();

		this._signalRConnection = signalRConnectionProvider.SignalRConnection;
		this._signalRConnection.on(VideoNotifications.remoteOffer, this.handleRemoteOffer);
		this._signalRConnection.on(VideoNotifications.offerRespondedTo, this.onOfferRespondedTo);
	}

	public start() {
		return Promise.resolve();
	}

	// Initialize our part for a room
	public async initializeStreamForRoom(roomId: string, stream: MediaStream) {

		// Setup our own outward stream for th e room
		const ownStream = this._ownConnection = new RTCPeerConnection(this._configuration);
		stream.getTracks().forEach(track => ownStream.addTrack(track));

		// Create an offer and set our local description
		const offer = await ownStream.createOffer();
		await ownStream.setLocalDescription(offer);

		// Initialize the connection for all the available video participants within the room
		const connectedParticipants = await getConnectedClients(roomId);
		await asyncForEachParallel(connectedParticipants.payload.filter(x => !!x.offer), async x => {
			await this.handleRemoteOffer(roomId, x.connectionId, x.offer);
		})

		// Signal our offer
		await this._signalRConnection.send(VideoNotifications.offerRtc, roomId, JSON.stringify(offer));
	}

	// Handle an offer coming in from somewhere remote
	public handleRemoteOffer = async (roomId: string, offeringConnectionId: string, offer: string) => {
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);

		const remoteConnection = new RTCPeerConnection(this._configuration);

		remoteConnection.ontrack = (e) => {
			debugger;
			console.log(e);
		}

		this._ownConnection.onicecandidate = (event) => {
			remoteConnection.addIceCandidate(event.candidate);
		}

		remoteConnection.onicecandidate = (event) => {
			this._ownConnection.addIceCandidate(event.candidate);
		}

		// Parse the remote offer and set it on our freshly created connection as remote description
		const remoteDescription: RTCSessionDescriptionInit = JSON.parse(offer);
		await remoteConnection.setRemoteDescription(remoteDescription);

		// Create an answer and set it on the local description of the stream
		const localAnswer = await remoteConnection.createAnswer();
		await remoteConnection.setLocalDescription(localAnswer);

		await this._ownConnection.setRemoteDescription(localAnswer);

		const participant = room.participants.find(x => x.id === offeringConnectionId);

		participant.connection = remoteConnection;

		const newRoom: ChatRoom = {
			...room,
			participants: [...room.participants]
		}

		this.dispatch(roomReducer.update(newRoom));

		// Signal that we have responded to the offer and include our answer
		await this._signalRConnection.send(VideoNotifications.respondToRemoteOffer, roomId, offeringConnectionId, JSON.stringify(localAnswer));
	}

	public createConnection = () => new RTCPeerConnection(this._configuration);

	// Callback raised by response to an offer
	private onOfferRespondedTo = async (roomId: string, respondingId: string, answer: string) => {

		// Grab the room for the remote description and set the remote description on it with the answer we now received
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);
		const participant = room.participants.find(x => x.id === respondingId);

		if (participant) {
			await participant.connection.setRemoteDescription(JSON.parse(answer));
		}
	}
}