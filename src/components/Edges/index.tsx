import { Match, Switch } from "solid-js";
import Bezier from "./BezierEdge";
import SmoothStep from "./SmoothStepEdge";
import Step from "./StepEdge";
import Straight from "./StraightEdge";

import type { EdgeI, NodeI } from "../../types";

interface NodeProps {
  edge: EdgeI;
  source: NodeI;
  target: NodeI;
}

export default (props: NodeProps) => {
  return (
    <Switch fallback={<Bezier edge={props.edge} source={props.source} target={props.target} />}>
      <Match when={props.edge.type === "straight"}>
        <Straight edge={props.edge} source={props.source} target={props.target} />
      </Match>
      <Match when={props.edge.type === "smoothStep"}>
        <SmoothStep edge={props.edge} source={props.source} target={props.target} />
      </Match>
      <Match when={props.edge.type === "step"}>
        <Step edge={props.edge} source={props.source} target={props.target} />
      </Match>
    </Switch>
  );
};
