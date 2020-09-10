import * as yup from "yup";

const confirmSchema = yup.object({
	code: yup
		.string()
		.test("number", "کد ۴ رقمی فقط از اعداد تشکیل شده است", val => (val ? !isNaN(Number(val)) : true))
		.test("len", "کد ۴ رقمی است", val => (val ? val.toString().length === 4 : true))
		.required("کد ۴ رقمی الزامی است"),
});

export const confirmInitialValues = { code: "" };

export default confirmSchema;
