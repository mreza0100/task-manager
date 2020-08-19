import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function CheckBox({ isDone, taskID }) {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			dispatch(editTask({ newTask: { id: taskID, is_done: !isDone } }));
			await _USE_API_({
				isPrivetRoute: true,
				describe: "toggle CheckBox",
			}).Put({
				data: { is_done: !isDone, id: taskID },
				url: "/tasks",
			});
		} catch (err) {
			showMsg(
				{
					title: { text: "مشکل شبکه" },
					body: { text: "درخواست انجام نشد" },
				},
				{ status: "danger" }
			);
			dispatch(editTask({ newTask: { id: taskID, is_done: isDone } }));
		}
	};

	return (
		<CheckBox_styled onClick={handleSubmit} selected={isDone}>
			<i className="fa fa-check" />
		</CheckBox_styled>
	);
}

const CheckBox_styled = styled.div(({ theme: { flex, $bolderBlue, $white }, selected }) => {
	return {
		...flex(),
		width: "18px",
		height: "18px",
		padding: "5px",
		borderRadius: "4px",
		backgroundColor: selected ? $bolderBlue : "#E4EAF0",
		cursor: "pointer",
		transition: "all 0.3s",
		"> i": {
			opacity: selected ? 1 : 0,
			color: $white,
			fontSize: "12px",
		},
	};
});
