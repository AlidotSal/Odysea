import { JSX, createSignal, onMount } from "solid-js";
import { css } from "solid-styled";
import type { Rect } from "../../types";

interface TextProps {
  label: string;
  style?: JSX.CSSProperties;
  bgStyle?: JSX.CSSProperties;
  path: string;
  endHandle: boolean;
}

export default function EdgeText(props: TextProps) {
  let edgeRef!: SVGTextElement;
  const [box, setbox] = createSignal<Rect>({ x: 0, y: 0, width: 0, height: 0 });

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

  css`
    g {
      offset-path: path(${'"' + props.path + '"'});
      offset-distance: ${props.endHandle ? "50%" : "44%"};
      offset-rotate: 90deg;
      transform: translate(
          calc(${(box().height / 2).toString()} * -1px),
          calc(${(box().width / 2).toString()} * 1px)
        )
        rotate(-90deg);
    }
  `;

  return (
    <g>
      <rect
        fill="white"
        fill-opacity={props.bgStyle?.fill ? "0.8" : ".99"}
        rx="2"
        ry="2"
        width={box().width + 8}
        height={box().height + 3}
        {...props.bgStyle}
      />
      <text
        ref={edgeRef}
        dx="5px"
        dy=".7em"
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
  );
}
