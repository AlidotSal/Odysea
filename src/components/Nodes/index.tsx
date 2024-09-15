import { Match, Switch } from "solid-js";
import BackDrop from "./BackDrop";
import Default from "./Default";
import Dot from "./Dot";
import StickyNote from "./StickyNote";

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
