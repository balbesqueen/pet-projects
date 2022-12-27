import { ITodo } from "../intefaces"

interface Props {
    todo: ITodo,
    handleCheck(e: React.ChangeEvent<HTMLInputElement>, todo: ITodo): void
}

const Todo = ({todo, handleCheck}: Props) => (
    <li className="p-1">
        <label className="flex gap-1">
            <input type="checkbox" checked={todo.checked} onChange={(e) => handleCheck(e, todo)} />
            <span className={`${todo.checked && 'line-through'}`}>{todo.content}</span>
        </label>
    </li>
)

export default Todo