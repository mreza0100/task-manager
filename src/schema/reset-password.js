import { phoneRegExp } from "./regExp";
import * as yup from "yup";

export const step1 = {
	intialValues: { mobile: "" },
	schema: yup.object({
		mobile: yup
			.string()
			.trim()
			.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
			.min(11, "حداقل ۱۱ رقم")
			.max(11, "حداکثر ۱۱ رقم")
			.required("شماره تلفن الزامی میباشد"),
	}),
};
export const step2 = {
	intialValues: { password: "", confirmPassword: "" },
	schema: yup.object({
		password: yup
			.string()
			.trim()
			.min(8, "حداقل ۸ کاراکتر")
			.required("نوشتن پسورد جدید و تایید اجباری میباشد"),
		confirmPassword: yup
			.string()
			.trim()
			.oneOf([yup.ref("password"), null], "پسورد ها یکی نمیباشد")
			.required("نوشتن پسورد جدید و تایید اجباری میباشد"),
	}),
};

// export const step_1 = {
// 	dataInputs: [{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" }],
// 	validation: yup.object({
// 		mobile: yup
// 			.string()
// 			.trim()
// 			.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
// 			.min(11)
// 			.max(11)
// 			.required(),
// 	}),
// 	async handleSubmit(data) {
// 		try {
// 			const res = await _USE_API_({
// 				ignoreStatuses: [401],
// 				describe: "reset password step 1",
// 			}).Post({
// 				url: "forgot_password",
// 				data,
// 			});
// 			return res.status;
// 		} catch (err) {
// 			if (!isUndefined(err.response) && err.response.status === 401)
// 				showMsg(
// 					{ title: { text: "این شماره در سیستم ثبت نشده است" } },
// 					{ time: 6, status: "warning" }
// 				);
// 			return 0;
// 		}
// 	},
// };

// export const step_2 = {
// 	dataInputs: [
// 		{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" },
// 		{
// 			name: "activisionCode",
// 			label: "کد فرستاده شده به شماره شما",
// 			type: "text",
// 			auto: "off",
// 		},
// 		{
// 			name: "newPassword",
// 			label: "پسورد جدید",
// 			type: "password",
// 			auto: "off",
// 		},
// 		{
// 			name: "confirmNewPassword",
// 			label: "تایید پسورد",
// 			type: "password",
// 			auto: "off",
// 		},
// 	],
// 	validation: yup.object({
// 		mobile: yup
// 			.string()
// 			.trim()
// 			.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
// 			.min(11)
// 			.max(11)
// 			.required(),
// 		activisionCode: yup
// 			.number()
// 			.test("len", "Must be exactly 4 characters", val => (val ? val.toString().length === 4 : true))
// 			.required(),
// 		newPassword: yup.string().trim().min(8).required(),
// 		confirmNewPassword: yup
// 			.string()
// 			.trim()
// 			.oneOf([yup.ref("newPassword"), null], "Passwords must match")
// 			.required(),
// 	}),
// 	async handleSubmit(data, { setSubmitting }) {
// 		const backToLogin = () => Router.push(login);

// 		try {
// 			const res = await _USE_API_({
// 				pendingID: "reset-password",
// 				describe: "reset password step 2",
// 				ignoreStatuses: [401],
// 				debug: false,
// 			}).Post({ url: "/reset_password", data });
// 			console.log(res);
// 			if (res.status === 200) {
// 				deleteCookie("token");
// 				showMsg(
// 					{
// 						title: {
// 							text: "گذرواژه شما با موفقیت عوض شد",
// 						},
// 						body: { text: "در حال برگشت به صفحه ورود" },
// 					},
// 					{ time: 3, status: "success" },
// 					backToLogin
// 				);
// 			}
// 		} catch (err) {
// 			if (err.response.status === 401) {
// 				showMsg(
// 					{
// 						title: { text: "کد اشتباه است" },
// 					},
// 					{ time: 8, status: "warning" }
// 				);
// 			}
// 		} finally {
// 			setSubmitting(false);
// 		}
// 	},
// };
