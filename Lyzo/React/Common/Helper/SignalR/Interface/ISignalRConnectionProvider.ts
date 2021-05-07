// Framework
import * as signalR from "@microsoft/signalr";

// Types
import { NotificationType, Notification } from "./../types";

export interface ISignalRConnectionProvider {
	start(): Promise<void>;

	registerNotificationHandler<T>(notificationType: NotificationType, handler: (notification: Notification<T>) => Promise<void>): void;

	readonly SignalRConnection: signalR.HubConnection;
}

export default ISignalRConnectionProvider;