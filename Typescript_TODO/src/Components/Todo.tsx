import { Data } from "../App";

interface PROPS {
  id: number;
  completed: boolean;
  text: string;
  todos: Data[];
  setTodos: React.Dispatch<React.SetStateAction<Data[]>>;
}

const Todo = ({ id, completed, text, todos, setTodos }: PROPS) => {
  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo: Data): boolean => todo.id !== id));
  };

  const completehandler = (id: number) => {
    setTodos(
      todos.map((todo: Data) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          return todo;
        }
        return todo;
      })
    );
  };

  return (
    <div className="todo">
      <li className={`todo-item ${completed ? "completed" : null}`}>{text}</li>
      <button className="complete-btn" onClick={() => completehandler(id)}>
        Check
      </button>
      <button className="trash-btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Todo;
