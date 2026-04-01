import * as yup from "yup";

// email, password
export const loginSchema = yup.object({
	email: yup
		.string()
		.email("Email must be in correct format")
		.required("Field is required"),
	password: yup
		.string()
		.min(6, "Min length must be > 6")
		.max(50, "Max length must be < 50")
		.required("Field is required"),
});
// email, password, (name, surnamem, только required и string), username(min 3, max 50, required)
export const regSchema = yup.object({
	email: yup
        .string()
        .email("Email must be in correct format")
        .required("Field is required"),
	password: yup
        .string()
        .min(6, "Min length must be > 6")
        .max(50, "Max length must be < 50")
        .required("Field is required"),
	name: yup
        .string()
        .required("Field is required"),
	surname: yup
        .string()
        .required("Field is required"),
	username: yup
        .string()
        .min(3, "Min length must be > 3")
        .max(50, "Max length must be < 50")
        .required("Field is required"),
});
