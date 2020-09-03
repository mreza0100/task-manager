import { _USE_API_ } from "../api/index.API";
import styled from "styled-components";
import { useState } from "react";

async function handleSubmit(color, taskID) {
	try {
		await _USE_API_({
			isPrivetRoute: true,
			describe: "change task color",
		}).Put({
			data: { color, id: taskID },
			url: "/tasks",
		});
	} catch (err) {}
}

var timeoutVals = {};
export default function ColorPicker({ color: initialColor = "#d0c3c3", taskID }) {
	const [color, setColor] = useState(initialColor);

	const onChange = e => {
		setColor(e.target.value);
		clearTimeout(timeoutVals[taskID]);
		timeoutVals[taskID] = setTimeout(() => {
			delete timeoutVals[taskID];
			handleSubmit(color, taskID);
		}, 2000);
	};

	return <Picker type="color" value={color} onChange={onChange} />;
}

const Picker = styled.input(props => {
	return {
		margin: 0,
		padding: 0,
		border: "0 !important",
		outline: "none !important",
		boxShadow: "0 0 0 0 !important",
		width: "42px",
		height: "16px",
		transform: "rotate(90deg)",
		backgroundColor: "transparent",
		position: "relative",
		left: "13px",
		overflow: "hidden",
		borderRadius: "2px",
		cursor: "pointer",
		"&::-webkit-color-swatch-wrapper": {
			padding: 0,
		},
		"&::-webkit-color-swatch": {
			border: "none",
		},
		"&::-moz-color-swatch": {
			border: "none",
		},
		"&::-moz-focus-inner": {
			border: "none",
			padding: 0,
		},
		"&:focus": {
			boxShadow: "none",
		},
	};
});
