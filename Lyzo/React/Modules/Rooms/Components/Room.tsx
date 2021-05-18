// Framework
import * as React from "react";
import { Button } from "@material-ui/core";

// Components
import Flex from "common/Components/Flex";

// Types
import { ChatRoom } from "modules/Rooms/types";
import { IRoomService } from "common/Modules/Service/types";

// Styles
import "./Styles/Room.less";

type Props = {
	room: ChatRoom;
	roomsService: IRoomService;
}

export const Room: React.FC<Props> = ({ room, roomsService }) => {

	const onJoin = React.useCallback(async () => {
		await roomsService.joinRoom(room.id);
	}, [roomsService, room]);

	return (
		<Flex
			className="RoomContainer"
			crossAlign="Center"
			direction="Row">
			<Flex
				className="RoomInfo"
				direction="Column">
				<p className="Name">
					{room.name}
				</p>
				<p className="Description">
					{room.description}
				</p>
			</Flex>
			<Flex
				className="RoomMetaData">
				{`${room.participantCount}/${room.maxParticpants ?? "∞"}`}
			</Flex>
			<Button
				className="JoinButton"
				color="primary"
				onClick={onJoin}
				variant="contained">
				Join
			</Button>
		</Flex>
	);
}

export default Room;