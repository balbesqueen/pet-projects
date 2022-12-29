import React, { useState } from 'react'
import Todo from './components/Todo'
import { ITodo } from './intefaces'

const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  const [displayMode, setDisplayMode] = useState<string>('all')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!todo || !todo.trim()) {
      alert('Todo task cannot be empty')
      return
    }
    
    setTodos([...todos, {
      id: new Date().getTime(),
      content: todo.trim(),
      checked: false
    }])

    setTodo('')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value)
  }

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>, item: ITodo) {
    setTodos(todos.map(i => {
      if (item === i) {
        i.checked = e.target.checked
        return i
      }
      
      return i
    }))
  }

  return (
    <div className="max-w-xl p-10 mx-auto">
      <h1 className="mb-2">To-Do React App</h1>
      <div className="p-2 bg-white border rounded">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
          <input type="text" className="flex-grow p-1 border rounded outline-none bg-gray-50" required value={todo} onChange={handleChange} />
          <button type="submit" className="px-4 py-1 font-semibold text-white rounded bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-500">Add</button>
        </form>
        <div className="flex gap-2 py-2">
          <label className="flex gap-1 items-center">
            <input type="radio" name="displayMode" value="all" checked={displayMode == 'all'} onChange={() => setDisplayMode('all')} />
            <span>All</span>
          </label>
          <label className="flex gap-1 items-center">
            <input type="radio" name="displayMode" value="checked" checked={displayMode == 'checked'} onChange={() => setDisplayMode('checked')} />
            <span>Checked only</span>
          </label>
          <label className="flex gap-1 items-center">
            <input type="radio" name="displayMode" value="unchecked" checked={displayMode == 'unchecked'} onChange={() => setDisplayMode('unchecked')} />
            <span>Unchecked only</span>
          </label>
        </div>
      </div>
      <ul className="list-none p-2 bg-white border rounded mt-2">
          {todos.filter(item => displayMode == 'all' || (displayMode == 'checked' ? item.checked : !item.checked)).sort((a, b) => Number(a.checked) - Number(b.checked)).map((item, index) => (
            <Todo key={`todo-${index}`} todo={item} handleCheck={handleCheck}></Todo>
          ))}
        </ul>
    </div>
  )
}

export default App
