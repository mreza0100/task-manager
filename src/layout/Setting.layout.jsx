import { flex, deleteCookie } from "../helpers/exports";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import showMsg from "../helpers/alerts/msg";
import ask from "../helpers/alerts/ask";
import Router from "next/router";
import Header from "./Header";
import Link from "next/link";

function handleLogout() {
	ask(
		{
			title: { text: "آیا از خروج مطمعن هستید" },
			btn1: { attrs: { class: "btn btn-warning pr-4 pl-4" } },
			btn2: { attrs: { class: "btn btn-success pr-4 pl-4" } },
		},
		{ status: "danger" },
	)
		.then(ok => {
			if (ok) {
				deleteCookie("token");
				const backToLogin = () => Router.push("/register-progsess/login");
				showMsg(
					{ title: { text: "برگشت به صفحه ورود" } },
					{ time: 3, status: "warning" },
					backToLogin,
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
			<ProfItem className="row" key="profile">
				<i className="fa fa-user col-2" />
				<span className="col-7">
					<h6>{name}</h6>
					<p>{family}</p>
				</span>
			</ProfItem>
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
		label: "شخصی سازی",
		route: "/setting/customize",
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
	const [path, setPath] = useState();
	useEffect(() => {
		setPath(Router.pathname);
	}, []);
	return (
		<StyledUl>
			{menuData.map(({ route, label, isComponent, jsx }) => {
				if (isComponent) return jsx({ name, family });
				return (
					<Link href={route} key={route}>
						<StyledLi selectedMe={path === route}>{label}</StyledLi>
					</Link>
				);
			})}
		</StyledUl>
	);
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

const ProfItem = styled.li(props => {
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

const StyledLi = styled.li(({ selectedMe: s }) => {
	return {
		width: "100%",
		...flex(["justifyContent"]),
		cursor: "pointer",
		padding: "4% 3%",
		height: "60px",
		borderRight: `5px solid ${s ? "red" : "transparent"}`,
		borderTop: "0.5px solid black",
		// borderBottom: "0.5px solid black",
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
	};
});

export default function SettingLayout(props) {
	return (
		<>
			<Header />
			<StyledMain className="container row justify-content-between">
				<div className="col-sm-3">
					<Menu />
				</div>
				<div className="col-sm-8">{props.children}</div>
			</StyledMain>
		</>
	);
}
const StyledMain = styled.main(props => {
	return {
		margin: "20px auto 0 auto",
	};
});
