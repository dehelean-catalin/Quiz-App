import * as yup from "yup";

const REQUIRED_MESSAGE = "Required";
const PASSWORD_MESSAGE = "Password must be at least 8 characters";

export const registerSchema = yup
	.object({
		firstName: yup.string().trim().required(REQUIRED_MESSAGE),
		lastName: yup.string().trim().required(REQUIRED_MESSAGE),
		email: yup.string().email("Invalid format").required(REQUIRED_MESSAGE),
		password: yup.string().min(8, PASSWORD_MESSAGE).required(),
		confirmPassword: yup
			.string()
			.min(8, PASSWORD_MESSAGE)
			.oneOf([yup.ref("password")], "Passwords must match")
			.required(REQUIRED_MESSAGE),
	})
	.required(REQUIRED_MESSAGE);

export type RegiserFormData = yup.InferType<typeof registerSchema>;
