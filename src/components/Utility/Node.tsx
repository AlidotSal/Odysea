import { onMount, onCleanup } from "solid-js";
import { produce } from "solid-js/store";
import { useStore } from "../../store";
import type { InitialNodeI } from "../../types";
import { Position } from "../../types/utils";
interface PropsI {
	data: InitialNodeI;
}
export default (props: PropsI) => {
	const { setStore } = useStore();
	const type = props.data.type || "default";
	const newNode = {
		[props.data.id]: {
			width: type === "dot" ? 11 : type === "backdrop" ? 220 : 160,
			height:
				type === "dot"
					? 11
					: type === "note"
					? 80
					: type === "backdrop"
					? 110
					: 40,
			type: "default",
			inputPosition: Position.Top,
			outputPosition: Position.Bottom,
			inputHandle: true,
			outputHandle: true,
			...props.data,
			// Todo: input and output should be simplified
			get input(): { x: number; y: number } {
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
			get output(): { x: number; y: number } {
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
		},
	};
	onMount(() => {
		setStore("nodes", (n) => {
			return {
				...n,
				...newNode,
			};
		});
	});
	onCleanup(() => {
		setStore(
			produce((s) => {
				s.nodes[props.data.id] = undefined;
			}),
		);
	});

	return null;
};
