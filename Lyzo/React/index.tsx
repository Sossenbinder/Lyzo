// Framework
import 'regenerator-runtime/runtime';

// Components
import renderRoot from "common/Components/RootComponent";

// Functionality
import ServiceUpdateEvent from "common/Modules/Service/ServiceUpdateEvent";
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import SignalRConnectionProvider from "common/Helper/SignalR/SignalRConnectionProvider";
import WebRTCService from "modules/Video/Service/WebRTCService";

// Types
import { Services, IModuleService } from "common/Modules/Service/types";

window.onload = async () => {
	const signalRConnectionProvider = new SignalRConnectionProvider();
	await signalRConnectionProvider.start();

	renderRoot(() => initCoreServices(signalRConnectionProvider), 1);
}

const initCoreServices = async (signalRProvider: ISignalRConnectionProvider) => {

	const initPromises: Array<Promise<void>> = [];

	const initService = async (serviceName: keyof Services, service: IModuleService) => {
		await service.start();

		await ServiceUpdateEvent.Raise({
			name: serviceName,
			service: service,
		});
	}

	initPromises.push((async () => {
		await fetch("/Identity/Identify");
	})());

	const symbolService = new WebRTCService(signalRProvider);
	initPromises.push(initService("WebRTCService", symbolService));

	await Promise.all(initPromises);
}