import type { EdgeI, NodeI } from "../../types";
import SmoothStepEdge from "./SmoothStepEdge";

interface SimpleBezierProps {
  edge: EdgeI;
  source: NodeI;
  target: NodeI;
}

export default (props: SimpleBezierProps) => {
  return <SmoothStepEdge {...props} borderRadius={0} />;
};
