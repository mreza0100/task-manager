import TaskManager, { formikStyles } from "../components/TaskManager";
import { getProfileAndTasks } from "../redux/actions/profile";
import Task, { StyledCheckbox } from "../components/Task";
import { flex, transition } from "../helpers/exports";
import { useEffect, useState, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import PluseWindow from "../components/PluseWindow";
import MainLayout from "../layout/Main.lauout";
import showMsg from "../helpers/alerts/msg";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import Router from "next/router";

// TODO: add trash for deleting tasks
// TODO: add riminder for every task with a comment
// TODO: add ask modal for deleting tasks and stuffs like that
// TODO: add priority [1, 2, 3, 4]
// TODO: add a routes file for all routes insted of string every where

function checkAndPassQuery({ target }) {
	const id = target.getAttribute("target");
	if (target.nodeName !== "LI" /*and has a valid target att*/ || !id) return;
	if (Router.query.id === id /* if clicked on opened task just close it */)
		Router.replace("/", undefined, { shallow: true });
	else Router.replace(`/?id=${id}`, undefined, { shallow: true });
}

export default function Home(props) {
	// hooks
	const isPluseMode = useSelector(state => state.isPluseMode);
	const tasks = useSelector(state => state.tasks);
	const { classes, figure } = useTheme().TF;
	const [routerID, setRouterID] = useState();
	const [showNotDones, setShowNotDones] = useState(false);
	// functions
	const filtredTasks = () => {
		if (!Array.isArray(tasks))
			return [
				/*just to be cation*/
			];
		if (showNotDones) return tasks.filter(task => !task.is_done);
		return tasks;
	};
	const onChangeFilter = () => {
		setShowNotDones(!showNotDones);
		// this pice of code is for preventing a bug for TaskManager and filtering tasks
		const selectedTask = tasks.find(task => task.id === routerID);
		// ? if selectedTask was find and tasks was not filtred
		if (selectedTask && !showNotDones) {
			// ! if selectedTask.is_done was defferent with are filter
			if (selectedTask.is_done !== showNotDones) return Router.push("/");
		}
	};

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
				{ status: "danger", pendingID: "task query id 404" }
			);
		}
	});
	const UlMemo = useMemo(() => {
		return (
			<StyledUl className={classes.ul} onClick={checkAndPassQuery}>
				{filtredTasks().map(task => {
					return <Task taskData={task} key={task.id} />;
				})}
			</StyledUl>
		);
	}, [tasks, figure, showNotDones]);

	return (
		<MainLayout>
			<StyledMain className={classes.main}>
				<StyledOptions className="col-10">
					<p className="mt-auto mb-auto">فقط تمام نشده ها را نشان بده :</p>
					<StyledCheckbox onClick={onChangeFilter} opacity={showNotDones ? 1 : 0}>
						<i className="fa fa-check" />
					</StyledCheckbox>
				</StyledOptions>
				{tasks.length ? (
					<>
						{figure === "table" && routerID && (
							// if routerID was undefined no id query is passed then there is no task for showing
							<TaskManagerWrapper>
								<TaskManager taskID={routerID} />
							</TaskManagerWrapper>
						)}
						{UlMemo}
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

Home.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getProfileAndTasks({ req, res }));
};

const StyledOptions = styled.div(({}) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		margin: "10px auto",
		padding: 0,
		"> p": {
			color: "black",
			fontSize: 16,
			margin: "0 0 0 10px",
		},
	};
});

const StyledUl = styled.ul(({ theme }) => {
	switch (theme.TF.figure) {
		case "line":
			return { ...flex() };
		case "table":
			return {
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
		bottom: v ? "0%" : "-80%",
		right: "10%",
		width: "35%",
		minHeight: "450px",
		padding: "15px 0",
		opacity: v ? 1 : 0,
		pointerEvents: v ? "unset" : "none",
		borderRadius: "10px 10px 0px 0px",
		backgroundColor: "#6F9283",
	};
});

const StyledMain = styled.main(({}) => {
	return {
		width: "100%",
		height: "auto",
		color: "#fff",
	};
});
