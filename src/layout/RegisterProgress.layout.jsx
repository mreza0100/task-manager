import { useEffect, useState } from "react";
import { flex } from "../helpers/exports";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";

const menuData = [
	{
		isComponent: false,
		label: "ساخت حساب",
		route: "/register-progsess/register",
	},
	{
		isComponent: false,
		label: "تایید شماره",
		route: "/register-progsess/confirm",
	},
	{
		isComponent: false,
		label: "ورود",
		route: "/register-progsess/login",
	},
	{
		isComponent: false,
		label: "بازیابی رمز عبور",
		route: "/register-progsess/forgot-password",
	},
];

export default function RegisterProgress({ children }) {
	const [path, setPath] = useState();
	useEffect(() => {
		setPath(Router.pathname);
	}, []);
	return (
		<StyledMain className="container-fluid row">
			<div className="col-sm-3">
				<StyledUl>
					{menuData.map(({ route, label, isComponent, jsx }) => {
						if (isComponent) return jsx({});
						return (
							<Link href={route} key={route}>
								<StyledLi selectedMe={path === route}>
									{label}
								</StyledLi>
							</Link>
						);
					})}
				</StyledUl>
			</div>
			<ChildrenConteiner className="col-sm-6">{children}</ChildrenConteiner>
		</StyledMain>
	);
}

const ChildrenConteiner = styled.div(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flexDirection: "column",
		height: "fit-content",
	};
});

const StyledLi = styled.li(({ selectedMe: s }) => {
	return {
		width: "100%",
		...flex(["justifyContent"]),
		cursor: "pointer",
		padding: "4% 3%",
		height: "60px",
		borderRight: `5px solid ${s ? "blue" : "transparent"}`,
		"&: hover": {
			color: "blue",
		},
	};
});

const StyledUl = styled.ul(props => {
	return {
		...flex(),
		flexDirection: "column",
		textAlign: "right",
		width: "100%",
		height: "auto",
		border: "0.5px solid black",
		"> li + li": {
			borderTop: "0.5px solid black",
		},
	};
});

const StyledMain = styled.main(props => {
	return {
		paddingTop: "25px",
		justifyContent: "space-evenly",
	};
});
