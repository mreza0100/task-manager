import { useRouter } from "next/router";
import styled from "styled-components";
import { useMemo } from "react";
import Link from "next/link";

const menuData = [
	{
		isComponent: false,
		id: "top-header",
		font: "icon-header-logo",
	},
	{
		isComponent: false,
		route: "/setting/profile",
		id: "prof-icon",
		font: "fa fa-user-o",
	},
	{
		isComponent: false,
		route: "/",
		font: "icon-tasks",
	},
];

export default function Header() {
	const { route: currentRoute } = useRouter();

	return useMemo(() => {
		return (
			<StyledHeader>
				<StyledUl>
					{menuData.map(
						({ route, label, isComponent, id = null, font, className, jsx }, idx) => {
							if (isComponent) return jsx();
							return (
								<Link href={route || currentRoute} key={idx}>
									<StyledLi id={id}>{font && <i className={font} />}</StyledLi>
								</Link>
							);
						}
					)}
				</StyledUl>
			</StyledHeader>
		);
	}, [currentRoute]);
}

const StyledLi = styled.li(({ theme: { flex, $blue }, selectedMe }) => {
	return {
		...flex(),
		width: "100%",
		height: "70px",
		fontSize: "18px",
		color: $blue,
		cursor: "pointer",
	};
});

const StyledUl = styled.ul(({ theme: { flex, $blue, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flexDirection: "column",
		backgroundColor: $white,
		width: "100%",
		height: "100vh",
		margin: 0,
		"> #top-header": {
			...flex(),
			width: "100%",
			height: "70px",
			backgroundColor: $blue,
			color: $white,
			fontSize: "16px",
			cursor: "default",
			pointerEvents: "none",
			userSelect: "none",
		},
	};
});

const StyledHeader = styled.header(({ theme: { flex, $blue } }) => {
	return {
		width: 70,
		borderLeft: "1px solid #DDDFFF",
	};
});
