import confirmSchema, { confirmInitialValues } from "../../schema/confirm";
import { serverRedirect, getCookie, deleteCookie } from "../../helpers/exports";
import AuthLayout from "../../layout/Auth.layout";
import showMsg from "../../helpers/alerts/msg";
import { Formik, Form, Field } from "formik";
import { register } from "../../routes";
import { InputField } from "./login";
import { Content } from "./login";
import Link from "next/link";
import { _USE_API_ } from "../../api/index.API";

async function handleSubmit(data) {
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
}

export default function Confirm({ mobile, reload }) {
	const onResendCode = async () => {
		const data = { mobile };

		try {
			const res = await _USE_API_({
				describe: "resend confirm account code",
				kickOn401: false,
				debug: true,
			}).Post({ url: "resend_activation_code", data });
			if (res.status === 200) {
				reload();
			}
		} catch (err) {
			Router.push(register);
		}
	};

	return (
		<AuthLayout>
			<Content>
				<h1>تایید شماره همراه</h1>
				<Formik
					initialValues={confirmInitialValues}
					validationSchema={confirmSchema}
					onSubmit={data => {
						const sortedData = { mobile, activation_code: data.code };
						handleSubmit(sortedData);
					}}
				>
					{({ errors, touched }) => {
						const inputErr = touched["code"] && errors["code"];
						return (
							<Form>
								<InputField hasErr={!!inputErr}>
									<label>
										کد ۴ رقمی که به شماره {mobile} ارسال شده را وارد نمایید
									</label>
									<div>
										<Field type="text" name="code" />
									</div>
									<p>{inputErr || null}</p>
								</InputField>
								<a onClick={onResendCode}>ارسال مجدد کد تایید</a>

								<div id="btns">
									<Link href={register}>
										<button type="button" id="first">
											<a>تغییر شماره همراه</a>
										</button>
									</Link>
									<button type="submit" id="second">
										تایید و ورود
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
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
