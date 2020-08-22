import { useState } from "react";

export default function useForceUpdate() {
	const [_, setV] = useState(0);
	return () => setV(v => ++v);
}
