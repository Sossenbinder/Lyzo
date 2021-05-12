import { VideoParticipant } from "modules/Video/types";

export type ChatRoom = {
	id: string;
	name: string;
	description: string;
	creationdate: Date;
	participants: Array<VideoParticipant>;
	joined: boolean;
}

export namespace Network {
	export namespace CreateRoom {
		export type Request = ChatRoom;

		export type Response = {
			roomId: string;
		}
	}

	export namespace GetRooms {
		export type Request = Array<ChatRoom>;
	}
}

export const RoomNotifications = {
	joined: "joined",
}