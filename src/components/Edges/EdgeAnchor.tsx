interface anchorProps {
  x: number;
  y: number;
}

export default function EdgeAnchor(props: anchorProps) {
  return <circle class="absolute" cx={props.x} cy={props.y} r={4} stroke="white" fill="black" />;
}
