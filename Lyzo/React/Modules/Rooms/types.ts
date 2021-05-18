import { VideoParticipant } from "modules/Video/types";

export type ChatRoom = {
	id: string;
	name: string;
	description: string;
	creationdate: Date;
	participants: Array<VideoParticipant>;
	joined: boolean;
	participantCount: number;
	maxParticpants?: number;
}

export type ConnectedParticipant = {
	connectionId: string;
	offer: string;
}

export namespace Network {
	export namespace CreateRoom {
		export type Request = ChatRoom;

		export type Response = {
			roomId: string;
		}
	}

	export namespace GetConnectedClients {
		export type Request = {
			roomId: string;
		}

		export type Response = Array<ConnectedParticipant>;
	}

	export namespace GetRooms {
		export type Request = Array<ChatRoom>;
	}
}

export namespace SignalR {
	export const Incoming = {
		joinConfirmation: "joinConfirmation",
		newParticipant: "newParticipant",
		participantUpdate: "participantUpdate",
	}

	export namespace Payloads {
		export type ParticipantUpdate = {
			roomId: string;
			count: number;
		}
	}
}