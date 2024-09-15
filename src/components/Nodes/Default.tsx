import { Show } from "solid-js";
import { css } from "solid-styled";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  css`
    section {
      flex-flow: ${props.node.inputPosition === "top" || props.node.inputPosition === "bottom" ? "column" : "row-reverse"};
      transform: translate(
        calc(${(props.node.position[0]).toString()} * 1px),
        calc(${(props.node.position[1] - +(props.node.inputHandle && props.node.inputPosition === "top") * 8).toString()} * 1px)
      );
    }
    p {
      width: calc(${props.node.width.toString()} * 1px);
      height: calc(${props.node.height.toString()} * 1px);
      font-size: ${props.node.fontSize};
      color: ${props.node.textColor || "var(--nodeC)"};
      background-color: ${props.node.bgColor || "var(--nodeBG)"};
      border-radius: calc(${(props.node.borderRadius || 5).toString()} * 1px);
      border: 2px solid ${props.node.borderColor || "var(--nodeBR)"};
    }
    span {
      background-color: ${props.node.bgColor || "var(--nodeBG)"};
      outline: 1px solid ${props.node.borderColor || "var(--nodeBR)"};
      translate: ${props.node.inputPosition === "top" ? "0" : "-5px"} ${props.node.inputPosition === "right" ? "0" : "5px"};
    }
    p+span {
      translate: ${props.node.outputPosition === "bottom" ? "0" : "5px"} ${props.node.outputPosition === "left" ? "0" : "-5px"};
    }
  `;

  return (
    <section class="default" classList={{ selected: props.node.selected }}>
      <Show when={props.node.inputHandle}>
        <span class="input" />
      </Show>
      <p>{props.node.label}</p>
      <Show when={props.node.outputHandle}>
        <span class="output" />
      </Show>
    </section>
  );
};
