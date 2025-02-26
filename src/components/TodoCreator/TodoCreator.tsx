import { useCreateTodo } from '../../hooks/useCreateTodo'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import { formatEnteringTime } from '../../utils/functions/formateEnteringTime'
export function TodoCreator() {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const { mutate: createTodo } = useCreateTodo(title, startTime, endTime)
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/


  const createTodoHandler = (e: SyntheticEvent) => {
    e.preventDefault()

    if (regex.test(startTime) && regex.test(endTime)) {
      const formattedStartTime = formatEnteringTime(startTime)
      const formattedEndTime = formatEnteringTime(endTime)
      setStartTime(formattedStartTime)
      setEndTime(formattedEndTime)
      if (title) {
        createTodo()
      } else {
        alert('Task title cannot be empty')
      }
    } else {
      alert('Invalid time format. Please use HH:MM')
    }
    setTimeout(() => {
      setTitle('')
      setEndTime('')
      setStartTime('')
    }, 100)
  }

  return (
    <div className='todoCreatorContainer'>
      <h2 className='todoCreatorTitle'>Create New Task</h2>
      <div>
        <input className='taskTitleInput' maxLength={20} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
        <div className='setTimeContainer'>
          <p>Start Time: </p>
          <input
            className='timeInput'
            value={startTime}
            type='text'
            onChange={(e) => setStartTime(e.target.value)}
            placeholder='00:00' />
          <p>End Time: </p>
          <input
            className='timeInput'
            value={endTime}
            type='text'
            onChange={(e) => setEndTime(e.target.value)}
            placeholder='00:00' />
        </div>
        <button className='createTodoButton' onClick={createTodoHandler}>Create Todo</button>
      </div>
    </div>
  )
}