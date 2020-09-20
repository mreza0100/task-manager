import useTaskSelectore from "./taskSelector";
import { useMemo } from "react";

export default function useFiltringTasks({ filters, sorts }) {
	var tasks = useTaskSelectore({ returnArray: true });

	const result = useMemo(() => {
		tasks = [...tasks];
		if (filters.justfinished) tasks = tasks.filter(task => task.is_done);
		if (filters.justUnfinished) tasks = tasks.filter(task => !task.is_done);
		if (filters.justFavorites) tasks = tasks.filter(task => task.is_favorite);

		if (sorts.isFavorites_top)
			tasks = [...tasks.filter(t => t.is_favorite), ...tasks.filter(t => !t.is_favorite)];
		if (sorts.isDone_down) tasks = [...tasks.filter(t => !t.is_done), ...tasks.filter(t => t.is_done)];
		if (sorts.reverse) tasks = tasks.reverse();

		return tasks;
	}, [tasks, filters, sorts]);
	return result;
}
