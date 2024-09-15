import { createMemo } from "solid-js";
import type { EdgeI, NodeI } from "../../types";
import BaseEdge from "./BaseEdge";

// how to create a smooth, controlled beizer edge from source and target positions
// referenced from ReactFlow.dev
interface GetSimpleBezierPathParams {
  sourceX: number;
  sourceY: number;
  sourcePosition?: "top" | "bottom" | "right" | "left";
  targetX: number;
  targetY: number;
  targetPosition?: "top" | "bottom" | "right" | "left";
}

interface GetControlParams {
  pos?: "top" | "bottom" | "right" | "left";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function getControl({ pos, x1, y1, x2, y2 }: GetControlParams): [number?, number?] {
  let ctX: number | undefined = undefined;
  let ctY: number | undefined = undefined;
  switch (pos) {
    case "left":
    case "right": {
      ctX = 0.5 * (x1 + x2);
      ctY = y1;
      break;
    }
    case "top":
    case "bottom": {
      ctX = x1;
      ctY = 0.5 * (y1 + y2);
      break;
    }
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
  source: NodeI;
  target: NodeI;
}

export default function BezierEdge(props: BezierProps) {
  const params = createMemo(() => {
    const sourceX = props.source.output.x;
    const sourceY = props.source.output.y;
    const sourcePosition = props.source.outputPosition;
    const targetX = props.target.input.x;
    const targetY = props.target.input.y;
    const targetPosition = props.target.inputPosition;
    return {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    };
  });
  const path = () => getSimpleBezierPath(params());
  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    path: path(),
    sourceNode: props.source,
    targetNode: props.target,
  }));

  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
