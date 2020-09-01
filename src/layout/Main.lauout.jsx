import styled from "styled-components";
import Header from "./Header";

export default function MainLauout({ children }) {
	return (
		<LayoutWrapper>
			<Header />
			{children}
		</LayoutWrapper>
	);
}

export const LayoutWrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent", "alignItems"]),
		justifyContent: "space-between",
		alignItems: "initial",
		minHeight: "100vh",
	};
});
