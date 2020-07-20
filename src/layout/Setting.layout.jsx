import { useEffect, useState } from "react";
import { flex } from "../helpers/exports";
import styled from "styled-components";
import Router from "next/router";
import Header from "./Header";
import Link from "next/link";

const _menuData_ = [
	{
		label: "پروفایل",
		route: "/setting/profile",
	},
	{
		label: "تغییر گذرواژه",
		route: "/setting/reset-password",
	},
	{
		label: "شخصی سازی",
		route: "/setting/customize",
	},
];

function Menu(props) {
	const [path, setPath] = useState();
	useEffect(() => {
		setPath(Router.pathname);
	});
	// TODO: make a component for prof img header and here
	return (
		<StyledMenuList>
			<ProfItem className="row">
				<i className="fa fa-user col-2" />

				<span className="col-7">
					<h6>Mreza</h6>
					<p>اکانت شخصی</p>
				</span>
			</ProfItem>
			{_menuData_.map(({ route: r, label }) => {
				return (
					<Link href={r} key={r}>
						<MenuItem selectedMe={path === r}>{label}</MenuItem>
					</Link>
				);
			})}
		</StyledMenuList>
	);
}

const ProfItem = styled.li(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		height: "auto",
		padding: "10px 0",
		cursor: "wait",
		pointerEvents: "none",
		i: {
			...flex(),
			fontSize: "18px",
			lineHeight: 2.5,
			borderRadius: "50%",
			backgroundColor: "red",
		},
		span: {
			...flex(["justifyContent"]),
			justifyContent: "space-evenly",
			alignItems: "start",
			flexDirection: "column",
			"*": {
				margin: 0,
			},
		},
	};
});

const MenuItem = styled.li(({ selectedMe: s }) => {
	return {
		...flex(["justifyContent"]),
		cursor: "pointer",
		padding: "4% 3%",
		height: "60px",
		borderRight: `5px solid ${s ? "red" : "transparent"}`,
		borderTop: "0.5px solid white",
		borderBottom: "0.5px solid white",
		"&: hover": {
			color: "blue",
		},
	};
});

const StyledMenuList = styled.ul(props => {
	return {
		...flex(["alignItems"]),
		flexDirection: "column",
		textAlign: "right",
		width: "100%",
		height: "auto",
		border: "1px solid white",
	};
});

export default props => {
	return (
		<>
			<Header isProfPage />
			<StyledMain className="container row justify-content-between">
				<div className="col-sm-3">
					<Menu />
				</div>
				<div className="col-sm-8">{props.children}</div>
			</StyledMain>
		</>
	);
};
const StyledMain = styled.main(props => {
	return {
		margin: "20px auto 0 auto",
	};
});
