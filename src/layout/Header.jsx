import styled from "styled-components";

export default function Header({}) {
	return <StyledHeader></StyledHeader>;
}
const StyledHeader = styled.div(({ theme: { flex } }) => {
	return {
		width: 71,
		height: "100%",
		border: "red 1px solid",
	};
});
