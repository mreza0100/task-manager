import Header from "./Header";

export default function MainLauout({ children, HeaderComponent }) {
	return (
		<>
			<Header HeaderComponent={HeaderComponent} />
			{children}
		</>
	);
}
