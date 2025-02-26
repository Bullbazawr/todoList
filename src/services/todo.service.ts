import axios from 'axios'
import { ITodo } from '../interfaces/todo.interface'
import { PaginatedResult } from '../interfaces/todo.interface'

class TodoService {
    private URL = 'http://localhost:3000'
    private days = ['sunday', 'moonday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    private dayOfWeek = this.days[new Date().getDay()]

    timeToMinutes = (startTime: string) => {
        const [hours, minutes] = startTime.split(':').map(Number)
        return hours * 60 + minutes
    }

    async getAllTodos(page: number) {
        return await axios.get<PaginatedResult<ITodo>>(`${this.URL}/todos?_page=${page}&_per_page=7`)
    }

    async getTodaysTodos(page: number) {
        return await axios.get<PaginatedResult<ITodo>>(`${this.URL}/${this.dayOfWeek}?_page=${page}&_per_page=7&_sort=startTime&_order=asc`)
    }

    async createTodo(title: string, startTime: string, endTime: string) {
        return axios.post<any, any, ITodo>(`${this.URL}/${this.dayOfWeek}/`, {
            id: Date.now().toString(),
            startTime,
            endTime,
            title,
            completed: false
        })
    }
    async updateTodo(todo: ITodo) {
        return await axios.put<ITodo>(`${this.URL}/${this.dayOfWeek}/${todo.id}`, todo)
    }
    async deleteTodo(id: string) {
        return await axios.delete(`${this.URL}/${this.dayOfWeek}/${id}`)
    }
}

export default new TodoService()