import { Show, JSX, createSignal, createEffect, onMount } from "solid-js";
import { getCenter } from "./utils";
import type { Rect } from "../../types";

interface TextProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  label: string;
  style?: JSX.CSSProperties;
  bgStyle?: JSX.CSSProperties;
}

export default function EdgeText(props: TextProps) {
  let edgeRef!: SVGTextElement;
  const [box, setbox] = createSignal<Rect>({ x: 0, y: 0, width: 0, height: 0 });
  const [transform, setTransform] = createSignal("");

  onMount(() => {
    if (edgeRef) {
      const textBbox = edgeRef.getBBox();
      setbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height,
      });
    }
  });
  if (typeof props.label === "undefined" || !props.label) {
    return null;
  }
  createEffect(() => {
    const [x, y] = getCenter({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
    });
    setTransform(`translate(${x - box().width / 2} ${y - box().height / 2})`);
  });

  return (
    <Show when={props.label}>
      <g transform={transform()}>
        <rect
          fill="white"
          fill-opacity={props.bgStyle?.fill ? "0.8" : ".99"}
          y={box().height / 2 - 8}
          rx="2"
          ry="2"
          width={box().width + 8}
          height={box().height + 2}
          {...props.bgStyle}
        />
        <text
          ref={edgeRef}
          class="EdgeText"
          x={4}
          y={box().height / 2 - 4}
          dy="0.3em"
          font-size="10px"
          fill-opacity={props.style ? "1" : "0.8"}
          dominant-baseline="central"
          style={`fill:black; ${Object.entries(props.style || {})
            .map(([k, v]) => {
              k = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
              return `${k}:${v}`;
            })
            .join(";")}`}
        >
          {props.label}
        </text>
      </g>
    </Show>
  );
}
