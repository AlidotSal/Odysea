import SmoothStepEdge from "./SmoothStepEdge";
import type { EdgeI } from "../../types";

interface SimpleBezierProps {
  edge: EdgeI;
}

export default (props: SimpleBezierProps) => {
  return <SmoothStepEdge {...props} borderRadius={0} />;
};
