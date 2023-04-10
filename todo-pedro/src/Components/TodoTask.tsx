import React, { ReactNode } from "react";
import { ITask } from "../interface";

interface Props {
  task: ITask;
  removeTask: (id: number) => void;
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const TodoTask = ({ task, removeTask, setTodoList }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <h3>{task.taskName}</h3>
        <span>{task.taskdeadline}</span>
      </div>
      <button onClick={() => removeTask(task.id)}>Remove </button>
      <button onClick={() => setTodoList([])}>Clear All Task</button>
    </div>
  );
};

export default TodoTask;
