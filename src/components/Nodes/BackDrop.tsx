import { css } from "solid-styled";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
	node: NodeI;
}

export default (props: NodeProps) => {
	const { store, selected, setSelected } = useStore();

	function handleSelection() {
		const nodes = Object.keys(store.nodes);
		const nodesInside = [];
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];
			const centerX =
				(store.nodes[node]?.position.x ?? 0) +
				(store.nodes[node]?.width ?? 0) / 2;
			const centerY =
				(store.nodes[node]?.position.y ?? 0) +
				(store.nodes[node]?.height ?? 0) / 2;
			if (
				centerX > props.node.position.x &&
				centerX < props.node.position.x + props.node.width &&
				centerY > props.node.position.y &&
				centerY < props.node.position.y + props.node.height
			) {
				nodesInside.push(node);
			}
		}
		setSelected(nodesInside);
	}

	css`
    section {
      position: absolute;
      min-width: 5rem;
      width: calc(${props.node.width.toString()} * 1px);
      min-height: 2rem;
      height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      transform: translate(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px)
      );
      z-index: -1;
    }
    h1 {
      cursor: grab;
      margin: 0.2rem;
      text-align: center;
      user-select: none;
      background-color: rgb(255 255 255 / 0.5);
    }
    .selected > h1 {
      background-color: rgb(196 84 89 / 0.4);
    }
    span {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: linear-gradient(
        135deg,
        transparent 0%,
        transparent 50%,
        rgb(255 255 255 / 0.5) 50%,
        rgb(255 255 255 / 0.5) 100%
      );
    }
    .selected > span {
      background: linear-gradient(
        135deg,
        transparent 0%,
        transparent 50%,
        rgb(196 84 89 / 0.4) 50%,
        rgb(196 84 89 / 0.4) 100%
      );
    }
    span:hover {
      cursor: nwse-resize;
    }
  `;

	return (
		<section
			classList={{ selected: selected().includes(props.node.id) }}
			data-id={props.node.id}
		>
			<h1 onPointerDown={handleSelection}>{props.node.label}</h1>
			<span data-action="drag" />
		</section>
	);
};
