



export class CreateTaskDto {
    title: string
    isImportant?: boolean
    deadLine?: Date
    listId: string
    description?: string
    isToday?: boolean
}