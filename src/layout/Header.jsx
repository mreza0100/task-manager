import { useRouter } from "next/router";
import styled from "styled-components";
import { useMemo } from "react";
import Link from "next/link";

const menuData = [
	{
		isComponent: false,
		id: "top-header",
		svg: require("../assets/svg/top-header.svg"),
	},
	{
		isComponent: false,
		route: "/setting/profile",
		id: "prof-icon",
		className: "fa fa-user-o",
	},
	{
		isComponent: false,
		route: "/",
		svg: require("../assets/svg/tasks.svg"),
	},
];

export default function Header() {
	const router = useRouter();
	const url = router.route;

	return useMemo(() => {
		return (
			<StyledHeader>
				<StyledUl>
					{menuData.map(
						(
							{ route, label, isComponent, id = null, svg, className, jsx },
							idx
						) => {
							if (isComponent) return jsx({ key: idx });
							return (
								<Link href={route || url} key={idx}>
									<StyledLi
										selectedMe={url === route}
										id={id}
										className={className || null}
									>
										{svg && <img src={svg} />}
										{label && label}
									</StyledLi>
								</Link>
							);
						}
					)}
				</StyledUl>
			</StyledHeader>
		);
	}, [url]);
}

const StyledLi = styled.li(({ theme: { flex, $blue }, selectedMe }) => {
	return {
		...flex(),
		width: "100%",
		height: "70px",
		fontSize: "18px",
		color: selectedMe ? $blue : "black",
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
			background: $blue,
			cursor: "default",
		},
	};
});

const StyledHeader = styled.header(({ theme: { flex, $blue } }) => {
	return {
		width: 70,
		height: "100%",
		height: "max-content",
		borderLeft: "1px solid #DDDFFF",
	};
});
