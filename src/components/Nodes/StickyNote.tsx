import { css } from "solid-styled";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  css`
    section {
      transform: translate(
          calc(${props.node.position[0].toString()} * 1px),
          calc(${props.node.position[1].toString()} * 1px)
      );
    }
    p {
      width: calc(${props.node.width.toString()} * 1px);
      height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      font-size: ${props.node.fontSize};
      background-color: ${props.node.bgColor || "#dede8c"};
    }
  `;

  return (
    <section class="sticky">
      <p>{props.node.label}</p>
    </section>
  );
};
