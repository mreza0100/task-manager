import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import { useDispatch } from "react-redux";

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
			console.log(err);
			showMsg(
				{
					title: { text: "مشکل شبکه" },
					body: { text: "درخواست انجام نشد" },
				},
				{ status: "danger" }
			);
			dispatch(editTask({ newTask: { id: taskID, is_favorite: isFavorite } }));
		}
	};

	return (
		<img
			onClick={handleSubmit}
			className="star"
			src={`${isFavorite ? "selected-" : ""}star.svg`}
		/>
	);
}
