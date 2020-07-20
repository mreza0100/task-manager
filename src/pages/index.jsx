import { toggleTasksFigure } from "../redux/actions/profile";
import { formikStyles } from "../components/TaskManager";
import { useSelector, useDispatch } from "react-redux";
import { flex, transition } from "../helpers/exports";
import styled, { useTheme } from "styled-components";
import PluseWindow from "../components/PluseWindow";
import TaskManager from "../components/TaskManager";
import { getTasks } from "../redux/actions/tasks";
import Router, { useRouter } from "next/router";
import MainLayout from "../layout/Main.lauout";
import { wrapper } from "../redux/store";
import Task from "../components/Task";
// !--->>
// TODO: add prettier and ESlint config files
// TODO: add trash for deleting tasks
// TODO: add riminder for every task with a comment
// TODO: add ask and msg page for deleting tasks and stuffs like that
// TODO: add priority [1, 2, 3, 4]

function checkAndPassQuery({ target }) {
	const id = target.getAttribute("target");
	if (target.nodeName !== "LI" /*and has target att*/ || !id) return;
	if (Router.query.id === id /* if clicked on opened task just close it */)
		Router.replace("/", undefined, { shallow: true });
	else Router.replace(`/?id=${id}`, undefined, { shallow: true });
}

function TasksList(props) {
	const tasks = useSelector(state => state.tasks);
	const router = useRouter();
	const { id: routerID } = router.query;
	const { classes, figure } = useTheme().TF;
	const isOpenTask = figure === "table" && routerID;

	if (!tasks.length) return <PluseWindow />;
	return (
		<>
			{isOpenTask && (
				<TaskManagerWrapper>
					<TaskManager taskID={isOpenTask} />
				</TaskManagerWrapper>
			)}
			<StyledUl className={classes.ul} onClick={checkAndPassQuery}>
				{tasks.map(task => {
					return <Task taskData={task} key={task.id} />;
				})}
			</StyledUl>
		</>
	);
}
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
		height: "auto",
		margin: "auto",
		padding: "20px 0",
		backgroundColor: "#28596157",
		overflow: "hidden",
		position: "relative",
		bottom: "8px",
		...formikStyles,
	};
});

export default function Home(props) {
	const dispatch = useDispatch();
	const isPluseMode = useSelector(state => state.isPluseMode);
	const handleChangeFigure = e => dispatch(toggleTasksFigure());
	const TF /*TF for tasksFigure*/ = useSelector(state => state.profile.tasksFigure);
	return (
		<MainLayout>
			<div className="container mb-3 w-75">
				<button className="btn btn-primary" onClick={handleChangeFigure}>
					تعویض حالت
				</button>
			</div>
			<StyledMain className={TF === "table" ? "container-fluid" : "container"}>
				<TasksList />
				<StyledWrapper visible={isPluseMode}>
					{isPluseMode && <PluseWindow hasPluseBtn />}
				</StyledWrapper>
			</StyledMain>
		</MainLayout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store: { dispatch }, req, res }) => {
		await dispatch(getTasks({ req, res }));
	}
);

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
