import { phoneRegExp } from "./regExp";
import * as yup from "yup";

const contactsSchema = yup.object({
	name: yup.string().required().trim(),
	mobile: yup.string().matches(phoneRegExp, "Phone number is not valid").trim().required(),
});

export default contactsSchema;
export const contactsInitialValues = { name: "", mobile: "" };
