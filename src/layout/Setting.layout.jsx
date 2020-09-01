import { flex, deleteCookie } from "../helpers/exports";
import Router, { useRouter } from "next/router";
import showMsg from "../helpers/alerts/msg";
import { useSelector } from "react-redux";
import LayoutWrapper from "./Main.lauout";
import ask from "../helpers/alerts/ask";
import styled from "styled-components";
import { useMemo } from "react";
import Link from "next/link";

function handleLogout() {
	ask(
		{
			title: { text: "آیا از خروج مطمعن هستید" },
			btn1: { attrs: { class: "btn btn-warning pr-4 pl-4" } },
			btn2: { attrs: { class: "btn btn-success pr-4 pl-4" } },
		},
		{ status: "danger" }
	)
		.then(ok => {
			if (ok) {
				deleteCookie("token");
				const backToLogin = () => Router.push("/register-progsess/login");
				showMsg(
					{ title: { text: "برگشت به صفحه ورود" } },
					{ time: 3, status: "warning" },
					backToLogin
				);
			} else {
			}
		})
		.catch(why => {
			console.log(why);
		});
}

const menuData = [
	{
		isComponent: true,
		jsx: ({ name, family }) => (
			<StyledProf className="row" key="profile">
				<i className="fa fa-user col-2" />
				<span className="col-7">
					<h6>{name}</h6>
					<p>{family}</p>
				</span>
			</StyledProf>
		),
	},
	{
		isComponent: false,
		label: "پروفایل",
		route: "/setting/profile",
	},
	{
		isComponent: false,
		label: "تغییر گذرواژه",
		route: "/setting/reset-password",
	},
	{
		isComponent: false,
		label: "مخاطبین",
		route: "/setting/people",
	},
	{
		isComponent: true,
		jsx: () => (
			<LogoutItem className="row p-3" key="logout" onClick={handleLogout}>
				<i className="fa fa-power-off col-4" />
				<span className="col">خروج</span>
			</LogoutItem>
		),
	},
];

function Menu(props) {
	// TODO: make a component for prof img header and here
	const { name, family } = useSelector(state => state.profile);
	const router = useRouter();
	const url = router.route;
	return useMemo(() => {
		return (
			<StyledUl>
				{menuData.map(({ route, label, isComponent, jsx }) => {
					if (isComponent) return jsx({ name, family });
					return (
						<Link href={route} key={route}>
							<StyledLi selectedMe={url === route}>{label}</StyledLi>
						</Link>
					);
				})}
			</StyledUl>
		);
	}, [name, family, url]);
}

const LogoutItem = styled.li(props => {
	return {
		width: "100%",
		height: "auto",
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		padding: "4% 3%",
		textAlign: "center",
		cursor: "pointer",
		borderTop: "0.5px solid black",
		i: {
			transition: "all 1s",
			fontSize: 18,
		},
		"&:hover": {
			i: { color: "red" },
		},
	};
});

const StyledProf = styled.li(props => {
	return {
		width: "100%",
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		height: "auto",
		padding: "10px 0",
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

export const StyledLi = styled.li(({ selectedMe: s, extraStyles = {} }) => {
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

export default function SettingLayout({ children, extraClass, styles }) {
	return (
		<LayoutWrapper>
			<StyledMain className="container-fluid row">
				<div className="col-sm-3">
					<Menu />
				</div>
				<ChildrenWrapper styles={styles} className={`col-sm-8 ${extraClass || ""}`}>
					{children}
				</ChildrenWrapper>
			</StyledMain>
		</LayoutWrapper>
	);
}

const ChildrenWrapper = styled.div(({ styles }) => {
	return styles || {};
});

const StyledMain = styled.main(props => {
	return {
		justifyContent: "space-between",
		height: "auto",
		margin: "20px auto 0 auto",
	};
});
