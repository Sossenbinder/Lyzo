// Framework
import * as React from "react";

// Components
import Flex from "common/Components/Flex";

// Functionality

// Types
import { IRoomService } from "common/Modules/Service/types";

// Styles
import "./Styles/RoomCreator.less";

type Props = {
	roomsService: IRoomService;
}

export const RoomCreator: React.FC<Props> = ({ roomsService }) => {
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");

	const onClick = async () => {
		await roomsService.createRoom(name, description);
	};

	return (
		<Flex
			className="RoomCreator"
			direction="Column">
			<h3>Create a new room</h3>
			<label>
				Name:
				<input type="text" value={name} onChange={event => setName(event.target.value)} />
			</label>
			<label>
				Description:
				<input type="text" value={description} onChange={event => setDescription(event.target.value)} />
			</label>
			<button onClick={onClick}>
				Create
			</button>
		</Flex>
	);
}

export default RoomCreator;