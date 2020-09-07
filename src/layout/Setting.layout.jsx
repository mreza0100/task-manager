import { contacts, login, profile, profileResetPassword } from "../routes";
import { getProfileData } from "../redux/actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { LeftAside } from "../components/TaskManager";
import { deleteCookie } from "../helpers/exports";
import Router, { useRouter } from "next/router";
import showMsg from "../helpers/alerts/msg";
import ask from "../helpers/alerts/ask";
import MainLayout from "./Main.lauout";
import styled from "styled-components";
import { useEffect } from "react";
import Link from "next/link";

export function handleLogout() {
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
				const backToLogin = () => Router.push(login);
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

function onEditProfile() {
	return Router.push(profile + "?edit=true");
}

const menuData = [
	{
		isComponent: false,
		text: "پروفایل",
		fontClass: "icon-prof-logo",
		route: profile,
	},
	{
		isComponent: false,
		text: "تغییر گذرواژه",
		fontClass: "icon-key",
		route: profileResetPassword,
	},
	{
		isComponent: false,
		text: "مخاطبین",
		fontClass: "fa fa-id-card",
		route: contacts,
	},
];

export default function SettingLayout({ getProfile: { extraParams = [], cancel = false } = {}, children }) {
	const { name, mobile, family } = useSelector(({ profile }) => profile);
	const dispatch = useDispatch();
	const { route: currentRoute } = useRouter();

	useEffect(() => {
		if (!cancel) dispatch(getProfileData({ fields: ["name", "family", "mobile", ...extraParams] }));
	}, [currentRoute]);

	return (
		<MainLayout>
			<StyledMain>
				<ChildrenWrapper>{children}</ChildrenWrapper>
				<LeftAside extraStyles={{ justifyContent: "flex-start" }}>
					<Container>
						<HeadProf>
							<div id="show-data">
								<i className="fa fa-user-o" />
								<div>
									<p>{name ? name + " " + family : "fetching..."}</p>
									<span>{mobile || "fetching..."}</span>
								</div>
							</div>
							<div id="controller">
								<span id="logout" onClick={handleLogout}>
									<i className="fa fa-power-off" />
								</span>
								<span id="edit" onClick={onEditProfile}>
									<img src={require("../assets/svg/pen-blue.svg")} />
								</span>
							</div>
						</HeadProf>
					</Container>
					<Line />
					<Container>
						{menuData.map(({ text, route, svgSrc, fontClass }, idx) => {
							return (
								<Link href={route} key={idx}>
									<SideItem isSelectedMe={route === currentRoute}>
										{svgSrc && <img src={svgSrc} />}
										{fontClass && <i className={fontClass} />}
										<p>{text}</p>
									</SideItem>
								</Link>
							);
						})}
					</Container>
				</LeftAside>
			</StyledMain>
		</MainLayout>
	);
}

const SideItem = styled.div(({ theme: { flex, $bolderBlue, $white }, isSelectedMe }) => {
	const selectedColor = $white;
	const unSelectedColor = $bolderBlue;
	const selectedBackground = $bolderBlue;
	const unSelectedBackground = "rgba(66, 77, 228, 0.1)";

	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flex: 1,
		height: "35px",
		marginBottom: "10px",
		borderRadius: "4px",
		cursor: "pointer",
		background: isSelectedMe ? selectedBackground : unSelectedBackground,
		color: isSelectedMe ? selectedColor : unSelectedColor,
		"i, img": {
			padding: "0 10px",
		},
	};
});

const Line = styled.span(props => {
	return {
		width: "100%",
		height: "1px",
		backgroundColor: "#F1F4F6",
		marginBottom: "30px",
	};
});

const HeadProf = styled.div(({ theme: { flex, $black } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		height: "160px",
		paddingTop: "50px",
		paddingBottom: "30px",
		"> #show-data": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			width: "50%",
			"> i": {
				...flex(),
				width: "50px",
				height: "50px",
				fontSize: "50px",
			},
			"> div": {
				textAlign: "right",
				paddingRight: "10px",
				whiteSpace: "pre",
				p: { color: "#B4BCCA", fontSize: "16px", margin: 0 },
				span: { color: $black, fontSize: "16px" },
			},
		},
		"> #controller": {
			...flex(["justifyContent"]),
			justifyContent: "flex-end",
			width: "35%",
			span: {
				...flex(),
				borderRadius: "4px",
				width: "30px",
				height: "30px",
				marginRight: "10px",
				cursor: "pointer",
				"&#logout": {
					backgroundColor: "#FBF3F4",
					color: "#FF6672",
				},
				"&#edit": {
					backgroundColor: "#F7F9FE",
				},
			},
		},
	};
});

const Container = styled.div(props => {
	return {
		width: "80%",
	};
});

const ChildrenWrapper = styled.div(({ theme: { flex } }) => {
	return {
		flex: 1,
		minHeight: "100vh ",
		padding: "15px",
		backgroundColor: "#F5F6FA",
	};
});

const StyledMain = styled.main(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flex: 1,
	};
});
