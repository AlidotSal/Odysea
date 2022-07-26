import { StyleRegistry } from "solid-styled";
import { StoreProvider } from "../../store";
import GraphView from "../GraphView";
import type { InitialNodeI, EdgeI } from "../../types";

interface Props {
  nodes: InitialNodeI[];
  edges: EdgeI[];
  width?: string;
  height?: string;
}

export default (props: Props) => {
  return (
    <StyleRegistry>
      <StoreProvider
        nodes={props.nodes}
        edges={props.edges}
        width={props.width}
        height={props.height}
      >
        <GraphView />
      </StoreProvider>
    </StyleRegistry>
  );
};
