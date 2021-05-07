// Framework
import * as React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import LoadingBar from "common/Components/State/LoadingBar";
import Main from "views/Main/Main";
import ServiceContextProvider from "common/Modules/Service/ServiceContextProvider";
import ServiceUpdateEvent from "common/Modules/Service/ServiceUpdateEvent";

// Functionality
import { store } from "common/Redux/store";

// Styles
import "./Styles/RootComponent.less";

type Props = {
	initFunc(): Promise<void>;
	initServiceCount: number;
}

const queryClient = new QueryClient();

export const TestContext = React.createContext({ bla: "Yep" });

// Types
const RootComponent: React.FC<Props> = ({ initFunc, initServiceCount }) => {

	const [initialized, setInitialized] = React.useState(false);
	const [loadedServices, setLoadedServices] = React.useState(0);

	React.useEffect(() => {
		let localLoadedServices = loadedServices;

		const registration = ServiceUpdateEvent.Register(_ => {
			localLoadedServices++;
			setLoadedServices(localLoadedServices);
			return Promise.resolve();
		});

		initFunc().then(_ => setInitialized(true));

		return () => ServiceUpdateEvent.Unregister(registration);
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<ServiceContextProvider>
						<Choose>
							<When condition={loadedServices === initServiceCount && initialized}>
								<Main />
							</When>
							<Otherwise>
								<LoadingBar
									progress={(loadedServices / initServiceCount) * 100} />
							</Otherwise>
						</Choose>
					</ServiceContextProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</Provider>
	);
}

const renderRoot = (initFunc: () => Promise<void>, initServiceCount: number) => render(
	<RootComponent
		initFunc={initFunc}
		initServiceCount={initServiceCount} />,
	document.getElementById("reactRoot")
);

export default renderRoot;