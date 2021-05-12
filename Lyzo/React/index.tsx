// Framework
import 'regenerator-runtime/runtime';

// Components
import renderRoot from "common/Components/RootComponent";

// Functionality
import ServiceUpdateEvent from "common/Modules/Service/ServiceUpdateEvent";
import ISignalRConnectionProvider from "common/Helper/SignalR/Interface/ISignalRConnectionProvider";
import SignalRConnectionProvider from "common/Helper/SignalR/SignalRConnectionProvider";
import WebRTCService from "modules/Video/Service/WebRTCService";
import RoomService from "modules/Rooms/Service/RoomService";

// Types
import { Services, IModuleService } from "common/Modules/Service/types";

window.onload = async () => {
	const signalRConnectionProvider = new SignalRConnectionProvider();
	await signalRConnectionProvider.start();

	renderRoot(signalRConnectionProvider, () => initCoreServices(signalRConnectionProvider), 3);
}

const initCoreServices = async (signalRProvider: ISignalRConnectionProvider) => {

	await ServiceUpdateEvent.Raise({
		name: "SignalRConnectionProvider",
		service: signalRProvider,
	});

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

	const webRtcService = new WebRTCService(signalRProvider);
	initPromises.push(initService("WebRTCService", webRtcService));

	const roomService = new RoomService(signalRProvider);
	initPromises.push(initService("RoomService", roomService));

	await Promise.all(initPromises);
}