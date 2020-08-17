import { useRouter } from "next/router";
import styled from "styled-components";
import { useMemo } from "react";
import Link from "next/link";

const menuData = [
	{
		isComponent: true,
		jsx: ({ key }) => {
			return (
				<li key={key} id="top-header">
					<img src="top-header.svg" />
				</li>
			);
		},
	},
	{
		isComponent: true,
		jsx: ({ key }) => {
			return (
				<Link key={key} href="/setting/profile">
					<li id="prof-icon">
						<i className="fa fa-user" />
					</li>
				</Link>
			);
		},
	},
];

export default function Header({}) {
	const router = useRouter();
	const url = router.route;
	return useMemo(() => {
		return (
			<StyledHeader>
				<StyledUl>
					{menuData.map(({ route, label, isComponent, jsx }, idx) => {
						if (isComponent) return jsx({ key: idx });
						return (
							<Link href={route} key={route}>
								<StyledLi selectedMe={url === route}>{label}</StyledLi>
							</Link>
						);
					})}
				</StyledUl>
			</StyledHeader>
		);
	}, [url]);
}

const StyledUl = styled.ul(({ theme: { flex, $blue, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flexDirection: "column",
		backgroundColor: $white,
		width: "100%",
		height: "100vh",
		"> #top-header": {
			...flex(),
			width: "100%",
			height: "50px",
			background: $blue,
			border: "1px solid #DDDFFF",
		},
		"> #prof-icon": {
			...flex(),
			width: "100%",
			height: "50px",
			fontSize: "18px",
		},
	};
});

const StyledHeader = styled.header(({ theme: { flex, $blue } }) => {
	return {
		width: 71,
		height: "100%",
		height: "max-content",
		borderLeft: "1px solid #DDDFFF",
	};
});
