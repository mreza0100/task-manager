import styled from "styled-components";
import Header from "./Header";

export default function MainLauout({ children }) {
	return (
		<Wrapper>
			<Header />
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent", "alignItems"]),
		justifyContent: "space-between",
		alignItems: "initial",
		minHeight: "100vh",
	};
});
