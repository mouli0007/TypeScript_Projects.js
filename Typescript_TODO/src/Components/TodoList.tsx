import Todo from "./Todo";
import { Data } from "../App";

interface PROPS {
  todos: Data[];
  filterTodos: Data[];
  setFilterTodos: React.Dispatch<React.SetStateAction<Data[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Data[]>>;
}

const TodoList = ({ todos, setTodos, filterTodos }: PROPS) => {
  console.log(todos);
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filterTodos.map((todo: Data) => {
          return (
            <Todo key={todo.id} {...todo} todos={todos} setTodos={setTodos} />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
