import { Show, createRenderEffect, createSignal } from "solid-js";
import { css } from "solid-styled";
import type { EdgeProps } from "../../types";
import EdgeText from "./EdgeText";

interface BaseProps {
  baseEdgeProps: EdgeProps;
}

export default function BaseEdge(props: BaseProps) {
  const [arrowDistance, setArrowDistance] = createSignal("calc(100% - 20px)");

  createRenderEffect(() => {
    let distance = "calc(100% - 20px)";
    if (
      props.baseEdgeProps.arrow &&
      !props.baseEdgeProps.targetNode.inputHandle &&
      (props.baseEdgeProps.type === "straight" || props.baseEdgeProps.type === "bezier")
    ) {
      // calculate the distance of the arrow from the edge when there is no input handle
      // TODO: move this section to each edge type component for accurate calculations
      const dx = props.baseEdgeProps.targetNode.input.x - props.baseEdgeProps.sourceNode.output.x;
      const dy = props.baseEdgeProps.targetNode.input.y - props.baseEdgeProps.sourceNode.output.y;
      let newValue = 0;
      const corner =
        (Math.atan2(props.baseEdgeProps.targetNode.height, props.baseEdgeProps.targetNode.width) * 180) / Math.PI;
      const atan = Math.atan2(dy, dx);
      const theta = (atan * 180) / Math.PI > 0 ? (atan * 180) / Math.PI : (atan * 180) / Math.PI + 360;

      if ((theta > corner && theta < 180 - corner) || (theta > 180 + corner && theta < 360 - corner)) {
        const x = props.baseEdgeProps.targetNode.height / (2 * Math.tan((theta / 180) * Math.PI));
        const y = props.baseEdgeProps.targetNode.height / 2;
        newValue = Math.sqrt(x * x + y * y);
      } else {
        const x = props.baseEdgeProps.targetNode.width / 2;
        const y = (props.baseEdgeProps.targetNode.width / 2) * -Math.tan((theta / 180) * Math.PI);
        newValue = Math.sqrt(x * x + y * y);
      }
      distance = `calc(100% - ${newValue + 18}px)`;
    }
    setArrowDistance(distance);
  });

  css`
    path {
      stroke: ${props.baseEdgeProps.style?.stroke ?? "var(--edgeC)"};
    }
    .arrow {
      offset-path: path(${`"${props.baseEdgeProps.path}"`});
      offset-distance: ${arrowDistance()};
    }
  `;

  return (
    <>
      <path
        classList={{ selected: props.baseEdgeProps.selected }}
        class={props.baseEdgeProps.animated ? "animated" : ""}
        d={props.baseEdgeProps.path}
        fill="transparent"
        stroke-linecap="round"
        stroke-width="var(--edgeW)"
        aria-label="svg-path"
        {...props.baseEdgeProps.style}
      />
      <Show when={props.baseEdgeProps.arrow}>
        <polygon
          class="arrow"
          points="5 20, 10 0, 0 0"
          fill={props.baseEdgeProps.style?.stroke}
          stroke={props.baseEdgeProps.style?.stroke}
        />
      </Show>
      <Show when={props.baseEdgeProps.label}>
        <EdgeText
          label={props.baseEdgeProps.label ?? "edge label"}
          style={props.baseEdgeProps.labelStyle}
          path={props.baseEdgeProps.path}
          endHandle={
            props.baseEdgeProps.targetNode.inputHandle &&
            (props.baseEdgeProps.targetNode.type === "step" || props.baseEdgeProps.targetNode.type === "smoothStep")
          }
        />
      </Show>
    </>
  );
}
