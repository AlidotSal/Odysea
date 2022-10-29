import { css } from "solid-styled";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
	node: NodeI;
}

export default (props: NodeProps) => {
	const { selected } = useStore();

	css`
    div {
      position: absolute;
      user-select: none;
      cursor: grab;
      overscroll-behavior: auto;
      width: 11px;
      height: 11px;
      background-color: ${props.node.bgColor || "white"};
      border-radius: 50%;
      border: 1px solid #616161;
      transform: translate(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px)
      );
    }
    div:hover {
      z-index: 9;
    }
    .selected > div {
      border: 2px solid #446b9e;
    }
  `;

	return (
		<section
			classList={{ selected: selected().includes(props.node.id) }}
			data-id={props.node.id}
		>
			<div />
		</section>
	);
};
