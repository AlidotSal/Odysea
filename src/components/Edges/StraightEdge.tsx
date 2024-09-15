import { createMemo } from "solid-js";
import type { EdgeI, NodeI } from "../../types";
import BaseEdge from "./BaseEdge";

interface StraightEdgeProps {
  edge: EdgeI;
  source: NodeI;
  target: NodeI;
}

export default function StraightEdge(props: StraightEdgeProps) {
  const params = createMemo(() => ({
    sourceX: props.source.output.x,
    sourceY: props.source.output.y,
    sourcePosition: props.source.outputPosition,
    targetX: props.target.input.x,
    targetY: props.target.input.y,
    targetPosition: props.target.inputPosition,
  }));
  const path = () => `M ${params().sourceX},${params().sourceY}L ${params().targetX},${params().targetY}`;
  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    path: path(),
    sourceNode: props.source,
    targetNode: props.target,
  }));
  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
