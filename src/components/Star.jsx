import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function Star({ isFavorite, taskID }) {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			dispatch(editTask({ newTask: { id: taskID, is_favorite: !isFavorite } }));
			await _USE_API_({
				isPrivetRoute: true,
				describe: "toggle isFavorite",
			}).Put({
				data: { is_favorite: !isFavorite, id: taskID },
				url: "/tasks",
			});
		} catch (err) {
			console.dir(err);
			dispatch(editTask({ newTask: { id: taskID, is_favorite: isFavorite } }));
		}
	};

	return (
		<I
			onClick={handleSubmit}
			className={`fa fa-star${!isFavorite ? "-o" : ""}`}
			isFavorite={isFavorite}
		/>
	);
}

const I = styled.i(({ isFavorite, theme: { flex } }) => {
	return {
		...flex(),
		height: "20px",
		width: "20px",
		fontSize: "20px",
		cursor: "pointer",
		transition: "all 0.5s",
		color: isFavorite ? "#FF6672" : "#6FA0F1",
	};
});
