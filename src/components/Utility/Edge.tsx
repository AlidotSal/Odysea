import { onMount, onCleanup } from "solid-js";
import { useStore } from "../../store";
import type { EdgeI } from "../../types";

interface PropsI {
	data: EdgeI;
}
export default (props: PropsI) => {
	const { setStore } = useStore();

	onMount(() => {
		setStore("edges", (all) => [...all, { ...props.data }]);
	});
	onCleanup(() => {
		setStore("edges", (all) => all.filter((e) => e.id !== props.data.id));
	});

	return null;
};
