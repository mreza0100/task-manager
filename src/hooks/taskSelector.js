import showMsg from "../helpers/alerts/msg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function useTaskSelector({ tasks } = {}) {
	const router = useRouter();
	tasks = tasks || useSelector(state => state.tasks);

	return ({
		taskID = null,
		getTaskIDFromRouter = false,
		redirectOnNotFound = true,
		alertOnNotFound = true,
	} = {}) => {
		taskID = getTaskIDFromRouter ? router.query.id : taskID;
		const result = taskID ? tasks.find(task => task.id === taskID) : tasks;

		// useEffect(() => {
		if (taskID && !result) {
			// ! then its not found
			if (redirectOnNotFound) router.push("/");
			if (alertOnNotFound) {
				showMsg(
					{
						title: { text: "همچین تسکی موجود نیست" },
						body: { text: "احتمالا این تسک فبلا حذف شده است" },
						html: "<p>شما دیگر قادر به استفاده از این تسک نیستید</p>",
					},
					{ status: "danger", pendingID: "task query 404" }
				);
			}
		}
		// }, [taskID, tasks.length]);

		if (result) return Array.isArray(result) ? [...result] : result;
		return { notFound: true };
	};
}
