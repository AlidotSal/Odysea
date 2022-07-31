import { css } from "solid-styled";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  const { selected, setSelected } = useStore();

  css`
    div {
      position: absolute;
      padding: 0.5rem 0.8rem;
      cursor: grab;
      line-height: 1.25rem;
      width: calc(${props.node.width.toString()} * 1px);
      min-height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      background-color: ${props.node.bgColor || "#dede8c"};
      border-radius: 25px 0 0 0;
      border: 1px solid ${props.node.borderColor || "#616161"};
      transform: translate(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px)
      );
    }
    div:hover {
      z-index: 9;
    }
    .selected {
      border: 1px solid #446b9e;
    }
  `;

  return (
    <div
      onPointerDown={() => setSelected([props.node.id])}
      classList={{ selected: selected().includes(props.node.id) }}
    >
      {props.node.data.label}
    </div>
  );
};
