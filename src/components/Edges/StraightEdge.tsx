import { createMemo } from "solid-js";
import { useStore } from "../../store";
import BaseEdge from "./BaseEdge";
import type { EdgeI } from "../../types";

interface StraightEdgeProps {
  edge: EdgeI;
}

export default function StraightEdge(props: StraightEdgeProps) {
  const { store } = useStore();
  const params = createMemo(() => ({
    sourceX: store.nodes[props.edge.source].output.x,
    sourceY: store.nodes[props.edge.source].output.y,
    sourcePosition: store.nodes[props.edge.source].outputPosition,
    targetX: store.nodes[props.edge.target].input.x,
    targetY: store.nodes[props.edge.target].input.y,
    targetPosition: store.nodes[props.edge.target].inputPosition,
  }));
  const path = () =>
    `M ${params().sourceX},${params().sourceY}L ${params().targetX},${
      params().targetY
    }`;
  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    path: path(),
    sourceNode: store.nodes[props.edge.source],
    targetNode: store.nodes[props.edge.target],
  }));
  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
