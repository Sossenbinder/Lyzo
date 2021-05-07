import * as React from "react";
import Context from "./Context";
import { MyContext } from "./types";

export const MyComponent: React.FC = () => {
	const context = React.useContext<MyContext>(Context);

	return (
		<div>
			<p>My component reports: {context.myValue}</p>
		</div>
	);
};

export default MyComponent;
