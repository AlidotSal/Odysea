import type { JSX } from "solid-js";
import type { XYPosition } from "./utils";

export interface NodeI<T = any> {
  id: number;
  position: XYPosition;
  data: T;
  width?: number;
  height?: number;
  bgColor?: string;
  fontSize?: number;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
}

export interface EdgeI {
  source: number;
  target: number;
  label?: string;
  type?: "straight" | "smoothStep" | "step";
  animated?: boolean;
  noHandle?: boolean;
  arrow?: boolean;
  style?: JSX.CSSProperties;
  labelStyle?: JSX.CSSProperties;
  labelBgStyle?: JSX.CSSProperties;
}

export interface StoreProps {
  nodes: NodeI[];
  edges: EdgeI[];
  width: number;
  height: number;
  children: JSX.Element;
}

export interface GraphProps {
  nodes: NodeI[];
  edges: EdgeI[];
  width: number;
  height: number;
}

export interface EdgeProps extends EdgeI {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: string;
  targetPosition: string;
  path: string;
}

export type HandleType = "source" | "target";

export type KeyCode = string | Array<string>;
