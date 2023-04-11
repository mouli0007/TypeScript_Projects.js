import React, { ChangeEvent } from "react";
import { useState } from "react";

interface TODO {
  id: number;
  task?: string;
}

const App = () => {
  const [task, setTask] = useState<string | undefined>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | undefined>(0);
  const [todo, setTodo] = useState<TODO[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  const handleClick = () => {
    if (editId) {
      const updatedTodo = todo.map((to) => {
        if (to.id === editId) {
          return { ...to, task: task };
        } else {
          return to;
        }
      });
      setTask("");
      setIsEdit(false);
      setEditId(0);
      setTodo(updatedTodo);
    } else {
      const newTask: TODO = {
        id: Math.random() * 99999,
        task,
      };

      setTodo((p) => [...p, newTask]);
      setTask("");
      setIsEdit(false);
      setEditId(0);
    }
  };

  const handleRemove = (id: number) => {
    const updatedTask = todo.filter((t: TODO): any => t.id !== id);
    setTodo(updatedTask);
  };

  const handleclear = () => {
    setTodo([]);
  };

  const handleUpdate = (task: TODO) => {
    const editedTodo = todo.find((t) => t.id === task.id);
    setTask(editedTodo?.task);
    setIsEdit(true);
    setEditId(editedTodo?.id);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Your Task"
        value={task}
        onChange={handleChange}
        autoFocus
        required
        aria-label="Task Field"
      />
      <button onClick={handleClick}>{isEdit ? "Edit" : "Add"}</button>

      <div>
        {todo.map((to: TODO) => {
          return (
            <div key={to.id} className="flex_">
              <h3>{to.task}</h3>
              <button onClick={() => handleRemove(to.id)}>Remove</button>
              <button onClick={() => handleUpdate(to)}>Update</button>
            </div>
          );
        })}
      </div>
      <br />

      {todo.length === 0 ? (
        <h3>Add Your Task</h3>
      ) : (
        <button onClick={handleclear}>Clear</button>
      )}
    </div>
  );
};

export default App;
