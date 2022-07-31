import { onMount, onCleanup, For, Switch, Match, batch } from "solid-js";
import { css } from "solid-styled";
import { throttleRAF } from "../../utils";
import { useStore } from "../../store";
import BezierEdge from "../../components/Edges/BezierEdge";
import SmoothStepEdge from "../../components/Edges/SmoothStepEdge";
import StepEdge from "../../components/Edges/StepEdge";
import StraightEdge from "../../components/Edges/StraightEdge";
import Node from "../../components/Nodes/Default";
import Dot from "../../components/Nodes/Dot";
import Note from "../../components/Nodes/Note";
import BackDrop from "../../components/Nodes/BackDrop";

export default function GraphView() {
  let containerRef!: HTMLDivElement;

  const {
    store,
    updatePosition,
    drag,
    isDragging,
    setDragging,
    selected,
    setSelected,
    width,
    height,
    transition,
    setTransition,
    scale,
    setScale,
  } = useStore();

  const handlePointerDown = () => {
    batch(() => {
      setSelected([]);
      setDragging(false);
    });
  };
  const handlePointerMove = (e: PointerEvent) => {
    throttleRAF(() => {
      if (e.buttons === 0) return;

      if (!isDragging()) {
        if (selected().length > 0) {
          updatePosition(e.movementX, e.movementY, selected());
        }
        if (selected().length === 0 && e.altKey) {
          setTransition((t) => [t[0] + e.movementX, t[1] + e.movementY]);
        }
      } else {
        drag(e.movementX, e.movementY, selected()[0]);
      }
    });
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
    @global {
      * {
        box-sizing: border-box;
      }
      h1,
      h2,
      h3,
      h4,
      p {
        margin: 0;
        font-size: inherit;
      }
      @keyframes dash {
        from {
          stroke-dashoffset: 20;
        }
      }
    }
    .container {
      position: relative;
      display: grid;
      width: ${width()};
      height: ${height()};
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI, Roboto";
      user-select: none;
      overflow: hidden;
      touch-action: none;
    }
    .nodes {
      position: absolute;
      width: ${width()};
      height: ${height()};
      background: transparent;
      transform-origin: 50% 50%;
      transform: translate(
          calc(${transition()[0].toString()} * 1px),
          calc(${transition()[1].toString()} * 1px)
        )
        scale(${scale().toString()});
    }
    svg {
      width: ${width()};
      height: ${height()};
    }
    g {
      transform-origin: 50% 50%;
      transform: translate(
          calc(${transition()[0].toString()} * 1px),
          calc(${transition()[1].toString()} * 1px)
        )
        scale(${scale().toString()});
    }
  `;

  return (
    <div ref={containerRef} class="container">
      <div class="nodes">
        <For each={Object.values(store.nodes)}>
          {(node) => (
            <Switch fallback={<Node node={node} />}>
              <Match when={node.type === "dot"}>
                <Dot node={node} />
              </Match>
              <Match when={node.type === "note"}>
                <Note node={node} />
              </Match>
              <Match when={node.type === "backdrop"}>
                <BackDrop node={node} />
              </Match>
            </Switch>
          )}
        </For>
      </div>

      <svg>
        <g>
          <For each={store.edges}>
            {(edge) => (
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
            )}
          </For>
        </g>
      </svg>
    </div>
  );
}
