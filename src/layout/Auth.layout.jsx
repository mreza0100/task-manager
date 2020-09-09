import styled from "styled-components";

export default function AuthLayout({ children, imgSrc, extraStyles }) {
	imgSrc = imgSrc ? imgSrc : require("../../public/stupid white chair.png");

	return (
		<Main>
			<ModalWindow extraStyles={extraStyles}>
				<img src={imgSrc} />
				{children}
			</ModalWindow>
		</Main>
	);
}

export const ModalWindow = styled.section(({ theme: { flex, $white }, extraStyles }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "715px",
		height: "518px",
		margin: "auto",
		background: $white,
		boxShadow: " 0px 0px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "4px",
		img: {
			height: "100%",
			width: "240px",
		},
		...extraStyles,
	};
});

const Main = styled.main(({ theme: { flex } }) => {
	return {
		...flex(),
		wdith: "100%",
		height: "100vh",
		backgroundColor: "#F5F6FA",
	};
});
