import Header from "./Header";

export default function MainLauout({ children, HeaderComponent }) {
	console.log("in layout!!");
	// var x = { a: 1 };
	// console.log(x.values());
	return (
		<>
			<Header>{HeaderComponent}</Header>
			{children}
		</>
	);
}
