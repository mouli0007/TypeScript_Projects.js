import React, { ChangeEvent } from "react";
import { useState } from "react";
import { ITask } from "./interface";
import TodoTask from "./Components/TodoTask";
const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodoList] = useState<ITask[]>([
    {
      id: 88,
      taskName: "Mouli VJ is the best in the world",
      taskdeadline: 23,
    },
  ]);

  const removeTask = (id: number): void => {
    const updatedTask = todo.filter((todo) => todo.id !== id);
    setTodoList(updatedTask);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Task") {
      setTask(e.target.value);
    }
    setDeadline(+e.target.value);
  };

  const addTask = (): void => {
    const newTodo = {
      id: Math.random() * 9999,
      taskName: task,
      taskdeadline: deadline,
    };

    setTodoList((prev) => [...prev, newTodo]);
    console.log(todo);
  };

  return (
    <div className="App">
      <div className="header">
        <h2>TypeScript Todo Practise !</h2>

        <div className="inputContainer">
          <label>Task Name : </label>
          <input
            type="text"
            placeholder="Task..."
            name="Task"
            onChange={handleChange}
          />
          <label>Task Deadline : </label>

          <input
            type="number"
            placeholder="DeadLine..."
            name="Deadline"
            onChange={handleChange}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="todoList">
        {todo.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} removeTask={removeTask} setTodoList={ setTodoList} />;
        })}
      </div>
    </div>
  );
};

export default App;
