import type { Nodes } from "../../types";
export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: "top" | "bottom" | "right" | "left";
  targetPosition?: "top" | "bottom" | "right" | "left";
}

const LeftOrRight = ["left", "right"];

export const getParams = (nodes: Nodes, source: number, target: number) => {
  const sourceNode = nodes[source];
  const targetNode = nodes[target];
  const sLeft = sourceNode.position[0];
  const sTop = sourceNode.position[1];
  const sWidthHalf = sourceNode.width / 2;
  const sHeightHalf = sourceNode.height;
  const tLeft = targetNode.position[0];
  const tTop = targetNode.position[1];
  const tWidthHalf = targetNode.width / 2;
  const sourceX: number = sLeft + sWidthHalf;
  const sourceY: number = sTop + sHeightHalf;
  const targetX: number = tLeft + tWidthHalf;
  const targetY: number = tTop;

  return {
    sourceX,
    sourceY,
    sourcePosition: "top",
    targetX,
    targetY,
    targetPosition: "bottom",
  };
};

export const getCenter = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = "bottom",
  targetPosition = "top",
}: GetCenterParams): [number, number, number, number] => {
  const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);

  // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.
  const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);

  if (mixedEdge) {
    const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
    const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;

    const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
    const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;

    return [centerX, centerY, xOffset, yOffset];
  }

  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
};
