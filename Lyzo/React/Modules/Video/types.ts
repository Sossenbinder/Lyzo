export const VideoNotifications = {
	connectionReady: "connectionReady",
	newParticipant: "newParticipant",
	offerRtc: "offerRtc",
	remoteOffer: "remoteOffer",
	respondToRemoteOffer: "respondToRemoteOffer",
	offerRespondedTo: "offerRespondedTo",
	shareCandidate: "shareCandidate",
	iceCandidateReceived: "iceCandidateReceived",
}

export type VideoParticipant = {
	id: string;
	connection: RTCPeerConnection;
}