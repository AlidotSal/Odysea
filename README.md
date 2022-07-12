# :thread: Solid Graph

<div align="center">

![GitHub License MIT](https://img.shields.io/github/license/AlidotSal/solid-graph?color=446b9e)
![top-language](https://img.shields.io/github/languages/top/AlidotSal/solid-graph?color=446b9e)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/AlidotSal/solid-graph?color=446b9e)
![GitHub Repo stars](https://img.shields.io/github/stars/AlidotSal/solid-graph?color=446b9e)

### Convert Your Ideas To Graphs With Solid Graph!

A lightweight and minimal Solid component for building interactive graphs and node-based editors.

</div>

---

## Key Features

- **Easy to use:** Just provide the nodes and edges data and it automatically gets converted to an interactive graph with seamless zooming and panning.
- **Customizable:** Different edge types and support for custom nodes and custom edges.
- **Fast rendering:** Only nodes that have changed are re-rendered and only those in the viewport are displayed
- **Reliable**: Written in [Typescript](https://www.typescriptlang.org/).

## Installation

The easiest way to get the latest version of Solid Graph is to install it via npm:

```bash
npm install solid-graph # or yarn add
```

## Quick Start

```jsx
import SolidGraph from "solid-graph";

function Flow(props) {
  return <SolidGraph nodes={props.nodes} edges={props.edges}></SolidGraph>;
}
```

## SolidGraph Props

| Name   | Type   | default | Description             |
| ------ | ------ | ------- | ----------------------- |
| nodes  | Node[] | []      | array of nodes          |
| edges  | Edge[] | []      | array of edges          |
| width  | number | 800     | width of the container  |
| height | number | 800     | height of the container |

```jsx
type Node = {
  id: number,
  position: { x: number, y: number },
  data: { label: string, ... },
  width?: number,
  height?: number,
  bgColor?: string,
  fontSize?: number,
  borderColor?: string,
  borderRadius?: number,
  textColor?: string,
};

type Edge = {
  source: number,
  target: number,
  label?: string,
  type?: "straight" | "smoothStep" | "step",
  animated?: boolean,
  noHandle?: boolean,
  arrow?: boolean,
  style?: JSX.CSSProperties,
  labelStyle?: JSX.CSSProperties,
  labelBgStyle?: JSX.CSSProperties,
};
```

## Development

Before you start you need to build the project using `npm run build`. Then install the Solid Graph dependencies via `npm install`.

If you want to contribute or develop custom features the easiest way is to start the dev server:

```sh
npm start
```

## Credits

Solid Graph is heavily based on [react flow](https://github.com/wbkd/react-flow). Without them Solid Graph would not exist. Please consider donating to them.

- [unocss](https://github.com/unocss/unocss) - for styling components

## License

Solid Graph is [MIT licensed](https://github.com/AlidotSal/solid-graph/blob/main/LICENSE).
