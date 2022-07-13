import { StyleRegistry } from "solid-styled";
import { StoreProvider } from "../../store";
import GraphView from "../GraphView";
import type { NodeI, EdgeI } from "../../types";

interface Props {
  nodes: NodeI[];
  edges: EdgeI[];
  width?: number;
  height?: number;
}

export default (props: Props) => {

  return (
    <StyleRegistry>
      <StoreProvider
        nodes={props.nodes}
        edges={props.edges}
        width={props.width || 800}
        height={props.height || 800}
      >
        <GraphView />
      </StoreProvider>
    </StyleRegistry>
  );
};
