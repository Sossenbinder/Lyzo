export type UserSettings = {
}

export type UpdateableUserSettings = {
	settings: UserSettings;
	updateSettings(settings: UserSettings): void;
}