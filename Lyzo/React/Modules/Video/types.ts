export type VideoParticipant = {
	id: string;
	connection: RTCPeerConnection;
}

export namespace SignalR {
	export const Incoming = {
		offerRespondedTo: "offerRespondedTo",
		remoteOffer: "remoteOffer",
		iceCandidateReceived: "iceCandidateReceived",
		newParticipant: "newParticipant",
	}

	export const Outgoing = {
		shareCandidate: "shareCandidate",
		offerRtc: "offerRtc",
		respondToRemoteOffer: "respondToRemoteOffer",
	}
}