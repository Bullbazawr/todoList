import { useState } from 'react'
import { useAllTodos } from '../../hooks/useAllTodos'
import { TodaysDate } from '../Date/TodaysDate'
import { useQueryClient } from "@tanstack/react-query"
import { prevTasksPage, nextTasksPage } from '../../utils/functions/changeTasksPage'
import { Weather } from '../Weather/Weather'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import { TodoCreator } from '../TodoCreator/TodoCreator'


export function App() {
  // const nextTasksPageButtonElement = document.querySelector('.nextButton')
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const { data: todoItems } = useAllTodos(page)
  const pages = todoItems?.pages as number
  const { mutate: deleteTodo } = useDeleteTodo()

  function changeTasksPageHandler(e: React.MouseEvent) {
    if (e.currentTarget.textContent === 'prev') {
      setPage(prevTasksPage(page))
      setTimeout(() => {
        queryClient.invalidateQueries()
      }, 100)
    }
    if (e.currentTarget.textContent === 'next') {
      setPage(nextTasksPage(page, pages))
      setTimeout(() => {
        queryClient.invalidateQueries()
      }, 100)
    }
  }


  // if (pages === 0) {
  //   if (nextTasksPageButtonElement) {
  //     nextTasksPageButtonElement.setAttribute('disabled', 'disabled')
  //   }
  // }

  return (
    <div className='homePageContainer'>
      <div className='homePageHeader'>
        <TodaysDate />
        <Weather />
      </div>
      <div className='midleContainer'>
        <div className='todosListContainer'>
          <h2 className='todoListTitle'>Today tasks:</h2>
          <ul className='todoList'>
            {todoItems?.data.length ? todoItems?.data.map((todo) => (
              <li className='todoListElement'
                key={todo.id} >
                <p>{todo.startTime}__{todo.endTime}</p> <p className='todoTitle'>{todo.title}</p>
                <button className='deleteTodoButton' onClick={() => deleteTodo(todo.id)}>Delete</button></li>
            )) : <p>No tasks today! </p>}

          </ul>
          <div className='changeTasksPageConteiner'>
            <button className='prevButton' onClick={changeTasksPageHandler}>prev</button>
            <p className='pageNumber'>{page}</p>
            <button className='nextButton' onClick={changeTasksPageHandler}>next</button>
          </div>
        </div>
        <TodoCreator />
      </div>
    </div >
  )
}