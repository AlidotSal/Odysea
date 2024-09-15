import { createMemo } from "solid-js";
import type { EdgeI, NodeI } from "../../types";
import BaseEdge from "./BaseEdge";
import { getCenter } from "./utils";

const bottomLeftCorner = (x: number, y: number, size: number): string =>
  `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
const leftBottomCorner = (x: number, y: number, size: number): string =>
  `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
const bottomRightCorner = (x: number, y: number, size: number): string =>
  `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
const rightBottomCorner = (x: number, y: number, size: number): string =>
  `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;
const leftTopCorner = (x: number, y: number, size: number): string => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
const topLeftCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
const topRightCorner = (x: number, y: number, size: number): string => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
const rightTopCorner = (x: number, y: number, size: number): string => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;

export interface GetSmoothStepPathParams {
  sourceX: number;
  sourceY: number;
  sourcePosition?: "top" | "bottom" | "right" | "left";
  targetX: number;
  targetY: number;
  targetPosition: "top" | "bottom" | "right" | "left";
  borderRadius?: number;
  centerX?: number;
  centerY?: number;
}

function getSmoothStepPath({
  sourceX,
  sourceY,
  sourcePosition = "bottom",
  targetX,
  targetY,
  targetPosition = "top",
  borderRadius = 6,
  centerX,
  centerY,
}: GetSmoothStepPathParams): string {
  const [_centerX, _centerY, offsetX, offsetY] = getCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
  const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
  const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
  const leftAndRight = ["left", "right"];
  const cX = typeof centerX !== "undefined" ? centerX : _centerX;
  const cY = typeof centerY !== "undefined" ? centerY : _centerY;

  let firstCornerPath = undefined;
  let secondCornerPath = undefined;

  if (sourceX <= targetX) {
    firstCornerPath =
      sourceY <= targetY ? bottomLeftCorner(sourceX, cY, cornerSize) : topLeftCorner(sourceX, cY, cornerSize);
    secondCornerPath =
      sourceY <= targetY ? rightTopCorner(targetX, cY, cornerSize) : rightBottomCorner(targetX, cY, cornerSize);
  } else {
    firstCornerPath =
      sourceY < targetY ? bottomRightCorner(sourceX, cY, cornerSize) : topRightCorner(sourceX, cY, cornerSize);
    secondCornerPath =
      sourceY < targetY ? leftTopCorner(targetX, cY, cornerSize) : leftBottomCorner(targetX, cY, cornerSize);
  }

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY ? rightTopCorner(cX, sourceY, cornerSize) : rightBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath =
        sourceY <= targetY ? bottomLeftCorner(cX, targetY, cornerSize) : topLeftCorner(cX, targetY, cornerSize);
    } else if (
      (sourcePosition === "right" && targetPosition === "left") ||
      (sourcePosition === "left" && targetPosition === "right") ||
      (sourcePosition === "left" && targetPosition === "left")
    ) {
      firstCornerPath =
        sourceY <= targetY ? leftTopCorner(cX, sourceY, cornerSize) : leftBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath =
        sourceY <= targetY ? bottomRightCorner(cX, targetY, cornerSize) : topRightCorner(cX, targetY, cornerSize);
    }
  } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY
          ? rightTopCorner(targetX, sourceY, cornerSize)
          : rightBottomCorner(targetX, sourceY, cornerSize);
    } else {
      firstCornerPath =
        sourceY <= targetY
          ? leftTopCorner(targetX, sourceY, cornerSize)
          : leftBottomCorner(targetX, sourceY, cornerSize);
    }
    secondCornerPath = "";
  } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY
          ? bottomLeftCorner(sourceX, targetY, cornerSize)
          : topLeftCorner(sourceX, targetY, cornerSize);
    } else {
      firstCornerPath =
        sourceY <= targetY
          ? bottomRightCorner(sourceX, targetY, cornerSize)
          : topRightCorner(sourceX, targetY, cornerSize);
    }
    secondCornerPath = "";
  }

  return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`;
}

interface SimpleBezierProps {
  edge: EdgeI;
  source: NodeI;
  target: NodeI;
  borderRadius?: number;
}

export default function SmoothStepEdge(props: SimpleBezierProps) {
  const params = createMemo(() => ({
    sourceX: props.source.output.x,
    sourceY: props.source.output.y,
    sourcePosition: props.source.outputPosition,
    targetX: props.target.input.x,
    targetY: props.target.input.y,
    targetPosition: props.target.inputPosition,
    borderRadius: props.borderRadius,
  }));

  const path = () => getSmoothStepPath(params());

  const baseEdgeProps = createMemo(() => ({
    ...props.edge,
    path: path(),
    sourceNode: props.source,
    targetNode: props.target,
  }));

  return <BaseEdge baseEdgeProps={baseEdgeProps()} />;
}
