import { onMount, onCleanup, For } from "solid-js";
import { css } from "solid-styled";
import { throttleRAF } from "../../utils";
import { useStore } from "../../store";
import Edge from "../../components/Edges";
import Node from "../../components/Nodes";

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
		canvasbg,
		transition,
		setTransition,
		scale,
		setScale,
	} = useStore();

	const handlePointerDown = (event: PointerEvent) => {
		if (event.target instanceof HTMLElement) {
			const nodeId = event.target.dataset.id;
			const action = event.target.dataset.action;
			console.log(nodeId, action);
			nodeId ? setSelected([nodeId]) : setSelected([]);
			action === "drag" ? setDragging(true) : setDragging(false);
		} else {
			return;
		}
	};
	const handlePointerMove = (event: PointerEvent) => {
		// fix pan/zoom on mobile devices
		throttleRAF(() => {
			if (event.buttons === 0) {
				return;
			}
			if (event.pointerType === "mouse") {
				if (isDragging()) {
					drag(event.movementX, event.movementY, selected()[0]);
					return;
				} else {
					if (selected().length > 0) {
						updatePosition(event.movementX, event.movementY, selected());
						return;
					}
					if (selected().length === 0 && event.altKey) {
						setTransition((t) => [
							t[0] + event.movementX,
							t[1] + event.movementY,
						]);
						return;
					}
				}
			}

			if (event.pointerType === "touch") {
				if (isDragging()) {
					drag(event.movementX, event.movementY, selected()[0]);
					return;
				} else {
					if (selected().length > 0) {
						updatePosition(event.movementX, event.movementY, selected());
						return;
					}
					if (selected().length === 0 && event.altKey) {
						setTransition((t) => [
							t[0] + event.movementX,
							t[1] + event.movementY,
						]);
						return;
					}
				}
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
      background-color: ${canvasbg()};
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
					{(node) => <Node node={node} />}
				</For>
			</div>

			<svg>
				<g>
					<For each={store.edges}>{(edge) => <Edge edge={edge} />}</For>
				</g>
			</svg>
		</div>
	);
}
