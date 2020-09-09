import { phoneRegExp } from "./regExp";
import * as yup from "yup";

const registerSchema = yup.object({
	name: yup.string().trim().required("وارد کردن نام الزامی میباشد"),
	family: yup.string().trim().required("وارد کردن نام خانوادگی الزامی میباشد"),
	mobile: yup
		.string()
		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
		.min(11, "حداقل ۱۱ شماره")
		.max(11, "حداکثر ۱۱ شماره")
		.trim()
		.required("شماره تلفن الزامی میباشد"),
	password1: yup.string().trim().min(8, "رمز عبور حداقل ۸ کاراکتر").required("رمز عبور الزامی میباشد"),
	password2: yup
		.string()
		.oneOf([yup.ref("password1"), null], "رمز های عبور یکی نمیباشند")
		.required("رمز عبور الزامی میباشد"),
});

export const registerInitialValues = { name: "", family: "", mobile: "", password1: "", password2: "" };

export default registerSchema;
