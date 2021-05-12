export const VideoNotifications = {
	connectionReady: "connectionReady",
	newParticipant: "newParticipant",
	offerRtc: "offerRtc",
	remoteOffer: "remoteOffer",
	respondToRemoteOffer: "respondToRemoteOffer",
	offerRespondedTo: "offerRespondedTo",
}

export type VideoParticipant = {
	id: string;
	connection: RTCPeerConnection;
}