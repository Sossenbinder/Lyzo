// Framework
import * as React from "react";

// Components
import Flex from "common/Components/Flex";
import Room from "./Room";

// Functionality
import useAsyncCall from "common/Hooks/useAsyncCall";

// Types
import { ChatRoom } from "modules/Rooms/types";
import { IRoomService } from "common/Modules/Service/types";

// Styles
import "./Styles/RoomList.less";

type Props = {
	roomsService: IRoomService;
	rooms: Array<ChatRoom>;
}

export const RoomList: React.FC<Props> = ({ roomsService, rooms }) => {

	const [isRunning, call] = useAsyncCall();

	React.useEffect(() => {
		call(() => roomsService.getRooms());
	}, []);

	return (
		<Flex className="RoomList">
			<Choose>
				<When condition={!isRunning}>
					<Choose>
						<When condition={rooms?.length > 0}>
							<div className="ScrollListContainer">
								<Flex
									className="ScrollList"
									direction="Column">
									{
										rooms.map(room =>
											<Room
												key={room.id}
												room={room}
												roomsService={roomsService} />
										)
									}
								</Flex>
							</div>
						</When>
						<Otherwise>
							No rooms...
						</Otherwise>
					</Choose>
				</When>
				<Otherwise>
					Loading...
				</Otherwise>
			</Choose>
		</Flex>
	);
}

export default RoomList;