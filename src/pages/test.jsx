import styled from "styled-components";
import { useState } from "react";

export default props => {
	const [hide, setHide] = useState(false);
	setTimeout(() => {
		setHide(true);
	}, 3000);
	return <Test hide={hide}>Hello there from me</Test>;
};
const Test = styled.h1(({ hide }) => {
	return {
		position: "absolute",
		// display: hide ? "none" : "block",
		color: "red",
		animationName: hide ? "hide-msg" : "hide",
		// animationName: "msg",
		animationDuration: "2s",
		animationIterationCount: 1,
		animationDirection: "forward",
		animationTimingFunction: "ease-in-out",
		animationFillMode: "forwards",
		animationDelay: 0
	};
});
