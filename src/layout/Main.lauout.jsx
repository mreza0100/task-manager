import styled from "styled-components";
import Header from "./Header";

export default function MainLauout({ children, HeaderComponent }) {
	return (
		<Wrapper>
			<Header />
			{children}
		</Wrapper>
	);
}
const Wrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		height: "100%",
	};
});
