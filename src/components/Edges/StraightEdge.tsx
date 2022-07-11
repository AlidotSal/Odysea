import { createMemo } from "solid-js";
import { useStore } from "../../store";
import { getParams } from "./utils";
import BaseEdge from "./BaseEdge";
import type { EdgeI } from "../../types";

interface StraightEdgeProps {
  edge: EdgeI;
}

export default function StraightEdge(props: StraightEdgeProps) {
  const { store } = useStore();
  const params = () => getParams(store, props.edge.source, props.edge.target);
  const path = () =>
    `M ${params().sourceX},${params().sourceY}L ${params().targetX},${
      params().targetY
    }`;
  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    ...params(),
    path: path(),
  }));
  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
