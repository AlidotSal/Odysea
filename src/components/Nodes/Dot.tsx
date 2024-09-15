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
      background-color: ${props.node.bgColor || "var(--nodeBG)"};
      outline: 1px solid ${props.node.borderColor || "var(--nodeBR)"};
      transform: translate(
        calc(${props.node.position[0].toString()} * 1px),
        calc(${props.node.position[1].toString()} * 1px)
      );
    }
  `;

  return <section class="dot" classList={{ selected: props.node.selected }} />;
};
