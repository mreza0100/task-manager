// import { getProfileData, changeTasksFigure } from "../redux/actions/profile";
// import TaskManager, { formikStyles } from "../components/TaskManager";
// import Task, { StyledCheckbox } from "../components/Task";
// import { useSelector, useDispatch } from "react-redux";
// import { flex, transition } from "../helpers/exports";
// import { useState, useEffect, useMemo } from "react";
// import styled, { useTheme } from "styled-components";
// import PluseWindow from "../components/PluseWindow";
// import { getTasks } from "../redux/actions/tasks";
// import Router, { useRouter } from "next/router";
// import MainLayout from "../layout/Main.lauout";
// import PluseBtn from "../components/PluseBtn";
// import showMsg from "../helpers/alerts/msg";

// // TODO: add trash for deleting tasks
// // TODO: add riminder for every task with a comment
// // TODO: add ask modal for deleting tasks and stuffs like that
// // TODO: add priority [1, 2, 3, 4]
// // TODO: add a routes file for all routes insted of string every where

// function checkAndPassQuery({ target }) {
// 	const id = target.getAttribute("target");
// 	if (target.nodeName !== "LI" /*and has a valid target att*/ || !id) return;
// 	if (Router.query.id === id) {
// 		// if clicked on opened task just close it
// 		Router.replace("/", undefined, { shallow: true });
// 	} else {
// 		Router.replace(`/?id=${id}`, undefined, { shallow: true });
// 	}
// }

// function HeaderComponent(props) {
// 	const dispatch = useDispatch();
// 	const tasksFigure = useSelector(state => state.profile.tasks_figure);
// 	const handleChangeFigure = () => {
// 		const figure = tasksFigure === "line" ? "table" : "line";
// 		dispatch(changeTasksFigure({ figure }));
// 	};
// 	return (
// 		<>
// 			<button className="btn btn-secondary mr-auto ml-4" onClick={handleChangeFigure}>
// 				تعویض حالت
// 			</button>
// 			<PluseBtn />
// 		</>
// 	);
// }

// export default function Index(props) {
// 	// hooks
// 	const isPluseMode = useSelector(state => state.isPluseMode);
// 	const [showNotDones, setShowNotDones] = useState(false);
// 	const tasks = useSelector(state => state.tasks);
// 	const { classes, figure } = useTheme().TF;
// 	const router = useRouter();
// 	// functions
// 	const getFiltredTasks = () => {
// 		var _tasks = [...tasks];
// 		if (showNotDones) _tasks = _tasks.filter(task => !task.is_done);
// 		// if (false) _tasks = [..._tasks.filter(t => t.is_favorite), ..._tasks.filter(t => !t.is_favorite)];
// 		return _tasks;
// 	};
// 	const onChangeFilter = () => {
// 		setShowNotDones(!showNotDones);
// 		// this pice of code is for preventing a bug for TaskManager and filtering tasks
// 		const selectedTask = tasks.find(task => task.id === routerID);
// 		// ? if selectedTask was find and tasks was not filtred
// 		if (selectedTask && !showNotDones) {
// 			// ! if selectedTask.is_done was defferent with are filter
// 			if (selectedTask.is_done !== showNotDones) return Router.push("/");
// 		}
// 	};
// 	const { id: routerID } = router.query;
// 	useEffect(() => {
// 		if (routerID && !tasks.find(task => task.id === routerID)) {
// 			Router.replace("/");
// 			showMsg(
// 				{
// 					title: { text: "همچین تسکی موجود نیست" },
// 					body: { text: "احتمالا این تسک فبلا حذف شده است" },
// 					html: "<p>شما دیگر قادر به استفاده از این تسک نیستید</p>",
// 				},
// 				{ status: "danger", pendingID: "task query 404" }
// 			);
// 		}
// 	}, [routerID]);
// 	const UlMemo = useMemo(() => {
// 		return (
// 			<StyledUl className={classes.ul} onClick={checkAndPassQuery}>
// 				{getFiltredTasks().map(task => {
// 					return <Task taskData={task} key={task.id} />;
// 				})}
// 			</StyledUl>
// 		);
// 	}, [tasks, figure, showNotDones]);

// 	return (
// 		<MainLayout HeaderComponent={HeaderComponent}>
// 			<StyledMain className={classes.main}>
// 				{tasks.length ? (
// 					<>
// 						<StyledOptions className="col-10">
// 							<p className="mt-auto mb-auto">فقط تمام نشده ها را نشان بده :</p>
// 							<StyledCheckbox onClick={onChangeFilter} opacity={showNotDones ? 1 : 0}>
// 								<i className="fa fa-check" />
// 							</StyledCheckbox>
// 						</StyledOptions>
// 						{figure === "table" && routerID && (
// 							// if routerID was undefined no id query is passed then there is no task for showing
// 							<TaskManagerWrapper>
// 								<TaskManager taskID={routerID} />
// 							</TaskManagerWrapper>
// 						)}
// 						{UlMemo}
// 					</>
// 				) : (
// 					<div className="w-75 m-auto">
// 						<PluseWindow />
// 					</div>
// 				)}
// 				<StyledWrapper visible={isPluseMode}>
// 					{isPluseMode && <PluseWindow hasPluseBtn />}
// 				</StyledWrapper>
// 			</StyledMain>
// 		</MainLayout>
// 	);
// }

// Index.getInitialProps = async ({ store: { dispatch }, req, res }) => {
// 	await dispatch(getProfileData({ req, res }));
// 	await dispatch(getTasks({ req, res }));
// };

// const StyledOptions = styled.div(({}) => {
// 	return {
// 		...flex(["justifyContent"]),
// 		justifyContent: "flex-start",
// 		margin: "10px auto",
// 		padding: 0,
// 		"> p": {
// 			color: "black",
// 			fontSize: 16,
// 			margin: "0 0 0 10px",
// 		},
// 	};
// });

// const StyledUl = styled.ul(({ theme, children }) => {
// 	const general = { ...(children.length === 0 ? { border: "1px black solid", minHeight: "100px" } : {}) };
// 	switch (theme.TF.figure) {
// 		case "line":
// 			return { ...general, ...flex() };
// 		case "table":
// 			return { ...general, ...flex(), width: "100%", minHeight: "100px", flexWrap: "wrap" };
// 	}
// });

// const TaskManagerWrapper = styled.div(({}) => {
// 	return {
// 		...flex(),
// 		flexDirection: "column",
// 		width: "80%",
// 		margin: "auto",
// 		padding: "20px 0",
// 		backgroundColor: "#28596157",
// 		overflow: "hidden",
// 		...formikStyles,
// 	};
// });

// const StyledWrapper = styled.div(({ visible: v }) => {
// 	return {
// 		...transition(0.3),
// 		position: "fixed",
// 		bottom: v ? "0%" : "-80%",
// 		right: "10%",
// 		width: "35%",
// 		minHeight: "450px",
// 		padding: "15px 0",
// 		opacity: v ? 1 : 0,
// 		pointerEvents: v ? "unset" : "none",
// 		borderRadius: "10px 10px 0px 0px",
// 		backgroundColor: "#286B89",
// 	};
// });

// const StyledMain = styled.main(({}) => {
// 	return {
// 		width: "100%",
// 		height: "auto",
// 		color: "#fff",
// 	};
// });
