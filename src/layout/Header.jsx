import PluseBtn from "../components/PluseBtn";
import { flex } from "../helpers/exports";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toggleTasksFigure } from "../redux/actions/profile";

export default function Header({}) {
	// TODO: fix header make it like menu on setting layout
	const dispatch = useDispatch();
	const router = useRouter();
	const handleChangeFigure = () => dispatch(toggleTasksFigure());

	return (
		<StyledHeader className="container-fluid">
			<div className="container m-auto row">
				<Link href="/setting/profile">
					<StyledProfIcon className="fa fa-user c-p" />
				</Link>
				<Link href="/search">
					<a className="pr-3 search">جستجو</a>
				</Link>
				{router.pathname === "/" ? (
					<>
						<button
							className="btn btn-secondary mr-auto ml-4"
							onClick={handleChangeFigure}
						>
							تعویض حالت
						</button>
						<PluseBtn />
					</>
				) : (
					<Link href="/">
						<StyledHomeBtn className="fa fa-home c-p mr-auto" />
					</Link>
				)}
			</div>
		</StyledHeader>
	);
}

const StyledHomeBtn = styled.a(props => {
	return {
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
		backgroundColor: "#212121",
		color: "#fff",
		a: {
			...flex(),
			textDecoration: "none",
			"&:hover": {
				color: "#c2ceb8",
			},
		},
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
