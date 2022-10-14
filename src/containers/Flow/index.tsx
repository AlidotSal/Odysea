import { StyleRegistry } from "solid-styled";
import { StoreProvider } from "../../store";
import GraphView from "../GraphView";
import type { InitialNodeI, EdgeI } from "../../types";
import { JSXElement } from "solid-js";

interface Props {
	nodes: InitialNodeI[];
	edges: EdgeI[];
	width?: string;
	height?: string;
	background?: string;
	children: JSXElement;
}

export default (props: Props) => {
	return (
		<StyleRegistry>
			<StoreProvider
				nodes={props.nodes}
				edges={props.edges}
				width={props.width}
				height={props.height}
				background={props.background}
			>
				<GraphView />
				{props.children}
			</StoreProvider>
		</StyleRegistry>
	);
};
