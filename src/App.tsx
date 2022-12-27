import { useState } from 'react'
import Todo from './components/Todo'
import { ITodo } from './intefaces'

const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value)
  }

  function handleClick() {
    if (!todo.trim()) {
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
        <div className="flex flex-wrap gap-2">
          <input type="text" className="flex-grow p-1 border rounded outline-none bg-gray-50" value={todo} onChange={handleChange} />
          <button type="submit" className="px-3 py-1 font-semibold text-white rounded bg-emerald-500" onClick={handleClick}>Add</button>
        </div>
        <ul className="my-2 list-none">
          {todos.sort((a, b) => Number(a.checked) - Number(b.checked)).map((item, index) => (
            <Todo key={`todo-${index}`} todo={item} handleCheck={handleCheck}></Todo>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App