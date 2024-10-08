<div align="center">
<h1><img width="800" src="./src/assets/banner.webp" alt="Odysea banner"><h1>
<a href="https://npmjs.com/package/odysea"><img src="https://img.shields.io/npm/v/odysea?color=c63537" alt="npm version"></a>
<a href="https://github.com/AlidotSal/odysea/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AlidotSal/Odysea?color=446b9e" alt="gitHub license"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/github/languages/top/AlidotSal/Odysea?color=446b9e" alt="top-language"></a>
<img src="https://img.shields.io/github/languages/code-size/AlidotSal/Odysea?color=446b9e" alt="code size">
<a href="https://github.com/AlidotSal/Odysea/stargazers"><img src="https://img.shields.io/github/stars/AlidotSal/Odysea?color=446b9e" alt="repo stars"></a>

### Convert Your Ideas To A Simple And Excitig Journay With Odysea!

<br/>
</div>

# Odysea

> A lightweight and minimal Solid component for building interactive graphs and node-based editors.

## Key Features

- **Easy to use:** Just provide the nodes and edges data and it automatically gets converted to an interactive graph with seamless zooming and panning.
- **Customizable:** Different edge types and support for custom nodes and custom edges.
- **Fast rendering:** Only nodes that have changed are re-rendered and only those in the viewport are displayed
- **Reliable**: Written in [Typescript](https://www.typescriptlang.org/).

## Installation

The easiest way to get the latest version of Odysea is to install it via npm:

```bash
npm install odysea # or yarn add
```

## Quick Start

```jsx
import Flow from "odysea";

function Flow(props) {
  return <Flow nodes={props.nodes} edges={props.edges} />;
}
```

## Flow Component's Props

| Name       | Type   | default | Description                       |
| ---------- | ------ | ------- | --------------------------------- |
| nodes      | Node[] | []      | array of nodes                    |
| edges      | Edge[] | []      | array of edges                    |
| width      | string | "auto"  | width of the container            |
| height     | string | "auto"  | height of the container           |
| transition | string | [0, 0]  | view coordinates                  |
| scale      | string | 1       | scale of the container            |
| bg         | string | none    | background color of the container |

```jsx
type Node = {
  id: string,
  data: T,
  type: string ("regular(default)" | "dot" | "note" | "backdrop"),
  position: { x: number, y: number },
  inputPosition: "top" | "bottom" | "left" | "right",
  outputPosition: "top" | "bottom" | "left" | "right",
  width: number,
  height: number,
  inputHandle: boolean,
  outputHandle: boolean,
  bgColor: string,
  fontSize: number,
  borderColor: string,
  borderRadius: number,
  textColor: string,
};

type Edge = {
  source: string,
  target: string,
  label: string,
  type: "bezier(default)" | "straight" | "smoothStep" | "step",
  animated: boolean,
  arrow: boolean,
  style: JSX.CSSProperties,
  labelStyle: JSX.CSSProperties,
  labelBgStyle: JSX.CSSProperties,
};
```

## Live Demo

[Live Example On stackblitz](https://stackblitz.com/edit/vitejs-vite-3ardiv?file=src%2FApp.tsx)

## Development

Before you start you need to build the project using `npm run build`. Then install the Odysea dependencies via `npm install`.

If you want to contribute or develop custom features the easiest way is to start the dev server:

```sh
npm start
```

## Credits

Odysea is heavily based on [react flow](https://github.com/wbkd/react-flow). Without them Odysea would not exist. Please consider donating to them.

- [solid-styled](https://github.com/LXSMNSYC/solid-styled) - for styling components

## License

Odysea is [MIT licensed](https://github.com/AlidotSal/odysea/blob/main/LICENSE).
