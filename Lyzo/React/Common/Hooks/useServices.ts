// Framework
import * as React from "react";

// Functionality
import ServiceContext from "common/modules/service/ServiceContext";

// Types
import { Services } from "common/modules/Service/types";

export const useServices = (): Services => {
	return React.useContext(ServiceContext);
}

export default useServices;