// enumerable values (static) set for Position
export enum Position {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

// interface for XYPosition to use in nodes and edges
export interface XYPosition {
  x: number;
  y: number;
}

// type for z axis positioning with D3
export type XYZPosition = XYPosition & { z: number };

// interface for changing dimensions of Viewport
export interface Dimensions {
  width: number;
  height: number;
}

// interface of Rect divs in zoompane
export interface Rect extends Dimensions, XYPosition {}

// interface of Box using XYPosition of nodes
export interface Box extends XYPosition {
  x2: number;
  y2: number;
}

// D3 type array for Transform
export type Transform = [number, number, number];

//
type HexDigit<
  T extends
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F",
> = T;
export type HexColor<T extends string> = T extends `#${HexDigit<infer D1>}${HexDigit<
  infer D2
>}${HexDigit<infer D3>}${infer Rest1}`
  ? Rest1 extends ``
    ? T // three-digit hex color
    : Rest1 extends `${HexDigit<infer D4>}${HexDigit<infer D5>}${HexDigit<infer D6>}`
    ? T // six-digit hex color
    : never
  : never;
