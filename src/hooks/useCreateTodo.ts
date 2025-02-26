import { useQueryClient, useMutation } from '@tanstack/react-query'
import todoService from '../services/todo.service'

export const useCreateTodo = (title: string, startTime: string, endTime: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => await todoService.createTodo(title, startTime, endTime),
        onSuccess: () => queryClient.invalidateQueries(),

    })
}