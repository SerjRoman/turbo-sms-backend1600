import * as yup from "yup";

export const createContactSchema = yup.object({
    localName: yup
        .string()
        .min(1, "Min length must be > 1")
        .max(100, "Max length must be < 100")
        .required("Field is required"),
    contactUserId: yup
        .string()
        .required("Field is required"),
});