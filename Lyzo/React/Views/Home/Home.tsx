// Framework
import * as React from "react";

// Components
import Flex from "common/components/Flex";

// Functionality

// Types

import "./Styles/Home.less";

type Props = {

}

export const Home: React.FC<Props> = () => {
	return (
		<Flex
			className="Home"
			direction="Column">
			<Flex
				className="StockPickerContainer"
				crossAlignSelf="Center">
			</Flex>
		</Flex>
	);
}

export default Home;