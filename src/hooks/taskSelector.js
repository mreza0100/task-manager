import showMsg from "../helpers/alerts/msg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { tasks as tasksRoute } from "../routes";

export default function useTaskSelectore({
	tasks = null,
	taskID = false,
	redirectOnNotFound = true,
	alertOnNotFound = true,
	returnArray = false,
	limit = 0,
} = {}) {
	const router = useRouter();
	tasks = tasks || useSelector(({ tasks }) => tasks);

	if (returnArray) return limit ? result.slice(0, limit) : tasks;
	else {
		taskID = taskID || router.query.id;
		const result = tasks.find(task => task.id === taskID);

		useEffect(() => {
			if (taskID && !result) {
				// ! then its not found
				if (redirectOnNotFound) router.push(tasksRoute);
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
			// !! tasks.length
		}, [taskID, tasks.length]);

		if (result) return result;
		return { notFound: true };
	}
}
