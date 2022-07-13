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
    padding: .25rem
    user-select: none;
    cursor: grab;
    justify-content: center;
    align-items: center;
    overscroll-behavior: auto;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    width: ${(props.node.width || 140).toString()}px;
    height: ${(props.node.height || 36).toString()}px;
    border-radius: ${(props.node.borderRadius || 3).toString()}px;
    color: ${props.node.textColor || "black"};
    background-color: ${props.node.bgColor || "white"};
    transform: translate3d(${props.node.position.x.toString()}px, ${props.node.position.y.toString()}px, 0);
  }
  div:hover {
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    z-index: 9;
  }
`;

  return (
    <>
      <div onPointerDown={() => setSelected(props.node.id)}>
        {props.children}
      </div>
    </>
  );
};
