import { Position } from "../../types/utils";
export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: Position;
  targetPosition?: Position;
}

const LeftOrRight = ["left", "right"];

export const getParams = (store: any, source: number, target: number) => {
  const sourceNode = store.nodes[source];
  const targetNode = store.nodes[target];
  const sLeft = sourceNode.position.x;
  const sTop = sourceNode.position.y;
  const sWidthHalf = (sourceNode.width || 160) / 2;
  const sHeightHalf = sourceNode.height || 40;
  const tLeft = targetNode.position.x;
  const tTop = targetNode.position.y;
  const tWidthHalf = (targetNode.width || 160) / 2;
  const sourceX: number = sLeft + sWidthHalf;
  const sourceY: number = sTop + sHeightHalf;
  const targetX: number = tLeft + tWidthHalf;
  const targetY: number = tTop;

  return {
    sourceX,
    sourceY,
    sourcePosition: Position.Top,
    targetX,
    targetY,
    targetPosition: Position.Bottom,
  };
};

export const getCenter = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
}: GetCenterParams): [number, number, number, number] => {
  const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);

  // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.
  const mixedEdge =
    (sourceIsLeftOrRight && !targetIsLeftOrRight) ||
    (targetIsLeftOrRight && !sourceIsLeftOrRight);

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
