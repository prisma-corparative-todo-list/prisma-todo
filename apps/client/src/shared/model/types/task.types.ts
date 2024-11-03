import { boolean, object, string, InferType } from "yup";





export const CreateTaskSchema = object({
    title: string().required(),
    description: string().optional(),
    listId: string().optional(),
    deadLine: string().optional(),
    isImportant: boolean().optional(),
    isToday: boolean().optional(),
})

export type ICreateTaskDto = InferType<typeof CreateTaskSchema>