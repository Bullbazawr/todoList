
import todoService from '../services/todo.service'
import { useQuery } from '@tanstack/react-query'



export const useAllTodos = (page: number) => {
    return useQuery({
        queryKey: ['allTodos'],
        queryFn: () => {
            return todoService.getTodaysTodos(page)
        },
        select: ({ data }) => data
    })
}