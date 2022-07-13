import { StyleRegistry } from "solid-styled";
import { css } from "solid-styled";
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
  css`
    @global {
      * {
        box-sizing: border-box;
      }

      @keyframes dash {
        from {
          stroke-dashoffset: 20;
        }
      }
    }
  `;

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
