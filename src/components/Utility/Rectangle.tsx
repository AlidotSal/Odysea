import { css } from "solid-styled";

interface rectProps {
	x: number;
	y: number;
	width: number;
	height: number;
	color?: string;
}

export default function BaseEdge(props: rectProps) {
	css`
    .animated {
      animation: dash 0.5s linear infinite;
      stroke-dasharray: 10;
    }
  `;

	return (
		<rect
			fill={props.color ?? "#adadad"}
			shape-rendering="optimizeSpeed"
			x={props.x}
			y={props.y}
			width={Math.max(props.width, 80)}
			height={Math.max(props.height, 80)}
		/>
	);
}
