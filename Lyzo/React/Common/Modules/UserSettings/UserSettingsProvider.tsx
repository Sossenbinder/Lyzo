// Framework
import * as React from "react";
import { useQueryClient, useQuery, useMutation } from 'react-query';

// Functionality
import GetRequest from "common/Helper/Requests/GetRequest";
import { VoidPostRequest } from "common/Helper/Requests/PostRequest";

// Types
import { UserSettings, UpdateableUserSettings } from "./types";

const userSettings: UpdateableUserSettings = {
	settings: {
		useOldReddit: false
	},
	updateSettings: () => void 0,
}

export const UserSettingsContext = React.createContext<UpdateableUserSettings>(userSettings);

const userSettingsQueryClientKey = "userSettings_queryClient";

export const UserSettingsContextProvider: React.FC = ({ children }) => {

	const queryClient = useQueryClient();

	const { data } = useQuery(userSettingsQueryClientKey, async () => {
		const request = new GetRequest<UserSettings>("/UserSettings/Get");
		const result = await request.get();
		return result.payload;
	});

	const { mutate } = useMutation(async (settings: UserSettings) => {
		const updateRequest = new VoidPostRequest<UserSettings>("/UserSettings/Update");
		await updateRequest.post(settings);
		return settings;
	}, {
		onSuccess: (newData) => {
			queryClient.setQueryData(userSettingsQueryClientKey, newData);
		}
	})

	return (
		<UserSettingsContext.Provider value={{
			settings: { ...data },
			updateSettings: mutate,
		}}>
			{children}
		</UserSettingsContext.Provider>
	);
}

export default UserSettingsContextProvider;