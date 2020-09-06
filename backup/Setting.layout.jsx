// import { getProfileData } from "../redux/actions/profile";
// import { flex, deleteCookie } from "../helpers/exports";
// import { useSelector, useDispatch } from "react-redux";
// import Router, { useRouter } from "next/router";
// import showMsg from "../helpers/alerts/msg";
// import { useMemo, useEffect } from "react";
// import LayoutWrapper from "./Main.lauout";
// import ask from "../helpers/alerts/ask";
// import styled from "styled-components";
// import Link from "next/link";
// import { Manager } from "../components/TaskManager";
// function handleLogout() {
// 	ask(
// 		{
// 			title: { text: "آیا از خروج مطمعن هستید" },
// 			btn1: { attrs: { class: "btn btn-warning pr-4 pl-4" } },
// 			btn2: { attrs: { class: "btn btn-success pr-4 pl-4" } },
// 		},
// 		{ status: "danger" }
// 	)
// 		.then(ok => {
// 			if (ok) {
// 				deleteCookie("token");
// 				const backToLogin = () => Router.push("/register-progress/login");
// 				showMsg(
// 					{ title: { text: "برگشت به صفحه ورود" } },
// 					{ time: 3, status: "warning" },
// 					backToLogin
// 				);
// 			} else {
// 			}
// 		})
// 		.catch(why => {
// 			console.log(why);
// 		});
// }

// const menuData = [
// 	{
// 		isComponent: true,
// 		jsx: ({ name, family }) => (
// 			<StyledProf className="row" key="profile">
// 				<i className="fa fa-user col-2" />
// 				<span className="col-7">
// 					<h6>{name}</h6>
// 					<p>{family}</p>
// 				</span>
// 			</StyledProf>
// 		),
// 	},
// 	{
// 		isComponent: false,
// 		label: "پروفایل",
// 		route: "/setting/profile",
// 	},
// 	{
// 		isComponent: false,
// 		label: "تغییر گذرواژه",
// 		route: "/setting/reset-password",
// 	},
// 	{
// 		isComponent: false,
// 		label: "مخاطبین",
// 		route: "/setting/contacts",
// 	},
// 	{
// 		isComponent: true,
// 		jsx: () => (
// 			<LogoutItem className="row p-3" key="logout" onClick={handleLogout}>
// 				<i className="fa fa-power-off col-4" />
// 				<span className="col">خروج</span>
// 			</LogoutItem>
// 		),
// 	},
// ];

// function Menu({ getProfile: { extraParams = [], cancel = false } = {} }) {
// 	const { name, family } = useSelector(({ profile }) => profile);
// 	const dispatch = useDispatch();
// 	const { route: currentRoute } = useRouter();

// 	useEffect(() => {
// 		if (!cancel) dispatch(getProfileData({ fields: ["name", "family", ...extraParams] }));
// 	}, [currentRoute]);

// 	return useMemo(
// 		() => (
// 			<Manager>
// 				{menuData.map(({ route, label, isComponent, jsx }) => {
// 					if (isComponent) return jsx({ name, family });
// 					return (
// 						<Link href={route} key={route}>
// 							<StyledLi selectedMe={currentRoute === route}>{label}</StyledLi>
// 						</Link>
// 					);
// 				})}
// 			</Manager>
// 		),
// 		[name, family, currentRoute]
// 	);
// }

// const LogoutItem = styled.li(props => {
// 	return {
// 		width: "100%",
// 		height: "auto",
// 		...flex(["justifyContent"]),
// 		justifyContent: "space-evenly",
// 		padding: "4% 3%",
// 		textAlign: "center",
// 		cursor: "pointer",
// 		borderTop: "0.5px solid black",
// 		i: {
// 			transition: "all 1s",
// 			fontSize: 18,
// 		},
// 		"&:hover": {
// 			i: { color: "red" },
// 		},
// 	};
// });

// const StyledProf = styled.li(props => {
// 	return {
// 		width: "100%",
// 		...flex(["justifyContent"]),
// 		justifyContent: "space-evenly",
// 		height: "auto",
// 		padding: "10px 0",
// 		pointerEvents: "none",
// 		i: {
// 			...flex(),
// 			fontSize: "18px",
// 			lineHeight: 2.5,
// 			borderRadius: "50%",
// 			backgroundColor: "red",
// 		},
// 		span: {
// 			...flex(["justifyContent"]),
// 			justifyContent: "space-evenly",
// 			alignItems: "start",
// 			flexDirection: "column",
// 			"*": {
// 				margin: 0,
// 			},
// 		},
// 	};
// });

// export const StyledLi = styled.li(({ selectedMe: s, extraStyles = {} }) => {
// 	return {
// 		width: "100%",
// 		...flex(["justifyContent"]),
// 		color: "#1b1f23",
// 		cursor: s ? "default" : "pointer",
// 		padding: "12px 16px",
// 		fontSize: "14px",
// 		borderRight: `5px solid ${s ? "red" : "transparent"}`,
// 		borderTop: "1px solid #eaecef",
// 		"&:hover": {
// 			backgroundColor: "#f6f8fa",
// 		},
// 		...extraStyles,
// 	};
// });

// export default function SettingLayout({ children, getProfile }) {
// 	return (
// 		<LayoutWrapper>
// 			<StyledMain>
// 				<ChildrenWrapper>{children}</ChildrenWrapper>
// 				<Menu getProfile={getProfile} />
// 			</StyledMain>
// 		</LayoutWrapper>
// 	);
// }

// const ChildrenWrapper = styled.div(({ styles }) => {
// 	return styles || {};
// });

// const StyledMain = styled.main(({ theme: { flex } }) => {
// 	return {
// 		...flex(["justifyContent"]),
// 		justifyContent: "space-between",
// 		flex: 1,
// 	};
// });
