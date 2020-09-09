import { phoneRegExp } from "./regExp";
import * as yup from "yup";

const logInSchema = yup.object({
	mobile: yup
		.string()
		.trim()
		.min(11, "حداقل ۱۱ شماره")
		.max(11, "حداکثر ۱۱ شماره")
		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
		.required("شماره تلفن الزامی میباشد"),
	password: yup.string().trim().min(8, "رمز عبور حداقل ۸ کاراکتر").required("رمز عبور الزامی میباشد"),
});

export const loginInitialValues = { mobile: "", password: "" };

export default logInSchema;
