import { useEffect, useState } from "react";
import { flex } from "../helpers/exports";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";

const menuData = [
	{
		isComponent: false,
		label: "ساخت حساب",
		route: "/register-progress/register",
	},
	{
		isComponent: false,
		label: "تایید شماره",
		route: "/register-progress/confirm",
	},
	{
		isComponent: false,
		label: "ورود",
		route: "/register-progress/login",
	},
	{
		isComponent: false,
		label: "بازیابی رمز عبور",
		route: "/register-progress/forgot-password",
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

const StyledLi = styled.li(({ selectedMe: s, extraStyles = {} }) => {
	return {
		width: "100%",
		...flex(["justifyContent"]),
		color: "#1b1f23",
		cursor: s ? "default" : "pointer",
		padding: "12px 16px",
		fontSize: "14px",
		borderRight: `5px solid ${s ? "red" : "transparent"}`,
		borderTop: "1px solid #eaecef",
		"&:hover": {
			backgroundColor: "#f6f8fa",
		},
		...extraStyles,
	};
});

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
