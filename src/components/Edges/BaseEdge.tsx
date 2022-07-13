import { Show } from "solid-js";
import { css } from "solid-styled";
import EdgeText from "./EdgeText";
import EdgeAnchor from "./EdgeAnchor";
import type { EdgeProps } from "../../types";

interface BaseProps {
  baseEdgeProps: EdgeProps;
}

export default function BaseEdge(props: BaseProps) {
  const defaultArrow = `0,0 8,3 0,6`;

  css`
    path {
      ${props.baseEdgeProps.animated
        ? "animation: dash 0.5s linear infinite;stroke-dasharray: 10;"
        : ""}
    }
  `;

  return (
    <>
      <defs>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <polyline
            points={defaultArrow}
            fill="#666"
            {...props.baseEdgeProps.style}
          />
        </marker>
      </defs>

      <path
        d={props.baseEdgeProps.path}
        fill="transparent"
        stroke="#999"
        marker-end={`${props.baseEdgeProps.arrow ? "url(#arrow)" : ""}`}
        stroke-width="1.2"
        aria-label="svg-path"
        {...props.baseEdgeProps.style}
      />
      <Show when={props.baseEdgeProps.label}>
        <EdgeText
          sourceX={props.baseEdgeProps.sourceX}
          sourceY={props.baseEdgeProps.sourceY}
          targetX={props.baseEdgeProps.targetX}
          targetY={props.baseEdgeProps.targetY}
          label={props.baseEdgeProps.label || ""}
          style={props.baseEdgeProps.labelStyle}
          bgStyle={props.baseEdgeProps.labelBgStyle}
        />
      </Show>
      <Show when={!props.baseEdgeProps.noHandle}>
        <EdgeAnchor
          x={props.baseEdgeProps.sourceX}
          y={props.baseEdgeProps.sourceY}
        />
        <Show when={!props.baseEdgeProps.arrow}>
          <EdgeAnchor
            x={props.baseEdgeProps.targetX}
            y={props.baseEdgeProps.targetY}
          />
        </Show>
      </Show>
    </>
  );
}
