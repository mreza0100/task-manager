import DropDownMenu from "../components/DropDownMenu";
import useFiltringTasks from "../hooks/filtringTasks";
import useTaskSelectore from "../hooks/taskSelector";
import PluseWindow from "../components/PluseWindow";
import TaskManager from "../components/TaskManager";
import { getTasks } from "../redux/actions/tasks";
import MainLayout from "../layout/Main.lauout";
import Task from "../components/task/Task";
import styled from "styled-components";
import { useState } from "react";

export default function Index() {
	const [filters, setFilters] = useState({
		justUnfinished: false,
		justFavorites: false,
		justfinished: false,
	});
	const [sorts, setSorts] = useState({ isFavorites_top: false, isDone_down: false, reverse: false });
	const [isPluseMode, setPluseMode] = useState(false);

	const filtredTasks = useFiltringTasks({ filters, sorts });

	useTaskSelectore({ tasks: filtredTasks, alertOnNotFound: false });

	const FA = [
		// FA for filterActions
		{
			onClick: () => setFilters({ ...filters, justUnfinished: !filters.justUnfinished }),
			isSelectedMe: filters.justUnfinished,
			label: "فقط تمام نشده ها را نشان بده",
		},
		{
			onClick: () => setFilters({ ...filters, justfinished: !filters.justfinished }),
			isSelectedMe: filters.justfinished,
			label: "فقط تمام شده ها را نشان بده",
		},
		{
			onClick: () => setFilters({ ...filters, justFavorites: !filters.justFavorites }),
			isSelectedMe: filters.justFavorites,
			label: "فقط ستاره دارها را نشان بده",
		},
	];
	const SA = [
		// SA for sortActions
		{
			onClick: () => setSorts({ ...sorts, isFavorites_top: !sorts.isFavorites_top }),
			isSelectedMe: sorts.isFavorites_top,
			label: "ستاره دار ها اول باشند",
		},
		{
			onClick: () => setSorts({ ...sorts, isDone_down: !sorts.isDone_down }),
			isSelectedMe: sorts.isDone_down,
			label: "تمام شده ها اخر باشند",
		},
		{
			onClick: () => setSorts({ ...sorts, reverse: !sorts.reverse }),
			isSelectedMe: sorts.reverse,
			label: "برعکس کردن همه",
		},
	];

	return (
		<MainLayout>
			<Main>
				<Section>
					<TopContents>
						<h1>
							<i className="icon-miz-logo" />
							<span>پروژه میز - تسک ها</span>
						</h1>
						<div>
							<DropDownMenu title="مرتب سازی">
								{SA.map(({ onClick, label, isSelectedMe }) => (
									<DropDownItem
										key={label}
										selectedMe={isSelectedMe}
										onClick={onClick}
									>
										{label}
									</DropDownItem>
								))}
							</DropDownMenu>
							<DropDownMenu title="فیلتر ها">
								{FA.map(({ onClick, label, isSelectedMe }) => (
									<DropDownItem
										key={label}
										selectedMe={isSelectedMe}
										onClick={onClick}
									>
										{label}
									</DropDownItem>
								))}
							</DropDownMenu>
						</div>
					</TopContents>
				</Section>
				<Section>
					<PlusTaskBtn
						onClick={() => {
							setPluseMode(!isPluseMode);
						}}
					>
						<i className="icon-plus" />
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
			<PluseWindow isPluseMode={isPluseMode} setPluseMode={setPluseMode} />
		</MainLayout>
	);
}
Index.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getTasks({ req, res }));
};

export const DropDownItem = styled.li(({ selectedMe }) => {
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
		"> i": {
			padding: "0 15px",
		},
	};
});

export const TopContents = styled.div(({ theme: { flex, $black }, extraStyles = {} }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		// flex: 1,
		height: "70px",
		"> h1": {
			...flex(["justifyContent"]),
			color: $black,
			whiteSpace: "nowrap",
			width: "17%",
			fontSize: "16px",
			"> i": {
				padding: "0 15px",
			},
		},
		"> div": {
			...flex(),
			"> *": {
				marginRight: "15px",
			},
		},
		...extraStyles,
	};
});

export const FilterFields = styled.div(({ theme: { flex, $blueTxt, $black }, extraStyles }) => {
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
		...extraStyles,
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
		overflow: "hidden",
	};
});
