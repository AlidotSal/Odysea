import { JSXElement } from "solid-js";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
  children: JSXElement;
}

export default (props: NodeProps) => {
  const { selected, setSelected } = useStore();

  return (
    <>
      <div
        onPointerDown={() => setSelected(props.node.id)}
        class="Node absolute grid p-1 select-none cursor-grab justify-center items-center overscroll-auto text-sm text-center hover:drop-shadow hover:z-9"
        style={`transform: translate3d(${props.node.position.x}px, ${
          props.node.position.y
        }px, 0);
              width: ${props.node.width || 140}px;
              height: ${props.node.height || 36}px;
              ${
                props.node.id === selected()
                  ? `border: 1px solid #335d92; box-shadow: inset 0 0 0 .15px #2c4f7c, 0 0 0 .15px #2c4f7c;`
                  : `border: 1px solid ${
                      props.node.borderColor || "#5a5a5a"
                    }; box-shadow: inset 0 0 0 .15px ${
                      props.node.borderColor || "#5a5a5a"
                    }, 0 0 0 .15px ${props.node.borderColor || "#5a5a5a"};`
              }
              border-radius: ${props.node.borderRadius || 3}px;
              color: ${props.node.textColor || "black"};
              background-color: ${props.node.bgColor || "white"};
              `}
      >
        {props.children}
      </div>
    </>
  );
};
