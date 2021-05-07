// Framework
import * as React from "react";

// Components
import Flex from "common/Components/Flex";
import OwnVideo from "modules/Video/Components/OwnVideo";
import RemoteVideo from "modules/Video/Components/RemoteVideo";
import LoadingBar from "common/Components/State/LoadingBar";

import "./Styles/Main.less";

export const Main: React.FC = () => {
	return (
		<Flex
			className="Main"
			direction="Column">
			Hello World
			<OwnVideo />
			<RemoteVideo />
			<LoadingBar
				progress={50} />
		</Flex>
	);
}

export default Main;