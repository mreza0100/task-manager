import useTasksFigure from "../themes/tasksFigure.theme";
import { ThemeProvider } from "styled-components";
import Header from "./Header";

export default function MainLauout({ children }) {
	const tasksFigure = useTasksFigure();
	return (
		<ThemeProvider theme={{ TF /*TF for tasksFigure*/: tasksFigure }}>
			<Header />
			{children}
		</ThemeProvider>
	);
}
