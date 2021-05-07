import * as React from "react";
import Context from "./Context";
import { MyContext } from "./types";
import ServiceUpdateEvent from "common/Modules/Service/ServiceUpdateEvent";

export const MyContextProvider: React.FC = ({ children }) => {
	const [serviceState, setServiceState] = React.useState<MyContext>({
		myValue: "default"
	});

	React.useEffect(() => {
		const registration = ServiceUpdateEvent.Register(_ => {
			setServiceState({ myValue: "Changed " });
			return Promise.resolve();
		});

		return () => ServiceUpdateEvent.Unregister(registration);
	}, []);

	return <Context.Provider value={serviceState}>{children}</Context.Provider>;
};

export default MyContextProvider;
