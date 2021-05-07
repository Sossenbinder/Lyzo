// Framework
import * as React from "react";

// Components
import Flex from "common/Components/Flex";
import RedditToggle from "./RedditToggle";

// Types

import "./Styles/NavBar.less";

type Props = {
}

export const NavBar: React.FC<Props> = () => {
	return (
		<Flex
			className="NavBar"
			direction="Row"
			space="Between">
			<Flex
				className="Label"
				direction="Row"
				crossAlign="Center">
				MoonWatch
			</Flex>
			<Flex
				className="ControlSection"
				crossAlign="Center">
				<RedditToggle />
			</Flex>
		</Flex>
	);
}

export default NavBar;