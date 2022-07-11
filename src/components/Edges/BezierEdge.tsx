import { createMemo } from "solid-js";
import BaseEdge from "./BaseEdge";
import { getParams } from "./utils";
import { Position } from "../../types/utils";
import type { EdgeI } from "../../types";
import { useStore } from "../../store";

// how to create a smooth, controlled beizer edge from source and target positions
// referenced from ReactFlow.dev
interface GetSimpleBezierPathParams {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
}

interface GetControlParams {
  pos?: Position;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function getControl({
  pos,
  x1,
  y1,
  x2,
  y2,
}: GetControlParams): [number?, number?] {
  let ctX;
  let ctY;
  switch (pos) {
    case Position.Left:
    case Position.Right:
      {
        ctX = 0.5 * (x1 + x2);
        ctY = y1;
      }
      break;
    case Position.Top:
    case Position.Bottom:
      {
        ctX = x1;
        ctY = 0.5 * (y1 + y2);
      }
      break;
  }
  return [ctX, ctY];
}

function getSimpleBezierPath({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: GetSimpleBezierPathParams): string {
  const [sourceControlX, sourceControlY] = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
  });
  const [targetControlX, targetControlY] = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
  });
  return `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`;
}

interface BezierProps {
  edge: EdgeI;
}

export default function BezierEdge(props: BezierProps) {
  const { store } = useStore();
  const params = () => getParams(store, props.edge.source, props.edge.target);
  const path = () => getSimpleBezierPath(params());
  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    ...params(),
    path: path(),
  }));

  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
