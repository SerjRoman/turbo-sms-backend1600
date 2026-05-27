import * as yup from 'yup';
export const getAllMessageSchema = yup.object({
    chatId: yup.number().required()
})