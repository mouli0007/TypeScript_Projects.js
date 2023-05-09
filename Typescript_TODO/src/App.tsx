import { useState, useEffect } from "react";
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

export interface Data {
  text: string;
  completed: boolean;
  id: number;
}

const App = () => {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<Data[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [filterTodos, setFilterTodos] = useState<Data[]>([]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
  }, [todos, status]);
  return (
    <div className="App">
      <header>
        <h2>Todo Application...</h2>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        filterTodos={filterTodos}
        setFilterTodos={setFilterTodos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default App;
