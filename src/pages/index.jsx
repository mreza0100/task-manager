import { getProfileData } from "../redux/actions/profile";
import { useSelector } from "react-redux";
import { getTasks } from "../redux/actions/tasks";
import MainLayout from "../layout/Main.lauout";
import styled from "styled-components";
import Task from "../components/Task";

// import TaskManager, { formikStyles } from "../components/TaskManager";
// import { useState, useEffect, useMemo } from "react";
// import PluseWindow from "../components/PluseWindow";
// import Router, { useRouter } from "next/router";
// import showMsg from "../helpers/alerts/msg";

// TODO: plus

function TaskList() {
	const tasks = useSelector(({ tasks }) => tasks);
	const getFiltredTasks = () => {
		var _tasks = [...tasks];
		// if (showNotDones) _tasks = _tasks.filter(task => !task.is_done);
		// if (false) _tasks = [..._tasks.filter(t => t.is_favorite), ..._tasks.filter(t => !t.is_favorite)];
		return _tasks;
	};
	return (
		<ul>
			{getFiltredTasks().map(task => {
				return <Task taskData={task} key={task.id} />;
			})}
		</ul>
	);
}

export default function Index() {
	return (
		<MainLayout>
			<Main>
				<Section>
					<TopContents>
						<h1>
							<img src="miz-logo.svg" />
							<span>پروژه میز - تسک ها</span>
						</h1>
						<div id="fields">
							<div>
								<span>مرتب سازی</span>
								<div className="menu"></div>
							</div>
							<div>
								<span>فیلتر</span>
								<div className="menu">
									<span>awd</span>
									<span>awd</span>
								</div>
							</div>
						</div>
					</TopContents>
				</Section>
				<Section extraStyles={{ marginBottom: 20 }}>
					<PluseTaskBtn>
						<img src="plus.svg" />
						<h4>افزودن تسک ...</h4>
					</PluseTaskBtn>
				</Section>
				<Section>
					<TaskList />
				</Section>
			</Main>
			<Aside></Aside>
		</MainLayout>
	);
}
Index.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getProfileData({ req, res }));
	await dispatch(getTasks({ req, res }));
};

const PluseTaskBtn = styled.div(({ theme: { flex, $bolderBlue, $white } }) => {
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
		height: "50px",
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
				justifyContent: "space-between",
				color: $blueTxt,
				fontSize: "12px",
				backgroundColor: "rgba(111, 160, 241, 0.15)",
				position: "relative",
				padding: "0 10px",
				cursor: "pointer",
				"> span": { margin: "0 auto 0 auto" },
				"> div.menu": {
					position: "absolute",
					backgroundColor: "red",
					overflow: "hidden",
					top: 30,
					right: 0,
					left: 0,
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
		marginBottom: 10,
		...extraStyles,
	};
});

const Aside = styled.aside(({ theme: { flex, $white } }) => {
	return {
		width: "400px",
		padding: "20px",
		borderRight: "1px solid #E4EAF0",
		backgroundColor: $white,
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
