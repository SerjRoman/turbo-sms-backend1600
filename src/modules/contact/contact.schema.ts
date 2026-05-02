import * as yup from "yup"

export const createContactSchema = yup.object({
    localName: yup
        .string()
        .min(4, "Довжина назви контакту повинна бути вище 4 символів")
        .max(255, "Довжина назви контакту повинна бути менша від 255 символів")
        .required("Назва контакту обов'язкова"),
    contactUserId: yup
        .string()
        .required("ID користувачу необхідний"),
});