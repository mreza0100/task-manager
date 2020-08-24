import { transition, flex, prevEnter, tagObjToArr } from "../helpers/exports";
import { getOneTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useTaskSelectore from "../hooks/taskSelector";
// !>>

async function handleSubmit(data, { dispatch, setSubmitting }) {
	setSubmitting(true);
	await _USE_API_({ isPrivetRoute: true, describe: "PluseWindow" })
		.Post({
			url: "tasks",
			data,
		})
		.then(res => {
			const taskID = res.data.data.item.id;
			if (taskID) dispatch(getOneTask({ taskID }));
		})
		.catch(err => {
			console.dir(err);
		})
		.finally(() => {
			setSubmitting(false);
		});
}

export default function PluseWindow() {
	const isPlusMode = useSelector(state => state.isPlusMode);
	return (
		<TransitonWrapper visible={isPlusMode}>
			<StyledTaskManager></StyledTaskManager>
		</TransitonWrapper>
	);
}

const StyledDatePickers = styled.div(() => {
	return {};
});

const TransitonWrapper = styled.div(({ theme: { flex }, visible: v }) => {
	return {
		transition: "all 0.3s",
		position: "fixed",
		bottom: v ? "0%" : "-80%",
		right: "10%",
		width: "35%",
		minHeight: "450px",
		padding: "15px 0",
		opacity: v ? 1 : 0,
		pointerEvents: v ? "unset" : "none",
		borderRadius: "10px 10px 0px 0px",
		backgroundColor: "#286B89",
	};
});

const StyledTaskManager = styled.div(({}) => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		height: "auto",
		...transition(1.5),
	};
});
