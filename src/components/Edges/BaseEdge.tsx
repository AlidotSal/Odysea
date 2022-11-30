import { createRenderEffect, Show } from "solid-js";
import { css } from "solid-styled";
import EdgeText from "./EdgeText";
import type { EdgeProps } from "../../types";

interface BaseProps {
  baseEdgeProps: EdgeProps;
}

export default function BaseEdge(props: BaseProps) {
  let arrowDistance = "calc(100% - 12px)";

  // Yes! calling hooks inside conditions is possible with Solidjs
  if (!props.baseEdgeProps.targetNode.inputHandle) {
    createRenderEffect(() => {
      // calculate the distance of the arrow from the edge when there is no input handle
      // TODO: move this section to each edge type component for accurate calcs
      const dx = props.baseEdgeProps.targetNode.input.x - props.baseEdgeProps.sourceNode.output.x;
      const dy = props.baseEdgeProps.targetNode.input.y - props.baseEdgeProps.sourceNode.output.y;
      let newValue = 0;
      const corner =
        (Math.atan2(props.baseEdgeProps.targetNode.height, props.baseEdgeProps.targetNode.width) *
          180) /
        Math.PI;
      const atan = Math.atan2(dy, dx);
      let theta =
        (atan * 180) / Math.PI > 0 ? (atan * 180) / Math.PI : (atan * 180) / Math.PI + 360;

      if (
        (theta > corner && theta < 180 - corner) ||
        (theta > 180 + corner && theta < 360 - corner)
      ) {
        const x = props.baseEdgeProps.targetNode.height / (2 * Math.tan((theta / 180) * Math.PI));
        const y = props.baseEdgeProps.targetNode.height / 2;
        newValue = Math.sqrt(x * x + y * y);
      } else {
        const x = props.baseEdgeProps.targetNode.width / 2;
        const y = (props.baseEdgeProps.targetNode.width / 2) * -Math.tan((theta / 180) * Math.PI);
        newValue = Math.sqrt(x * x + y * y);
      }
      arrowDistance = `calc(100% - ${newValue + 9}px)`;
    });
  }

  css`
    .animated {
      animation: dash 0.5s linear infinite;
      stroke-dasharray: 10;
    }
    .arrow {
      transform: translateY(4px) rotate(-90deg);
      offset-path: path(${`"${props.baseEdgeProps.path}"`});
      offset-distance: ${arrowDistance};
    }
  `;

  return (
    <>
      <path
        class={props.baseEdgeProps.animated ? "animated" : ""}
        d={props.baseEdgeProps.path}
        fill="transparent"
        stroke="#636363"
        stroke-linecap="round"
        stroke-width="1.2"
        aria-label="svg-path"
        {...props.baseEdgeProps.style}
      />
      <Show when={props.baseEdgeProps.arrow}>
        <polygon class="arrow" points="4 10, 8 0, 0 0" fill="#636363" />
      </Show>
      <Show when={props.baseEdgeProps.label}>
        <EdgeText
          label={props.baseEdgeProps.label!}
          style={props.baseEdgeProps.labelStyle}
          bgStyle={props.baseEdgeProps.labelBgStyle}
          path={props.baseEdgeProps.path}
          endHandle={props.baseEdgeProps.targetNode.inputHandle === true}
        />
      </Show>
    </>
  );
}
