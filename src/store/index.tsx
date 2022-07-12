import { createSignal, createContext, useContext } from "solid-js";
import type { Setter } from "solid-js";
import { createStore } from "solid-js/store";
import type { NodeI, EdgeI, StoreProps } from "../types";

interface Nodes {
  [key: number]: NodeI;
}
interface StoreI {
  nodes: Nodes;
  edges: EdgeI[];
}

const StoreContext = createContext();

export const StoreProvider = (props: StoreProps) => {
  let nodes: Nodes = {};
  for (let i = 0; i < props.nodes.length; i++) {
    nodes[props.nodes[i].id] = props.nodes[i];
  }
  const [store, setStore] = createStore<StoreI>({ nodes, edges: props.edges });
  const [width, setWidth] = createSignal(props.width);
  const [height, setHeight] = createSignal(props.height);
  const [selected, setSelected] = createSignal<number | null>(null);
  const [scale, setScale] = createSignal(1);
  const [transition, setTransition] = createSignal<[number, number]>([0, 0]);

  const updatePosition = (xTrans: number, yTrans: number, nodeID: number) => {
    setStore("nodes", nodeID, "position", (p) => ({
      x: p.x + xTrans / scale(),
      y: p.y + yTrans / scale(),
    }));
  };

  const storeValue = {
    store,
    updatePosition,
    width,
    setWidth,
    height,
    setHeight,
    selected,
    setSelected,
    scale,
    setScale,
    transition,
    setTransition,
  };

  return (
    <StoreContext.Provider value={storeValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

interface UseStore {
  store: StoreI;
  updatePosition: (x: number, y: number, nodeID: number) => void;
  width: () => number;
  setWidth: Setter<number>;
  height: () => number;
  setHeight: Setter<number>;
  selected: () => number | null;
  setSelected: Setter<number | null>;
  scale: () => number;
  setScale: Setter<number>;
  transition: () => [number, number];
  setTransition: Setter<[number, number]>;
}

export const useStore = () => useContext(StoreContext) as UseStore;
