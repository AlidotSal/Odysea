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
    ${
      props.node.id === selected()
        ? `border: 1px solid #335d92; box-shadow: inset 0 0 0 .15px #2c4f7c, 0 0 0 .15px #2c4f7c;`
        : `border: 1px solid ${
            props.node.borderColor || "#5a5a5a"
          }; box-shadow: inset 0 0 0 .15px ${
            props.node.borderColor || "#5a5a5a"
          }, 0 0 0 .15px ${props.node.borderColor || "#5a5a5a"};`
    }
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
