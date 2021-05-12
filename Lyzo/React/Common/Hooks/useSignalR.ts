// Functionality
import useServices from "./useServices";

type Info = {
	send: (methodName: string, ...args: any[]) => void;
	register: (methodName: string, cb: (...args: any[]) => void) => void;
	unregister: (methodName: string) => void;
}

export const useSignalR = (): Info => {
	const { SignalRConnectionProvider } = useServices();

	const connection = SignalRConnectionProvider.SignalRConnection;

	return {
		send: connection.send,
		register: connection.on,
		unregister: connection.off,
	}
};

export default useSignalR;