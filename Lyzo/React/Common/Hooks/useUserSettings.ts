// Framework
import * as React from "react";

// Functionality
import { UserSettingsContext } from "common/Modules/UserSettings/UserSettingsProvider";

// Types
import { UserSettings } from "common/Modules/UserSettings/types";

export const useUserSettings = (): [UserSettings, (settings: UserSettings) => void] => {
	const ctx = React.useContext(UserSettingsContext);

	return [ctx.settings, ctx.updateSettings];
}

export default useUserSettings;