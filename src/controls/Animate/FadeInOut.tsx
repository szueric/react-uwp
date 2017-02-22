import * as React from "react";
import * as ReactTransitionGroup from "react-addons-transition-group";
import FadeInOutChild from "./FadeInOutChild";
interface DataProps {
	[key: string]: any;
}
export interface FadeInOutProps extends DataProps {
	appearAnimate?: boolean;
	childAttributes?: React.HTMLAttributes<HTMLDivElement>;
	enterDelay?: number;
	leaveDelay?: number;
	maxValue?: number;
	minValue?: number;
	mode?: "In" | "Out" | "Both";
	speed?: number;
}
interface FadeInOutState {}

export default class FadeInOut extends React.Component<FadeInOutProps, FadeInOutState> {
	static defaultProps: FadeInOutProps = {
		appearAnimate: true,
		children: <div>FadeInOut</div>,
		enterDelay: 0,
		leaveDelay: 0,
		maxValue: 1,
		minValue: 0,
		mode: "Both",
		speed: 500,
	};

	render() {
		const {
			appearAnimate, // tslint:disable-line:no-unused-variable
			childAttributes,
			children,
			enterDelay,
			leaveDelay,
			maxValue,
			minValue,
			mode,
			speed,
			style, // tslint:disable-line:no-unused-variable
			...others,
		} = this.props;
		const styles = getStyles(this);

		return (
			<ReactTransitionGroup
				{...others as any}
				style={styles.root}
				component="div"
			>
				{React.Children.map(children, (child: any, index) => (
					<FadeInOutChild
						key={child.key}
						minValue={minValue}
						maxValue={maxValue}
						enterDelay={enterDelay}
						leaveDelay={leaveDelay}
						mode={mode}
						speed={speed}
						appearAnimate={appearAnimate}
						{...childAttributes}
					>
						{child}
					</FadeInOutChild>
				))}
			</ReactTransitionGroup>
		);
	}
}

function getStyles(fadeInOut: FadeInOut): {
	root?: React.CSSProperties;
} {
	const {
		props: { style, speed }
	} = fadeInOut;

	return {
		root: {
			transition: `transform ${speed}ms 0s ease-in-out`,
			...style,
		},
	};
}
