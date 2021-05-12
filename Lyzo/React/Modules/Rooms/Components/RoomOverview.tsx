// Framework
import * as React from "react";

// Components
import Grid from "common/Components/Grid";
import Cell from "common/Components/Cell";
import RoomCreator from "./RoomCreator";
import RoomList from "./RoomList";

// Functionality
import useServices from "common/Hooks/useServices";
import useSignalR from 'common/Hooks/useSignalR';

// Types
import { ChatRoom } from "modules/Rooms/types";

// Styles
import "./Styles/RoomOverview.less";

type Props = {
	rooms: Array<ChatRoom>;
}

enum ViewState {
	List,
	Create
}

export const RoomOverview: React.FC<Props> = ({ rooms }) => {

	const [viewState, setViewState] = React.useState(ViewState.List);

	const { RoomService } = useServices();

	const signalR = useSignalR();

	const viewMap = React.useMemo(() => new Map<ViewState, JSX.Element>([
		[ViewState.List, (
			<RoomList
				rooms={rooms}
				roomsService={RoomService} />
		)],
		[ViewState.Create, (
			<RoomCreator
				roomsService={RoomService} />
		)]
	]), [rooms, RoomService]);

	const view = viewMap.get(viewState);

	return (
		<div className="RoomOverViewContainer">
			<div className="Logo">
				<h1>
					Lyzo
				</h1>
			</div>
			<Grid
				className="RoomOverview"
				gridProperties={{
					gridTemplateRows: "50px 4fr 1fr",
					gridTemplateColumns: "1fr 1fr 50px"
				}}>
				<Cell
					className="HeaderSection"
					cellStyles={{
						gridColumn: "1 / 4"
					}}>
					<p>Pick a room</p>
				</Cell>
				<Cell
					className="MainSection"
					cellStyles={{
						gridColumn: "1 / 4"
					}}>
					{view}
				</Cell>
				<div className="RoomButton">
					Join Room
				</div>
				<div
					className="RoomButton"
					onClick={() => setViewState(ViewState.Create)}>
					Create Room
				</div>
			</Grid>
		</div>
	);
}
export default RoomOverview;