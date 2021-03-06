// Framework
import * as React from "react";
import classNames from "classnames";

import "./Styles/Grid.less";

enum GridDisplay {
	Regular,
	Inline
}

type GridStyleKeys = "gridColumnGap" | "gridRowGap" | 'gridTemplateColumns' | 'gridAutoColumns' | 'gridAutoRows' | 'gridTemplateRows' | 'justifyContent' | 'alignContent' | 'gridTemplateAreas';

type GridStyles = Pick<React.CSSProperties, GridStyleKeys>;

type GridProps = {
	className?: string;
	display?: GridDisplay;

	gridProperties?: GridStyles;
}

export const Grid: React.FC<GridProps> = ({
	className,
	gridProperties,
	display = GridDisplay.Regular,
	children
}) => {

	const classes = classNames({
		"grid": display === GridDisplay.Regular,
		"inlineGrid": display === GridDisplay.Inline,
	});

	return (
		<div
			className={`${classes} ${typeof className !== "undefined" ? className : ""}`}
			style={gridProperties}>
			{ children}
		</div>
	)
}

export default Grid;