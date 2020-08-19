import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import styled from "styled-components";
import { useState } from "react";

async function handleSubmit(color, taskID) {
	try {
		await _USE_API_({
			isPrivetRoute: true,
			describe: "change task color",
			debug: true,
		}).Put({
			data: { color, id: taskID },
			url: "/tasks",
		});
	} catch (err) {
		console.log(err);
		showMsg(
			{
				title: { text: "مشکل شبکه" },
				body: { text: "درخواست انجام نشد" },
			},
			{ status: "danger" }
		);
	}
}

var timeoutValue = 0;
export default function ColorPicker({ color: initialColor, taskID }) {
	const [color, setColor] = useState(initialColor);

	const onChange = e => {
		setColor(e.target.value);
		clearTimeout(timeoutValue);
		timeoutValue = setTimeout(() => handleSubmit(color, taskID), 2000);
	};

	return <Picker type="color" value={color} onChange={onChange} />;
}

const Picker = styled.input(props => {
	return {
		margin: 0,
		padding: 0,
		border: "0 !important",
		outline: "none !important",
		boxShadow: "0 !important",
		width: "45px",
		height: "22px",
		transform: "rotate(90deg)",
		backgroundColor: "transparent",
		"&:focus": {
			boxShadow: "none",
		},
	};
});
