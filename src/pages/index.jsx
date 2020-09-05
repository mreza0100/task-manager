import useFiltringTasks from "../hooks/filtringTasks";
import useTaskSelectore from "../hooks/taskSelector";
import PluseWindow from "../components/PluseWindow";
import TaskManager from "../components/TaskManager";
import { togglePlus } from "../redux/actions/plus";
import { getTasks } from "../redux/actions/tasks";
import MainLayout from "../layout/Main.lauout";
import Task from "../components/task/Task";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

const sortsData = (SA, sorts) => [
	{
		click: SA.isFavorites_top,
		me: sorts.isFavorites_top,
		label: "ستاره دار ها اول باشند",
	},
	{
		click: SA.isDone_down,
		me: sorts.isDone_down,
		label: "تمام شده ها اخر باشند",
	},
	{
		click: SA.reverse,
		me: sorts.reverse,
		label: "برعکس کردن همه",
	},
];

const filterData = (FA, filters) => [
	{
		click: FA.justUnfinished,
		me: filters.justUnfinished,
		label: "فقط تمام نشده ها را نشان بده",
	},
	{
		click: FA.justfinished,
		me: filters.justfinished,
		label: "فقط تمام شده ها را نشان بده",
	},
	{
		click: FA.justFavorites,
		me: filters.justFavorites,
		label: "فقط ستاره دارها را نشان بده",
	},
];

export default function Index() {
	const [filters, setFilters] = useState({
		justUnfinished: false,
		justFavorites: false,
		justfinished: false,
	});
	const [sorts, setSorts] = useState({ isFavorites_top: false, isDone_down: false, reverse: false });

	const dispatch = useDispatch();
	const filtredTasks = useFiltringTasks({ filters, sorts });

	useTaskSelectore({ tasks: filtredTasks, alertOnNotFound: false });

	const FA = {
		// FA for filterActions
		justUnfinished() {
			const newFilters = { ...filters };
			newFilters.justUnfinished = !newFilters.justUnfinished;
			setFilters(newFilters);
		},
		justfinished() {
			const newFilters = { ...filters };
			newFilters.justfinished = !newFilters.justfinished;
			setFilters(newFilters);
		},
		justFavorites() {
			const newFilters = { ...filters };
			newFilters.justFavorites = !newFilters.justFavorites;
			setFilters(newFilters);
		},
	};
	const SA = {
		// SA for sortActions
		isFavorites_top() {
			const newSorts = { ...sorts };
			newSorts.isFavorites_top = !newSorts.isFavorites_top;
			setSorts(newSorts);
		},
		isDone_down() {
			const newSorts = { ...sorts };
			newSorts.isDone_down = !newSorts.isDone_down;
			setSorts(newSorts);
		},
		reverse() {
			const newSorts = { ...sorts };
			newSorts.reverse = !newSorts.reverse;
			setSorts(newSorts);
		},
	};

	return (
		<MainLayout>
			<Main>
				<Section>
					<TopContents>
						<h1>
							<img src="miz-logo.svg" />
							<span>پروژه میز - تسک ها</span>
						</h1>
						<FilterFields>
							<div>
								<span>مرتب سازی</span>
								<div className="menu">
									{sortsData(SA, sorts).map(({ me, click, label }, idx) => (
										<MenuItem key={idx} selectedMe={me} onClick={click}>
											{label}
										</MenuItem>
									))}
								</div>
							</div>
							<div>
								<span>فیلتر</span>
								<div className="menu">
									{filterData(FA, filters).map(({ me, click, label }, idx) => (
										<MenuItem key={idx} selectedMe={me} onClick={click}>
											{label}
										</MenuItem>
									))}
								</div>
							</div>
						</FilterFields>
					</TopContents>
				</Section>
				<Section>
					<PlusTaskBtn onClick={() => dispatch(togglePlus())}>
						<img src="plus.svg" />
						<h4>افزودن تسک ...</h4>
					</PlusTaskBtn>
				</Section>
				<Section>
					<ul>
						{filtredTasks.map(task => {
							return <Task taskData={task} key={task.id} />;
						})}
					</ul>
				</Section>
			</Main>
			<TaskManager />
			<PluseWindow />
		</MainLayout>
	);
}
Index.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getTasks({ req, res }));
};

const MenuItem = styled.span(({ selectedMe }) => {
	return {
		// padding: "10px",
		userSelect: "none",
		color: selectedMe ? "red" : "black",
		fontSize: "10px",
		fonstWeight: 500,
		whiteSpace: "nowrap",
		transition: "color 0.3s",
		"&:hover": {
			color: !selectedMe ? "#a37f7f" : "red",
		},
	};
});

const PlusTaskBtn = styled.div(({ theme: { flex, $bolderBlue, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		width: "100%",
		minHeight: "50px",
		borderRadius: 4,
		color: $white,
		backgroundColor: $bolderBlue,
		margin: "0",
		fontSize: "16px",
		cursor: "pointer",
		"> h4": {
			fontSize: "16px",
			margin: 0,
		},
		"> img": {
			padding: "0 15px",
		},
	};
});

export const TopContents = styled.div(({ theme: { flex, $black } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flex: 1,
		height: "70px",
		"> h1": {
			...flex(["justifyContent"]),
			color: $black,
			whiteSpace: "nowrap",
			width: "17%",
			fontSize: "16px",
			"> img": {
				padding: "0 15px",
			},
		},
	};
});

const FilterFields = styled.div(({ theme: { flex, $blueTxt, $black } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-end",
		width: "30%",
		"> div": {
			...flex(),
			minWidth: "40%",
			minHeight: "30px",
			borderRadius: "4px",
			color: $blueTxt,
			fontSize: "12px",
			backgroundColor: "rgba(111, 160, 241, 0.15)",
			position: "relative",
			padding: "0 10px",
			cursor: "pointer",
			"> div.menu": {
				display: "inherit",
				position: "absolute",
				backgroundColor: "#FFF",
				overflow: "hidden",
				minWidth: "100%",
				top: "30px",
				left: "unset",
				right: 0,
				...flex(["justifyContent"]),
				justifyContent: "space-evenly",
				flexDirection: "column",
				padding: "0 10px",
				transition: "all 0.3s",
				height: "0px",
			},
			"&:hover": {
				".menu": {
					height: "100px",
				},
			},
		},
		"> div + div": { marginRight: "10px", "div.menu": { left: 0, right: "unset" } },
	};
});

const Section = styled.section(({ extraStyles }) => {
	return {
		width: "100%",
		height: "max-content",
		marginBottom: 20,
		...extraStyles,
	};
});

const Main = styled.main(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flexDirection: "column",
		flex: 1,
		padding: "0 20px",
		backgroundColor: "#F5F6FA",
	};
});
