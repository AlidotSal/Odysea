import { createSignal, createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Setter } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { InitialNodeI, NodeI, EdgeI, StoreProps } from "../types";
import { Position } from "../types/utils";

interface Nodes {
  [key: string]: NodeI;
}
interface StoreI {
  nodes: Nodes;
  edges: EdgeI[];
}

function createNode(node: InitialNodeI) {
  const type = node?.type || "default";
  const n = {
    width: type === "dot" ? 11 : type === "backdrop" ? 220 : 160,
    height: type === "dot" ? 11 : type === "note" ? 80 : type === "backdrop" ? 110 : 40,
    label: "",
    type: "default",
    inputPosition: Position.Top,
    outputPosition: Position.Bottom,
    inputHandle: true,
    outputHandle: true,
    ...node,
    // Todo: input and output should be simplified
    get input(): { x: number; y: number } {
      let x;
      let y;
      switch (this.inputPosition) {
        case Position.Bottom: {
          x = this.position.x + this.width / 2;
          y = this.position.y + this.height;
          break;
        }
        case Position.Right: {
          x = this.position.x + this.width;
          y = this.position.y + this.height / 2;
          break;
        }
        case Position.Left: {
          x = this.position.x;
          y = this.position.y + this.height / 2;
          break;
        }
        default:
          x = this.position.x + this.width / 2;
          y = this.position.y;
      }
      if (!this.inputHandle) {
        x = this.position.x + this.width / 2;
        y = this.position.y + this.height / 2;
      }
      return { x, y };
    },
    get output(): { x: number; y: number } {
      let x;
      let y;
      switch (this.outputPosition) {
        case Position.Top: {
          x = this.position.x + this.width / 2;
          y = this.position.y;
          break;
        }
        case Position.Right: {
          x = this.position.x + this.width;
          y = this.position.y + this.height / 2;
          break;
        }
        case Position.Left: {
          x = this.position.x;
          y = this.position.y + this.height / 2;
          break;
        }
        default:
          x = this.position.x + this.width / 2;
          y = this.position.y + this.height;
      }
      if (!this.outputHandle) {
        x = this.position.x + this.width / 2;
        y = this.position.y + this.height / 2;
      }
      return { x, y };
    },
  };
  return n;
}

const StoreContext = createContext();

export const StoreProvider = (props: StoreProps) => {
  let nodes: Nodes = {};
  for (let i = 0; i < props.nodes.length; i++) {
    nodes[props.nodes[i].id] = createNode(props.nodes[i]);
  }
  const [store, setStore] = createStore<StoreI>({ nodes, edges: props.edges });
  const [width, setWidth] = createSignal(props.width || "800px");
  const [height, setHeight] = createSignal(props.height || "800px");
  const [canvasbg, setCanvasbg] = createSignal(props.background || "#f7f9fb");
  const [selected, setSelected] = createSignal<string[]>([]);
  const [isDragging, setDragging] = createSignal<boolean>(false);
  const [scale, setScale] = createSignal(1);
  const [transition, setTransition] = createSignal<[number, number]>([0, 0]);

  const addNodes = (nodes: InitialNodeI | InitialNodeI[]) => {
    if (Array.isArray(nodes)) {
      for (let i = 0; i < nodes.length; i++) {
        setStore(
          "nodes",
          produce((n) => {
            n[nodes[i].id] = createNode(nodes[i]);
          }),
        );
      }
      return;
    }
    setStore(
      "nodes",
      produce((n) => {
        n[nodes.id] = createNode(nodes);
      }),
    );
  };
  const removeNodes = (id: string) => {
    setStore(
      produce((s) => {
        s.nodes[id] = undefined;
        s.edges = s.edges.filter((e) => e.source !== id && e.target !== id);
      }),
    );
  };

  const modifyNode = (id: string, newValues: InitialNodeI) => {
    setStore(
      "nodes",
      produce((n) => {
        const properties = Object.keys(newValues);
        for (let i = 0; i < properties.length; ++i) {
          n[id][properties[i]] = newValues[properties[i]];
        }
      }),
    );
  };

  const addEdges = (edges: EdgeI | EdgeI[]) => {
    setStore(
      "edges",
      produce((e) => {
        if (Array.isArray(edges)) {
          e.push(...edges);
        } else {
          e.push(edges);
        }
      }),
    );
  };

  const removeEdges = (id: string) => {
    setStore(
      "edges",
      produce((e) => {
        const index = e.findIndex((i) => i.id === id);
        e.splice(index, 1);
      }),
    );
  };

  const modifyEdge = (id: string, newValues: EdgeI) => {
    setStore(
      "edges",
      produce((e) => {
        const index = e.findIndex((i) => i.id === id);
        Object.keys(newValues).forEach((property) => {
          e[index][property] = newValues[property];
        });
      }),
    );
  };

  const updatePosition = (xTrans: number, yTrans: number, items: string[]) => {
    setStore(
      "nodes",
      produce((n) => {
        for (let i = 0; i < items.length; i++) {
          n[items[i]].position.x += xTrans / scale();
          n[items[i]].position.y += yTrans / scale();
        }
      }),
    );
  };

  const drag = (xTrans: number, yTrans: number, id: string) => {
    setStore(
      "nodes",
      produce((n) => {
        n[id].width += xTrans;
        n[id].height += yTrans;
      }),
    );
  };

  const storeValue = {
    store,
    setStore,
    updatePosition,
    drag,
    isDragging,
    setDragging,
    width,
    setWidth,
    height,
    setHeight,
    canvasbg,
    setCanvasbg,
    selected,
    setSelected,
    scale,
    setScale,
    transition,
    setTransition,
    addNodes,
    removeNodes,
    modifyNode,
    addEdges,
    removeEdges,
    modifyEdge,
  };

  return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>;
};

interface UseStore {
  store: StoreI;
  setStore: SetStoreFunction<StoreI>;
  updatePosition: (x: number, y: number, items: string[]) => void;
  drag: (x: number, y: number, id: string) => void;
  isDragging: () => boolean;
  setDragging: Setter<boolean>;
  width: () => string;
  setWidth: Setter<string>;
  height: () => string;
  setHeight: Setter<string>;
  canvasbg: () => string;
  setCanvasbg: Setter<string>;
  selected: () => string[];
  setSelected: Setter<string[]>;
  scale: () => number;
  setScale: Setter<number>;
  transition: () => [number, number];
  setTransition: Setter<[number, number]>;
  addNodes: (nodes: InitialNodeI | InitialNodeI[]) => void;
  removeNodes: (id: string) => void;
  modifyNode: (id: string, newValues: InitialNodeI) => void;
  addEdges: (edges: EdgeI | EdgeI[]) => void;
  removeEdges: (id: string) => void;
  modifyEdge: (id: string, newValues: EdgeI) => void;
}

export const useStore = () => useContext(StoreContext) as UseStore;
