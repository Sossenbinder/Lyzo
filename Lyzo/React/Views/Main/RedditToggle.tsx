// Framework
import * as React from "react";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// Components
import Flex from "common/components/Flex";

// Functionality
import useUserSettings from "common/Hooks/useUserSettings";

import "./Styles/RedditToggle";

const GreenSwitch = withStyles({
	switchBase: {
		color: green[400],
		'&$checked': {
			color: green[400],
		},
		'&$checked + $track': {
			backgroundColor: green[100],
		},
	},
	checked: {},
	track: {},
})(Switch);

export const RedditToggle: React.FC = () => {

	const [settings, updateSettings] = useUserSettings();

	return (
		<Flex
			className="RedditToggle"
			crossAlign="Center"
			direction="Row">
			<p className="OldRedditName">Old Reddit</p>
			<GreenSwitch
				checked={true}
				onChange={(_, checked) => updateSettings({
					...settings,
					useOldReddit: !checked,
				})}
			/>
			<p className="NewRedditName">New Reddit</p>
		</Flex>
	);
}

export default RedditToggle;