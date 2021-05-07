// Framework
import * as React from "react";

// Functionality
import classNames from "classnames";

type Props = {
	iconName: string;
	size?: number;

	onClick?(): void;
	className?: string;
}

export const MaterialIcon: React.FC<Props> = ({ className, iconName, size, onClick }) => {

	const classes = classNames({
		"material-icons": true,
	}, className ?? "");

	size ??= 24;

	return (
		<i
			onClick={() => onClick?.()}
			className={classes}
			style={{ fontSize: size }}>
			{iconName}
		</i>
	);
}

export default MaterialIcon;