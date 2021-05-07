// Framework
import * as React from "react";

// Functionality
import ServiceContext from "common/Modules/Service/ServiceContext";

// Types
import { Services } from "common/Modules/Service/types";

export const useServices = (): Services => {
	return React.useContext(ServiceContext);
};

export default useServices;