import { getProfileData } from "../redux/actions/profile";
import useFiltringTasks from "../hooks/filtringTasks";
import useTaskSelector from "../hooks/taskSelector";
import TaskManager from "../components/TaskManager";
import { togglePlus } from "../redux/actions/plus";
import { getTasks } from "../redux/actions/tasks";
import MainLayout from "../layout/Main.lauout";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Task from "../components/Task";
import PluseWindow from "../components/PluseWindow";

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

	const taskSelector = useTaskSelector({ tasks: filtredTasks });

	useTaskSelector({ getTaskIDFromRouter: true, alertOnNotFound: false });

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
						{useMemo(
							() => (
								<div id="fields">
									<div>
										<span>مرتب سازی</span>
										<div className="menu">
											{sortsData(SA, sorts).map(
												({ me, click, label }, idx) => (
													<MenuItem
														key={idx}
														selectedMe={me}
														onClick={click}
													>
														{label}
													</MenuItem>
												)
											)}
										</div>
									</div>
									<div>
										<span>فیلتر</span>
										<div className="menu">
											{filterData(FA, filters).map(
												({ me, click, label }, idx) => (
													<MenuItem
														key={idx}
														selectedMe={me}
														onClick={click}
													>
														{label}
													</MenuItem>
												)
											)}
										</div>
									</div>
								</div>
							),
							[filters, sorts]
						)}
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
	await dispatch(getProfileData({ req, res }));
	await dispatch(getTasks({ req, res }));
};

const MenuItem = styled.span(({ selectedMe }) => {
	return {
		padding: "10px 0",
		userSelect: "none",
		color: selectedMe ? "red" : "black",
		fontSize: "10px",
		whiteSpace: "nowrap",
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

const TopContents = styled.div(({ theme: { flex, $blueTxt, $black } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "100%",
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
		"> div#fields": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
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
					position: "absolute",
					padding: "10px 0",
					backgroundColor: "#FFF",
					overflow: "hidden",
					top: 30,
					right: -10,
					left: -10,
					...flex(["justifyContent"]),
					justifyContent: "space-evenly",
					flexDirection: "column",
					height: "max-content",
					minHeight: "25px",
					opacity: 0,
					pointerEvents: "none",
					transition: "all 0.4s",
				},
				"&:hover": {
					".menu": {
						opacity: 1,
						pointerEvents: "unset",
					},
				},
			},
		},
		"> ul": {
			padding: 0,
		},
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
