import type { JSX } from "solid-js";

export interface InitialNodeI {
  id: string;
  position: [number, number];
  label?: string;
  type?: string;
  inputPosition?: "top" | "bottom" | "right" | "left";
  outputPosition?: "top" | "bottom" | "right" | "left";
  width?: number;
  height?: number;
  inputHandle?: boolean;
  outputHandle?: boolean;
  bgColor?: string;
  fontSize?: string;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
}
export interface NodeI {
  id: string;
  label: string;
  type: string;
  position: [number, number];
  inputPosition: "top" | "bottom" | "right" | "left";
  outputPosition: "top" | "bottom" | "right" | "left";
  width: number;
  height: number;
  inputHandle: boolean;
  outputHandle: boolean;
  bgColor?: string;
  fontSize: string;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
  input: { x: number; y: number };
  output: { x: number; y: number };
  selected: boolean;
}

export interface InitialEdgeI {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  animated?: boolean;
  arrow?: boolean;
  style?: JSX.PathSVGAttributes<SVGPathElement>;
  labelStyle?: JSX.CSSProperties;
}

export interface EdgeI {
  id: string;
  source: string;
  target: string;
  label: string;
  type: string;
  animated: boolean;
  arrow: boolean;
  selected: boolean;
  style: JSX.PathSVGAttributes<SVGPathElement>;
  labelStyle: JSX.CSSProperties;
}

export interface StoreProps {
  nodes: InitialNodeI[];
  edges: EdgeI[];
  width?: string;
  height?: string;
  background?: string;
  children: JSX.Element;
}

export interface GraphProps {
  nodes: NodeI[];
  edges: EdgeI[];
  width: number;
  height: number;
}

export interface EdgeProps extends EdgeI {
  path: string;
  sourceNode: NodeI;
  targetNode: NodeI;
}

export interface Nodes {
  [key: string]: NodeI;
}
export interface Edges {
  [key: string]: EdgeI;
}
export interface Store {
  nodes: Nodes;
  edges: Edges;
}

export type HandleType = "source" | "target";

export type KeyCode = string | string[];
