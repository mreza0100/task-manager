import styled from "styled-components";

export default function ColorPicker() {
	return <Span></Span>;
}
const Span = styled.span(props => {
	return {
		"background-color": "red",
		"-webkit-mask-image": "url(icon.svg)",
		"mask-image": "url(icon.svg)",
	};
});
