import { flex } from "../helpers/exports";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const navData = [
	{
		isComponent: false,
		route: "/setting/profile",
		text: "پروفایل",
		font: "fa fa-user",
		className: "prof",
	},
	{
		isComponent: false,
		route: "/dashboard",
		text: "جستجو",
		font: "fa fa-search",
	},
	{
		isComponent: false,
		route: "/",
		text: "صفحه اصلی",
		font: "fa fa-home",
	},
];

function Nav(props) {
	const { pathname } = useRouter();
	return useMemo(() => {
		return (
			<StyledNav>
				{navData.map(({ route, text, font, className, isComponent, jsx }) => {
					if (isComponent) return jsx();
					return (
						<Link href={route} key={route}>
							<StyledH6 className={className || null} selectedMe={pathname === route}>
								{text}
								<i className={font || null} />
							</StyledH6>
						</Link>
					);
				})}
			</StyledNav>
		);
	}, [pathname]);
}

const StyledH6 = styled.h6(({ selectedMe }) => {
	return {
		color: selectedMe ? "red" : "#fff",
		cursor: selectedMe ? "default" : "pointer",
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		minWidth: "85px",
		transition: "color 0.3s",
		fontSize: "14px",
		margin: 0,
		"&:hover": { color: "red" },
		"> i": {
			...flex(),
		},
		"&.prof": {
			fontSize: "16px",
			i: {
				fontSize: "18px",
			},
		},
	};
});

const StyledNav = styled.nav(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		minWidth: "260px",
		// "> h6.prof": {
		// 	fontSize: "18px",
		// },
	};
});

export default function Header({ children: HeaderComponent }) {
	return (
		<StyledHeader className="container-fluid">
			<div className="container m-auto row">
				<Nav />
				{HeaderComponent && <HeaderComponent />}
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		margin: "0 auto 0 auto",
		height: "50px",
		backgroundColor: "#040507",
		color: "#fff",
	};
});
