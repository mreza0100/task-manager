import { phoneRegExp } from "./regExp";
import * as yup from "yup";

const logInSchema = yup.object({
	mobile: yup
		.string()
		.trim()
		.min(11, "حداقل ۱۱ شماره")
		.max(11, "حداکثر ۱۱ شماره")
		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
		.required("شماره تلفن ورودی الزامی میباشد"),
	password: yup.string().trim().min(8).required("رمز عبور الزامی میباشد"),
});

export default logInSchema;
