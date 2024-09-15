import { type JSX, createSignal, onMount } from "solid-js";
import { css } from "solid-styled";

interface TextProps {
  label: string;
  style: JSX.CSSProperties;
  path: string;
  endHandle: boolean;
}

export default function EdgeText(props: TextProps) {
  let textRef!: HTMLParagraphElement;
  const [box, setBox] = createSignal({ width: 0, height: 0 });

  onMount(() => {
    if (textRef) {
      setBox({
        width: Math.round(textRef.offsetWidth),
        height: Math.round(textRef.offsetHeight),
      });
    }
  });

  css`
  foreignObject {
      offset-path: path(${`"${props.path}"`});
      offset-distance: ${props.endHandle ? "50%" : "44%"};
      transform: translate(
          calc(${(box().height / 2).toString()} * -1px),
          calc(${(box().width / 2).toString()} * 1px)
        )
        rotate(-90deg);
    }
    p {
      color: ${props.style.color ?? ""};
      opacity: ${props.style ? "1" : "0.8"};
      background-color: ${props.style["background-color"] ?? ""};
    }
  `;

  return (
    <foreignObject width={box().width + 12} height={box().height + 1}>
      <p ref={textRef}>{props.label}</p>
    </foreignObject>
  );
}
