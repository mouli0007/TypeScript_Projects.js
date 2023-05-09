//
interface PROPS {
  todos: any[];
  inputText: string;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ setInputText, setTodos, inputText, setStatus }: PROPS) => {
  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) return;

    setTodos((todos) => [
      ...todos,
      {
        text: inputText,
        id: Date.now(),
        completed: false,
      },
    ]);

    setInputText("");
  };

  const statusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={inputText}
          onChange={inputTextHandler}
        />
        <button className="todo-button" type="submit">
          Submit
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Form;
