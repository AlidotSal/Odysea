import { css } from "solid-styled";
import { Show } from "solid-js";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
	node: NodeI;
}

export default (props: NodeProps) => {
	const { selected } = useStore();

	css`
    section {
      position: absolute;
      transform: translate(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px)
      );
    }
    section:hover {
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
        drop-shadow(0 1px 1px rgb(0 0 0 / 0.2));
        z-index: 8;
    }
    .selected {
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
      drop-shadow(0 1px 1px rgb(0 0 0 / 0.2));
      z-index: 9;
    }
    div {
      display: grid;
      padding: 0.25rem;
      user-select: none;
      cursor: grab;
      justify-content: center;
      align-items: center;
      overscroll-behavior: auto;
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: center;
      width: calc(${props.node.width.toString()} * 1px);
      height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      background-color: ${props.node.bgColor || "white"};
      border-radius: calc(${(props.node.borderRadius || 4).toString()} * 1px);
      border: 2px solid ${props.node.borderColor || "#616161"};
    }
    .selected > div {
      border: 2px solid #446b9e;
    }
    span {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #111;
      border: 1px solid white;
      border-radius: 50%;
      opacity: 0.8;
    }
    .input {
      top: calc(
        ${
					props.node.inputPosition === "bottom"
						? (props.node.height - 5).toString()
						: props.node.inputPosition === "top"
						? "-3"
						: (props.node.height / 2 - 4).toString()
				} * 1px
      );
      left: calc(
        ${
					props.node.inputPosition === "right"
						? (props.node.width - 5).toString()
						: props.node.inputPosition === "left"
						? "-3"
						: (props.node.width / 2 - 4).toString()
				} * 1px
      );
    }
    .output {
      top: calc(
        ${
					props.node.outputPosition === "bottom"
						? (props.node.height - 5).toString()
						: props.node.outputPosition === "top"
						? "-3"
						: (props.node.height / 2 - 4).toString()
				} * 1px
      );
      left: calc(
        ${
					props.node.outputPosition === "right"
						? (props.node.width - 5).toString()
						: props.node.outputPosition === "left"
						? "-3"
						: (props.node.width / 2 - 4).toString()
				} * 1px
      );
    }
  `;

	return (
		<section
			classList={{ selected: selected().includes(props.node.id) }}
			data-id={props.node.id}
		>
			<Show when={props.node.inputHandle}>
				<span class="input" />
			</Show>
			<div>{props.node.label}</div>
			<Show when={props.node.outputHandle}>
				<span class="output" />
			</Show>
		</section>
	);
};
