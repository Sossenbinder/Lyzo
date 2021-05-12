// Framework
import * as React from "react";
import { connect } from "react-redux";

// Components
import Flex from "common/Components/Flex";
import RoomOverview from "modules/Rooms/Components/RoomOverview"
import VideoRoom from "modules/Rooms/Components/VideoRoom/VideoRoom";

// Types
import { ChatRoom } from "modules/Rooms/types";
import { ReduxStore } from "common/Redux/store";

import "./Styles/Main.less";

type Props = {
	chatRooms: Array<ChatRoom>;
}

export const Main: React.FC<Props> = ({ chatRooms }) => {

	const joinedRoom = chatRooms.find(x => x.joined);

	return (
		<Flex
			className="Main"
			direction="Column">
			<Choose>
				<When condition={!!joinedRoom}>
					<VideoRoom
						room={joinedRoom} />
				</When>
				<Otherwise>
					<RoomOverview
						rooms={chatRooms} />
				</Otherwise>
			</Choose>
		</Flex>
	);
}

const mapStateToProps = (state: ReduxStore): Props => {
	return {
		chatRooms: state.roomReducer.data,
	}
}

export default connect(mapStateToProps)(Main);