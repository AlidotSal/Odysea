import { Portal } from "solid-js/web";
import { css } from "solid-styled";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  css`
    section {
      width: calc(${props.node.width.toString()} * 1px);
      height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      transform: translate(
        calc(${props.node.position[0].toString()} * 1px),
        calc(${props.node.position[1].toString()} * 1px)
      );
    }
  `;

  return (
    <section class="backdrop" classList={{ selected: props.node.selected }}>
      <Portal mount={document.getElementById("rects") ?? undefined} isSVG={true}>
        <rect
          class="rect"
          fill={props.node.bgColor ?? "#adadad"}
          shape-rendering="optimizeSpeed"
          x={props.node.position[0]}
          y={props.node.position[1]}
          width={Math.max(props.node.width, 80)}
          height={Math.max(props.node.height, 80)}
        />
      </Portal>
      <h1>{props.node.label}</h1>
    </section>
  );
};
