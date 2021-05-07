// Framework
import * as React from "react";

// Components
import Flex from "common/components/Flex";
import OwnVideo from "modules/Video/Components/OwnVideo";
import RemoteVideo from "modules/Video/Components/RemoteVideo";
import LoadingBar from "common/Components/State/LoadingBar";

import Context from "common/Components/Context";
import { MyContext } from "common/Components/types";

// Functionality
import { useServices } from "common/Hooks/useServices";

import "./Styles/Main.less";

export const Main: React.FC = () => {
	const context = React.useContext<MyContext>(Context);

	const services = useServices();
	debugger;
	console.log(services);

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