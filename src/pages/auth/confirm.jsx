import { serverRedirect, getCookie, deleteCookie, reloadRouter } from "../../helpers/exports";
import CodeInput from "../../components/CodeInput";
import AuthLayout from "../../layout/Auth.layout";
import { _USE_API_ } from "../../api/index.API";
import showMsg from "../../helpers/alerts/msg";
import { register } from "../../routes";
import { Content } from "./login";
import { useState } from "react";
import Link from "next/link";

const onResendCode = async mobile => {
	const data = { mobile };

	try {
		const res = await _USE_API_({
			describe: "resend confirm account code",
			kickOn401: false,
			debug: true,
		}).Post({ url: "resend_activation_code", data });
		if (res.status === 200) reloadRouter();
	} catch (err) {
		Router.push(register);
	}
};

const handleSubmit = async ({ code, mobile }) => {
	const data = { activation_code: code, mobile };
	// data is "1234"
	try {
		const res = await _USE_API_({
			describe: "confirm creating account",
			ignoreStatuses: [401],
			kickOn401: false,
			debug: true,
		}).Post({ url: "active_account", data });
		if (res.status === 200) {
			deleteCookie("mobile");
			Router.push(login);
		}
	} catch (err) {
		showMsg({ title: { text: "کد اشتباه است" } }, { status: "danger", time: 6 });
	}
};

export default function Confirm({ mobile }) {
	const [codes, setCodes] = useState({});

	const onSubmitClick = () => {
		if (codes.length === 4) handleSubmit({ code: codes, mobile });
	};

	return (
		<AuthLayout>
			<Content>
				<h1>تایید شماره همراه</h1>
				<form>
					<CodeInput
						getCodesOnCompilate={code => {
							console.log(codes);
							handleSubmit({ code, mobile });
						}}
						codes={codes}
						setCodes={setCodes}
					/>

					<a onClick={() => onResendCode(mobile)}>ارسال مجدد کد تایید</a>

					<div id="btns">
						<Link href={register}>
							<button type="button" id="first">
								<a>تغییر شماره همراه</a>
							</button>
						</Link>
						<button type="button" id="second" onClick={onSubmitClick}>
							تایید و ورود
						</button>
					</div>
				</form>
			</Content>
		</AuthLayout>
	);
}

Confirm.getInitialProps = ({ req, res }) => {
	const cookies = process.browser ? document.cookie : req.headers.cookie;
	const mobile = getCookie({ cookies, key: "mobile" });
	if (!mobile) serverRedirect({ res, route: register });
	return { mobile };
};
