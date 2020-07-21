import { flex } from "../helpers/exports";
import styled from "styled-components";
import PluseBtn from "../components/PluseBtn";
import Link from "next/link";

function HomeBtn(props) {
	return (
		<Link href="/">
			<StyledHomeBtn className="fa fa-home cursor-pointer" />
		</Link>
	);
}
// TODO: add exit btn

const StyledHomeBtn = styled.i(props => {
	return {
		...flex(),
		width: "35px",
		height: "30px",
		fontSize: "18px",
		color: "#fff"
	};
});

export default function Header({ isProfPage }) {
	return (
		<StyledHeader>
			<div className="container row justify-content-between">
				<div>
					<Link href="/setting/profile">
						<StyledProfIcon className="fa fa-user cursor-pointer" />
					</Link>
				</div>
				{(isProfPage && <HomeBtn />) || <PluseBtn />}
			</div>
		</StyledHeader>
	);
}

const StyledProfIcon = styled.i(props => {
	return {
		...flex(),
		width: "35px",
		height: "35px",
		borderRadius: "50%",
		fontSize: "18px",
		backgroundColor: "red"
	};
});

const StyledHeader = styled.header(props => {
	return {
		...flex(),
		height: "50px",
		width: "100%",
		backgroundColor: "#212121"
	};
});
