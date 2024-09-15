import { For } from "solid-js";
import { StyleRegistry } from "solid-styled";
import { css } from "solid-styled";
import Edge from "../../components/Edges";
import Node from "../../components/Nodes";
import type { EdgeI, NodeI } from "../../types";
import "./styles.css";

interface Props {
  nodes: NodeI[];
  edges: EdgeI[];
  width: string;
  height: string;
  transition?: [number, number];
  scale?: number;
  bg?: string;
}

export default (props: Props) => {
  css`
  .container {
    width: ${props.width};
    height: ${props.height};
    background-color: ${props.bg || "var(--canvasBG)"};
  }
  .nodes {
    transition: ${props.transition ? props.transition[0].toString() : "0"}px ${props.transition ? props.transition[1].toString() : "0"}px;
    scale: ${props.scale?.toString() || "1"}
  }
  #rects:first-child {
    transition: ${props.transition ? props.transition[0].toString() : "0"}px ${props.transition ? props.transition[1].toString() : "0"}px;
    scale: ${props.scale?.toString() || "1"}
  }
  .edges {
    width: ${props.width};
    height: ${props.height};
    transition: ${props.transition ? props.transition[0].toString() : "0"}px ${props.transition ? props.transition[1].toString() : "0"}px;
    scale: ${props.scale?.toString() || "1"}
  }
`;

  return (
    <StyleRegistry>
      <div class="odysea container">
        <svg id="rects" />
        <svg class="svg">
          <title>All the nodes and edges in the graph are here!</title>
          <g class="edges">
            <For each={Object.values(props.edges)}>
              {(edge: EdgeI) =>
                edge ? (
                  <Edge
                    edge={edge}
                    source={props.nodes.find((n) => n.id === edge.source) as NodeI}
                    target={props.nodes.find((n) => n.id === edge.target) as NodeI}
                  />
                ) : null
              }
            </For>
          </g>
        </svg>
        <div class="nodes">
          <For each={Object.values(props.nodes)}>{(node: NodeI) => (node ? <Node node={node} /> : null)}</For>
        </div>
      </div>
    </StyleRegistry>
  );
};
