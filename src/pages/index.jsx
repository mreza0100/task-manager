import { useSelector } from "react-redux";
import { flex, transition } from "../helpers/exports";
import styled, { useTheme } from "styled-components";
import PluseWindow from "../components/PluseWindow";
import TaskManager, { formikStyles } from "../components/TaskManager";
import { getProfileAndTasks } from "../redux/actions/profile";
import Router from "next/router";
import MainLayout from "../layout/Main.lauout";
import { wrapper } from "../redux/store";
import Task from "../components/Task";
import { useEffect, useState, useMemo } from "react";
import showMsg from "../helpers/alerts/msg";

// TODO: add trash for deleting tasks
// TODO: add riminder for every task with a comment
// TODO: add ask modal for deleting tasks and stuffs like that
// TODO: add priority [1, 2, 3, 4]
// TODO: add a routes for all routes insted of string every where

function checkAndPassQuery({ target }) {
	const id = target.getAttribute("target");
	if (target.nodeName !== "LI" /*and has target att*/ || !id) return;
	if (Router.query.id === id /* if clicked on opened task just close it */)
		Router.replace("/", undefined, { shallow: true });
	else Router.replace(`/?id=${id}`, undefined, { shallow: true });
}

export default function Home(props) {
	const isPluseMode = useSelector(state => state.isPluseMode);
	const tasks = useSelector(state => state.tasks);
	const { classes, figure } = useTheme().TF;
	const [routerID, setRouterID] = useState();

	useEffect(() => {
		setRouterID(Router.query.id);
		if (routerID && !tasks.find(task => task.id === routerID)) {
			Router.replace("/");
			showMsg(
				{
					title: { text: "همچین تسکی موجود نیست" },
					body: { text: "احتمالا این تسک فبلا حذف شده است" },
					html: "<p>شما دیگر قادر به استفاده از این تسک نیستید</p>",
				},
				{ status: "danger", pendingID: "task query id 404" },
			);
		}
	});

	return (
		<MainLayout>
			<StyledMain className={classes.main}>
				{tasks.length ? (
					<>
						{figure === "table" && routerID && (
							// if routerID was undefined no id query is passed then there is no task for showing
							<TaskManagerWrapper>
								<TaskManager taskID={routerID} />
							</TaskManagerWrapper>
						)}
						{/* <StyledUl className={classes.ul} onClick={checkAndPassQuery}>
							{tasks.map(task => {
								return <Task taskData={task} key={task.id} />;
							})}
						</StyledUl> */}

						{useMemo(() => {
							console.log(22);
							return (
								<StyledUl
									className={classes.ul}
									onClick={checkAndPassQuery}
								>
									{tasks.map(task => {
										return (
											<Task
												taskData={task}
												key={task.id}
											/>
										);
									})}
								</StyledUl>
							);
						}, [tasks, figure])}
					</>
				) : (
					<PluseWindow />
				)}

				<StyledWrapper visible={isPluseMode}>
					{isPluseMode && <PluseWindow hasPluseBtn />}
				</StyledWrapper>
			</StyledMain>
		</MainLayout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store: { dispatch }, req, res }) => {
		await dispatch(getProfileAndTasks({ req, res }));
	},
);

const StyledUl = styled.ul(({ theme }) => {
	const general = {};
	switch (theme.TF.figure) {
		case "line":
			return { ...general, ...flex() };
		case "table":
			return {
				...general,
				...flex(),
				width: "100%",
				minHeight: "100px",
				flexWrap: "wrap",
			};
	}
});

const TaskManagerWrapper = styled.div(({}) => {
	return {
		...flex(),
		flexDirection: "column",
		width: "80%",
		margin: "auto",
		padding: "20px 0",
		backgroundColor: "#28596157",
		overflow: "hidden",
		...formikStyles,
	};
});

const StyledWrapper = styled.div(({ visible: v }) => {
	return {
		...transition(0.3),
		position: "fixed",
		bottom: "0",
		right: v ? "10%" : 0,
		width: "35%",
		minHeight: "450px",
		padding: "15px 0",
		opacity: v ? 1 : 0,
		pointerEvents: v ? "unset" : "none",
		borderRadius: "10px 10px 0px 0px",
		backgroundColor: v ? "#6F9283" : "transparent",
	};
});

const StyledMain = styled.main(({ theme: { TF } }) => {
	return {
		width: "100%",
		height: "auto",
		color: "#fff",
	};
});
