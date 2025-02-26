export interface ITodo {
    id: string
    title: string
    startTime: string
    endTime: string
    completed: boolean
}

export interface ICreateTodo extends Omit<ITodo, 'id'> { }

export interface PaginatedResult<T> {
    data: T[]
    first: number
    last: number | null
    prev: number | null
    next: number | null
    pages: number
    items: number
}