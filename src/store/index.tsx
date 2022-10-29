import { createSignal, createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Setter } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { NodeI, EdgeI, StoreProps } from "../types";
import { Position } from "../types/utils";

interface Nodes {
	[key: string]: NodeI;
}
interface StoreI {
	nodes: Nodes;
	edges: EdgeI[];
}

const StoreContext = createContext();

export const StoreProvider = (props: StoreProps) => {
	let nodes: Nodes = {};
	for (let i = 0; i < props.nodes.length; i++) {
		const type = props.nodes[i]?.type || "default";
		nodes[props.nodes[i].id] = {
			width: type === "dot" ? 11 : type === "backdrop" ? 220 : 160,
			height:
				type === "dot"
					? 11
					: type === "note"
					? 80
					: type === "backdrop"
					? 110
					: 40,
			label: "",
			type: "default",
			inputPosition: Position.Top,
			outputPosition: Position.Bottom,
			inputHandle: true,
			outputHandle: true,
			...props.nodes[i],
			// Todo: input and output should be simplified
			get input() {
				let x;
				let y;
				switch (this.inputPosition) {
					case Position.Bottom: {
						x = this.position.x + this.width / 2;
						y = this.position.y + this.height;
						break;
					}
					case Position.Right: {
						x = this.position.x + this.width;
						y = this.position.y + this.height / 2;
						break;
					}
					case Position.Left: {
						x = this.position.x;
						y = this.position.y + this.height / 2;
						break;
					}
					default:
						x = this.position.x + this.width / 2;
						y = this.position.y;
				}
				if (!this.inputHandle) {
					x = this.position.x + this.width / 2;
					y = this.position.y + this.height / 2;
				}
				return { x, y };
			},
			get output() {
				let x;
				let y;
				switch (this.outputPosition) {
					case Position.Top: {
						x = this.position.x + this.width / 2;
						y = this.position.y;
						break;
					}
					case Position.Right: {
						x = this.position.x + this.width;
						y = this.position.y + this.height / 2;
						break;
					}
					case Position.Left: {
						x = this.position.x;
						y = this.position.y + this.height / 2;
						break;
					}
					default:
						x = this.position.x + this.width / 2;
						y = this.position.y + this.height;
				}
				if (!this.outputHandle) {
					x = this.position.x + this.width / 2;
					y = this.position.y + this.height / 2;
				}
				return { x, y };
			},
		};
	}
	const [store, setStore] = createStore<StoreI>({ nodes, edges: props.edges });
	const [width, setWidth] = createSignal(props.width || "800px");
	const [height, setHeight] = createSignal(props.height || "800px");
	const [canvasbg, setCanvasbg] = createSignal(props.background || "#f7f9fb");
	const [selected, setSelected] = createSignal<string[]>([]);
	const [isDragging, setDragging] = createSignal<boolean>(false);
	const [scale, setScale] = createSignal(1);
	const [transition, setTransition] = createSignal<[number, number]>([0, 0]);

	const updatePosition = (xTrans: number, yTrans: number, items: string[]) => {
		setStore(
			produce((s) => {
				for (let i = 0; i < items.length; i++) {
					s.nodes[items[i]].position.x += xTrans / scale();
					s.nodes[items[i]].position.y += yTrans / scale();
				}
			}),
		);
	};

	const drag = (xTrans: number, yTrans: number, id: string) => {
		setStore(
			produce((s) => {
				s.nodes[id].width += xTrans;
				s.nodes[id].height += yTrans;
			}),
		);
	};

	const storeValue = {
		store,
		setStore,
		updatePosition,
		drag,
		isDragging,
		setDragging,
		width,
		setWidth,
		height,
		setHeight,
		canvasbg,
		setCanvasbg,
		selected,
		setSelected,
		scale,
		setScale,
		transition,
		setTransition,
	};

	return (
		<StoreContext.Provider value={storeValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

interface UseStore {
	store: StoreI;
	setStore: SetStoreFunction<StoreI>;
	updatePosition: (x: number, y: number, items: string[]) => void;
	drag: (x: number, y: number, id: string) => void;
	isDragging: () => boolean;
	setDragging: Setter<boolean>;
	width: () => string;
	setWidth: Setter<string>;
	height: () => string;
	setHeight: Setter<string>;
	canvasbg: () => string;
	setCanvasbg: Setter<string>;
	selected: () => string[];
	setSelected: Setter<string[]>;
	scale: () => number;
	setScale: Setter<number>;
	transition: () => [number, number];
	setTransition: Setter<[number, number]>;
}

export const useStore = () => useContext(StoreContext) as UseStore;
