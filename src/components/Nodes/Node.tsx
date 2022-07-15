import { css } from "solid-styled";
import { JSXElement } from "solid-js";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
  children: JSXElement;
}

export default (props: NodeProps) => {
  const { selected, setSelected } = useStore();

  css`
    div {
      position: absolute;
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
      width: calc(${(props.node.width || 160).toString()} * 1px);
      height: calc(${(props.node.height || 40).toString()} * 1px);
      color: ${props.node.textColor || "black"};
      background-color: ${props.node.bgColor || "white"};
      border-radius: calc(${(props.node.borderRadius || 3).toString()} * 1px);
      border: 1px solid ${props.node.borderColor || "#4c4c4c"};
      box-shadow: inset 0 0 0 0.15px ${props.node.borderColor || "#4c4c4c"},
        0 0 0 0.15px ${props.node.borderColor || "#4c4c4c"};
      transform: translate3d(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px),
        0
      );
    }
    div:hover {
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
        drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
      z-index: 9;
    }
    .selected {
      box-shadow: inset 0 0 0 0.5px #446b9e, 0 0 0 0.5px #446b9e;
    }
  `;

  return (
    <>
      <div
        onPointerDown={() => setSelected(props.node.id)}
        classList={{ selected: selected() === props.node.id }}
      >
        {props.children}
      </div>
    </>
  );
};
