import { Switch, Match } from "solid-js";
import Default from "./Default";
import StickyNote from "./StickyNote";
import BackDrop from "./BackDrop";
import Dot from "./Dot";

import type { NodeI } from "../../types";

interface NodeProps {
  node: NodeI;
}

export default (props: NodeProps) => {
  return (
    <Switch fallback={<Default node={props.node} />}>
      <Match when={props.node.type === "note"}>
        <StickyNote node={props.node} />
      </Match>
      <Match when={props.node.type === "backdrop"}>
        <BackDrop node={props.node} />
      </Match>
      <Match when={props.node.type === "dot"}>
        <Dot node={props.node} />
      </Match>
    </Switch>
  );
};
