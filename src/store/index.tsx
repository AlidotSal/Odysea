import { createSignal, createContext, useContext } from "solid-js";
import type { Setter } from "solid-js";
import { createStore } from "solid-js/store";
import type { NodeI, EdgeI, StoreProps } from "../types";
import { Position } from "../types/utils";

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
    nodes[props.nodes[i].id] = {
      width: 160,
      height: 40,
      inputPosition: Position.Top,
      outputPosition: Position.Bottom,
      inputHandle: true,
      outputHandle: true,
      ...props.nodes[i],
      get input() {
        let x, y;
        switch (this.inputPosition) {
          case Position.Bottom:
            x = this.position.x + this.width / 2;
            y = this.position.y + this.height;
            break;
          case Position.Right:
            x = this.position.x + this.width;
            y = this.position.y + this.height / 2;
            break;
          case Position.Left:
            x = this.position.x;
            y = this.position.y + this.height / 2;
            break;
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
      get output() {
        let x, y;
        switch (this.outputPosition) {
          case Position.Top:
            x = this.position.x + this.width / 2;
            y = this.position.y;
            break;
          case Position.Right:
            x = this.position.x + this.width;
            y = this.position.y + this.height / 2;
            break;
          case Position.Left:
            x = this.position.x;
            y = this.position.y + this.height / 2;
            break;
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
  }
  const [store, setStore] = createStore<StoreI>({ nodes, edges: props.edges });
  const [width, setWidth] = createSignal(props.width || "800px");
  const [height, setHeight] = createSignal(props.height || "800px");
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
  width: () => string;
  setWidth: Setter<string>;
  height: () => string;
  setHeight: Setter<string>;
  selected: () => number | null;
  setSelected: Setter<number | null>;
  scale: () => number;
  setScale: Setter<number>;
  transition: () => [number, number];
  setTransition: Setter<[number, number]>;
}

export const useStore = () => useContext(StoreContext) as UseStore;
