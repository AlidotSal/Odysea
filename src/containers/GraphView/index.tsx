import { onMount, onCleanup, For, Switch, Match } from "solid-js";
import { css } from "solid-styled";
import { useStore } from "../../store";
import BezierEdge from "../../components/Edges/BezierEdge";
import SmoothStepEdge from "../../components/Edges/SmoothStepEdge";
import StepEdge from "../../components/Edges/StepEdge";
import StraightEdge from "../../components/Edges/StraightEdge";
import Node from "../../components/Nodes/Node";

export default function GraphView() {
  let containerRef!: HTMLDivElement;

  const {
    store,
    updatePosition,
    selected,
    setSelected,
    width,
    height,
    transition,
    setTransition,
    scale,
    setScale,
  } = useStore();

  const handlePointerDown = () => setSelected(null);
  const handlePointerMove = (e: PointerEvent) => {
    if (e.buttons === 0) return;

    if (e.pointerType === "mouse") {
      if (selected()) {
        updatePosition(e.movementX, e.movementY, selected()!);
      }
      if (!selected() && e.altKey) {
        setTransition((t) => [t[0] + e.movementX, t[1] + e.movementY]);
      }
    } else {
      if (selected()) {
        updatePosition(e.movementX, e.movementY, selected()!);
      } else {
        setTransition((t) => [t[0] + e.movementX, t[1] + e.movementY]);
      }
    }
  };
  const handleWheel = (e: WheelEvent) => {
    setScale((s) => Math.max(Math.min(s - e.deltaY / 600, 4), 0.25));
  };
  const handleGesture = (e: any) => {
    if (e.scale < 1.0) {
      setScale(Math.max(e.scale, 0.25));
    } else if (e.scale > 1.0) {
      setScale(Math.min(e.scale, 4));
    }
  };

  onMount(() => {
    containerRef.addEventListener("pointerdown", handlePointerDown);
    containerRef.addEventListener("pointermove", handlePointerMove);
    containerRef.addEventListener("wheel", handleWheel);
    containerRef.addEventListener("gestureend", handleGesture);
  });
  onCleanup(() => {
    containerRef.removeEventListener("pointerdown", handlePointerDown);
    containerRef.removeEventListener("pointermove", handlePointerMove);
    containerRef.removeEventListener("wheel", handleWheel);
    containerRef.addEventListener("gestureend", handleGesture);
  });

  css`
    .container {
      position: relative;
      display: grid;
      font-family: sans;
      border: 1px solid #999 
      user-select: none;
      overflow: hidden;
      touch-naction: one;
    }
    .canvas {
      position: absolute;
      width: ${width().toString()}px;
      height: ${height().toString()}px;
      background: transparent;
      transform-origin: 50% 50%;
      transform: translate(${transition()[0].toString()}px, ${transition()[1].toString()}px) scale(${scale().toString()});
    }
    svg {
      width: ${width().toString()}px;
      height: ${height().toString()}px;
    }
    g {
      transform-origin: "50% 50%";
      transform: translate(${transition()[0].toString()}px, ${transition()[1].toString()}px) scale(${scale().toString()});
    }
`;

  return (
    <div ref={containerRef} class="container">
      <div class="canvas">
        <For each={Object.values(store.nodes)}>
          {(node) => {
            return <Node node={node}>{node.data.label}</Node>;
          }}
        </For>
      </div>

      <svg>
        <g>
          <For each={store.edges}>
            {(edge) => (
              <>
                <Switch fallback={<BezierEdge edge={edge} />}>
                  <Match when={edge.type === "straight"}>
                    <StraightEdge edge={edge} />
                  </Match>
                  <Match when={edge.type === "smoothStep"}>
                    <SmoothStepEdge edge={edge} />
                  </Match>
                  <Match when={edge.type === "step"}>
                    <StepEdge edge={edge} />
                  </Match>
                </Switch>
              </>
            )}
          </For>
        </g>
      </svg>
    </div>
  );
}
