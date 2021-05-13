// Framework
import * as React from "react";

// Components
import Flex from "common/Components/Flex";
import OwnVideo from "modules/Video/Components/OwnVideo";
import RemoteVideo from "modules/Video/Components/RemoteVideo";

// Functionality

// Types
import { ChatRoom } from "modules/Rooms/types";

// Styles
import "./Styles/VideoRoom.less";

type Props = {
	room: ChatRoom;
}

export const VideoRoom: React.FC<Props> = ({ room }) => {
	return (
		<>
			{room.name}
			<OwnVideo
				roomId={room.id} />
			{
				room.participants.map(x =>
					<RemoteVideo
						participant={x}
						key={x.id} />)
			}
		</>
	);
}

export default VideoRoom;