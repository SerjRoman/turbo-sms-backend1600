import * as yup from "yup";

export const paginationSchema = yup.object({
	page: yup.number().default(1).notRequired().optional(),
	take: yup.number().default(15).notRequired().optional(),
});

export type PaginationParams = yup.InferType<typeof paginationSchema>;

export interface PaginationData  {
    totalPages: number
    page: number
    take: number 
}

export interface PaginatedResponse<T> {
    data: T[]
    meta: PaginationData 
}