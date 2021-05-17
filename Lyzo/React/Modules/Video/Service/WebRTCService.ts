// Framework
import * as signalR from "@microsoft/signalr";

// Functionality
import { IWebRTCService } from "common/Modules/Service/types";
import ModuleService from "common/Modules/Service/ModuleService";
import { getConnectedClients } from "modules/Rooms/Communication/RoomCommunication";
import { reducer as roomReducer } from "modules/Rooms/Reducer/RoomReducer";

// Types
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import { SignalR, VideoParticipant } from "modules/Video/types";
import { asyncForEachParallel } from "common/Helper/asyncUtils";

export default class WebRTCService extends ModuleService implements IWebRTCService {

	// Setup Ice servers
	private readonly _configuration: RTCConfiguration = {
		iceServers: [{
			urls: 'stun:stun.l.google.com:19302'
		}],
	};

	private _signalRConnection: signalR.HubConnection;

	// Our local stream
	private _mediaStream: MediaStream;

	public constructor(signalRConnectionProvider: ISignalRConnectionProvider) {
		super();

		this._signalRConnection = signalRConnectionProvider.SignalRConnection;
		this._signalRConnection.on(SignalR.Incoming.offerRespondedTo, this.onOfferRespondedTo);
		this._signalRConnection.on(SignalR.Incoming.remoteOffer, this.handleRemoteOffer);
		this._signalRConnection.on(SignalR.Incoming.iceCandidateReceived, this.onIceCandidateReceived);
	}

	public start() {
		return Promise.resolve();
	}

	public setLocalStreamInfo(mediaStream: MediaStream) {
		this._mediaStream = mediaStream;
	}

	// Initialize our part for a room
	public async initializeStreamForRoom(roomId: string) {

		// Create connection to all available participants
		const connectedParticipants = await getConnectedClients(roomId);

		if (connectedParticipants.payload.length === 0) {
			return;
		}

		const connectionMap = new Map<string, RTCPeerConnection>(connectedParticipants.payload.map(participant => {
			return [participant.connectionId, this.createConnection()];
		}));

		// Put the new connection into redux
		const rooms = this.getStore().roomReducer.data;
		const newRoom = { ...rooms.find(x => x.id === roomId) };
		const newParticipantSet: Array<VideoParticipant> = connectedParticipants.payload.map(x => ({
			connection: connectionMap.get(x.connectionId),
			id: x.connectionId,
		}))

		connectionMap.forEach((val, key) => {
			newParticipantSet.find(x => x.id === key).connection = val;
		})

		newRoom.participants = newParticipantSet;
		this.dispatch(roomReducer.update(newRoom));

		// Send an offer to all connected clients
		await asyncForEachParallel(Array.from(connectionMap), async ([key, value]) => {

			// Create an offer and set our local description
			const offer = await value.createOffer();
			await value.setLocalDescription(offer);

			value.onicecandidate = async (event) => {

				if (!event.candidate) {
					return;
				}

				await this._signalRConnection.send(SignalR.Outgoing.shareCandidate, roomId, key, JSON.stringify(event.candidate));
			}

			// Signal our offer
			await this._signalRConnection.send(SignalR.Outgoing.offerRtc, roomId, key, JSON.stringify(offer));
		})
	}

	// Handle an offer coming in from somewhere remote
	public handleRemoteOffer = async (roomId: string, offeringConnectionId: string, offer: string) => {
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);
		const participant = room.participants.find(x => x.id === offeringConnectionId);

		const remoteConnection = participant.connection;

		remoteConnection.onicecandidate = async (event) => {

			if (!event.candidate) {
				return;
			}

			await this._signalRConnection.send(SignalR.Outgoing.shareCandidate, roomId, offeringConnectionId, JSON.stringify(event.candidate));
		}

		// Parse the remote offer and set it on our freshly created connection as remote description
		const remoteDescription: RTCSessionDescriptionInit = JSON.parse(offer);
		await remoteConnection.setRemoteDescription(remoteDescription);

		// Create an answer and set it on the local description of the stream
		const localAnswer = await remoteConnection.createAnswer();
		await remoteConnection.setLocalDescription(localAnswer);

		// Signal that we have responded to the offer and include our answer
		await this._signalRConnection.send(SignalR.Outgoing.respondToRemoteOffer, roomId, offeringConnectionId, JSON.stringify(localAnswer));
	}

	// Create a connection with local stream on top
	public createConnection = () => {
		const connection = new RTCPeerConnection(this._configuration);

		this._mediaStream.getTracks().forEach(x => connection.addTrack(x, this._mediaStream));

		return connection;
	}

	// Callback raised by response to an offer
	private onOfferRespondedTo = async (roomId: string, respondingId: string, answer: string) => {
		// Grab the room for the remote description and set the remote description on it with the answer we now received
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);
		const participant = room.participants.find(x => x.id === respondingId);

		if (participant) {
			await participant.connection.setRemoteDescription(JSON.parse(answer));
		}
	}

	private onIceCandidateReceived = async (roomId: string, connectionId: string, candidate: string) => {
		// Grab the room for the remote description and set the remote description on it with the answer we now received
		const room = this.getStore().roomReducer.data.find(x => x.id === roomId);
		const participant = room.participants.find(x => x.id === connectionId);

		if (participant && participant.connection) {
			await participant.connection.addIceCandidate(JSON.parse(candidate));
		}
	}
}