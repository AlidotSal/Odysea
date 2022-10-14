import { JSX, createSignal, onMount } from "solid-js";
import { css } from "solid-styled";
import { useStore } from "../../store";
import type { Rect } from "../../types";

interface TextProps {
	label: string;
	style?: JSX.CSSProperties;
	bgStyle?: JSX.CSSProperties;
	path: string;
	endHandle: boolean;
}

export default function EdgeText(props: TextProps) {
	let edgeRef!: SVGTextElement;
	const [box, setbox] = createSignal<Rect>({ x: 0, y: 0, width: 0, height: 0 });
	const { canvasbg } = useStore();

	onMount(() => {
		if (edgeRef) {
			const textBbox = edgeRef.getBBox();
			setbox({
				x: textBbox.x,
				y: textBbox.y,
				width: textBbox.width,
				height: textBbox.height,
			});
		}
	});

	css`
    g {
      offset-path: path(${`"${props.path}"`});
      offset-distance: ${props.endHandle ? "50%" : "44%"};
      offset-rotate: 90deg;
      transform: translate(
          calc(${(box().height / 2).toString()} * -1px),
          calc(${(box().width / 2).toString()} * 1px)
        )
        rotate(-90deg);
    }
  `;

	return (
		<g>
			<rect
				fill={canvasbg() || "#f7f9fb"}
				fill-opacity="0.96"
				width={box().width + 12}
				height={box().height + 1}
				style={`${Object.entries(props.bgStyle || {})
					.map(([k, v]) => {
						k = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
						return `${k}:${v}`;
					})
					.join(";")}`}
			/>
			<text
				ref={edgeRef}
				dx="7px"
				dy="0.6em"
				font-size="11px"
				fill-opacity={props.style ? "1" : "0.8"}
				dominant-baseline="central"
				style={`fill:black; ${Object.entries(props.style || {})
					.map(([k, v]) => {
						k = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
						return `${k}:${v}`;
					})
					.join(";")}`}
			>
				{props.label}
			</text>
		</g>
	);
}
