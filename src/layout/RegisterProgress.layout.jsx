import { useEffect, useState } from "react";
import { flex } from "../helpers/exports";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { StyledLi } from "./Setting.layout";

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
						if (isComponent) return jsx();
						const selectedMe = path === route;
						const borderRight = `5px solid ${selectedMe ? "blue" : "transparent"}`;

						return (
							<Link href={route} key={route}>
								<StyledLi selectedMe={selectedMe} extraStyles={{ borderRight }}>
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

const StyledUl = styled.ul(props => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		border: "1px solid #e1e4e8",
		borderRadius: "6px",
		userSelect: "none",
	};
});

const StyledMain = styled.main(props => {
	return {
		paddingTop: "25px",
		justifyContent: "space-evenly",
	};
});
