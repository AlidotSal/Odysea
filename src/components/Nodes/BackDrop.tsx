import { css } from "solid-styled";
import { useStore } from "../../store";
import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  const { store, setDragging, selected, setSelected } = useStore();

  function handleSelection() {
    const nodesInside = Object.entries(store.nodes).reduce(
      (resultes: string[], obj) => {
        const centerX = obj[1].position.x + obj[1].width / 2;
        const centerY = obj[1].position.y + obj[1].height / 2;
        if (
          centerX > props.node.position.x &&
          centerX < props.node.position.x + props.node.width &&
          centerY > props.node.position.y &&
          centerY < props.node.position.y + props.node.height
        ) {
          resultes.push(obj[0]);
        }
        return resultes;
      },
      [],
    );
    setSelected(nodesInside);
  }

  css`
    section {
      position: absolute;
      cursor: grab;
      min-width: 5rem;
      width: calc(${props.node.width.toString()} * 1px);
      min-height: 2rem;
      height: calc(${props.node.height.toString()} * 1px);
      color: ${props.node.textColor || "black"};
      background-color: rgb(0 110 250 / 0.1);
      transform: translate(
        calc(${props.node.position.x.toString()} * 1px),
        calc(${props.node.position.y.toString()} * 1px)
      );
      z-index: -1;
    }
    h1 {
      margin: 0.2rem;
      text-align: center;
      user-select: none;
      background-color: rgb(255 255 255 / 0.5);
    }
    h1.selected {
      background-color: rgb(196 84 89 / 0.4);
    }
    span {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: linear-gradient(
        135deg,
        transparent 0%,
        transparent 50%,
        rgb(255 255 255 / 0.5) 50%,
        rgb(255 255 255 / 0.5) 100%
      );
    }
    span.selected {
      background: linear-gradient(
        135deg,
        transparent 0%,
        transparent 50%,
        rgb(196 84 89 / 0.4) 50%,
        rgb(196 84 89 / 0.4) 100%
      );
    }
    span:hover {
      cursor: nwse-resize;
    }
  `;

  return (
    <section>
      <h1
        onPointerDown={handleSelection}
        classList={{ selected: selected().includes(props.node.id) }}
      >
        {props.node.label}
      </h1>
      <span
        data-id={props.node.id}
        data-action="drag"
        classList={{ selected: selected().includes(props.node.id) }}
      />
    </section>
  );
};
