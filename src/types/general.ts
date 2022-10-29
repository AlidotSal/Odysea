import type { JSX } from "solid-js";
import type { Position, XYPosition } from "./utils";

export interface InitialNodeI {
	id: string;
	label?: string;
	type?: string;
	position: XYPosition;
	inputPosition?: Position;
	outputPosition?: Position;
	width?: number;
	height?: number;
	inputHandle?: boolean;
	outputHandle?: boolean;
	bgColor?: string;
	fontSize?: number;
	borderColor?: string;
	borderRadius?: number;
	textColor?: string;
}
export interface NodeI {
	id: string;
	label: string;
	type: string;
	position: XYPosition;
	inputPosition: Position;
	outputPosition: Position;
	width: number;
	height: number;
	inputHandle: boolean;
	outputHandle: boolean;
	bgColor?: string;
	fontSize?: number;
	borderColor?: string;
	borderRadius?: number;
	textColor?: string;
	input: { x: number; y: number };
	output: { x: number; y: number };
}

export interface EdgeI {
	id: string;
	source: string;
	target: string;
	label?: string;
	type?: string;
	animated?: boolean;
	arrow?: boolean;
	style?: JSX.PathSVGAttributes<SVGPathElement>;
	labelStyle?: JSX.CSSProperties;
	labelBgStyle?: JSX.CSSProperties;
}

export interface StoreProps {
	nodes: InitialNodeI[];
	edges: EdgeI[];
	width?: string;
	height?: string;
	background?: string;
	children: JSX.Element;
}

export interface GraphProps {
	nodes: NodeI[];
	edges: EdgeI[];
	width: number;
	height: number;
}

export interface EdgeProps extends EdgeI {
	path: string;
	sourceNode: NodeI;
	targetNode: NodeI;
}

export type HandleType = "source" | "target";

export type KeyCode = string | string[];
