import PluseBtn from "../components/PluseBtn";
import { flex } from "../helpers/exports";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default function Header({}) {
	// TODO: fix header make it like menu on setting layout
	const router = useRouter();
	const needHomeBtn = router.pathname !== "/";
	return (
		<StyledHeader className="container row">
			<Link href="/setting/profile">
				<StyledProfIcon className="fa fa-user c-p" />
			</Link>
			<Link href="/search">
				<a className="pr-3">جستجو</a>
			</Link>
			{needHomeBtn ? (
				<Link href="/">
					<StyledHomeBtn className="fa fa-home c-p mr-auto" />
				</Link>
			) : (
				<PluseBtn extraClass="mr-auto" />
			)}
		</StyledHeader>
	);
}

const StyledHomeBtn = styled.i(props => {
	return {
		...flex(),
		width: "35px",
		height: "35px",
		fontSize: "18px",
		color: "#fff",
	};
});

const StyledHeader = styled.header(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		margin: "0 auto 0 auto",
		height: "50px",
		width: "100%",
		backgroundColor: "#212121",
	};
});

const StyledProfIcon = styled.i(props => {
	return {
		...flex(),
		width: "35px",
		height: "35px",
		borderRadius: "50%",
		fontSize: "18px",
		backgroundColor: "red",
	};
});
