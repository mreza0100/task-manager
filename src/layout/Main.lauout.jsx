import Header from "./Header";

export default function MainLauout({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
