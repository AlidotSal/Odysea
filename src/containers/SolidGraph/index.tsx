import { StoreProvider } from "../../store";
import GraphView from "../GraphView";
import type { NodeI, EdgeI } from "../../types";
import "../../style/global.css";

interface Props {
  nodes: NodeI[];
  edges: EdgeI[];
  width?: number;
  height?: number;
}

export default (props: Props) => {
  return (
    <StoreProvider
      nodes={props.nodes}
      edges={props.edges}
      width={props.width || 800}
      height={props.height || 800}
    >
      <GraphView />
    </StoreProvider>
  );
};
