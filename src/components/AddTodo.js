import React, { useRef } from "react";
import { useTodo } from './TodoContext';

export default function AddTodo() {
  const context = useTodo()
  const titleInputRef = useRef();

  const addTodo = (event) => {
    event.preventDefault();
    const title = titleInputRef.current.value;
    if (title !== "") {
      const todo = {
        isDone: false,
        title: title,
      };
      context.AxiosRequest(todo);
      titleInputRef.current.value = "";
    }
  };

  return (
    <form className="formTodo" onSubmit={addTodo}>
      <input className="inputTodo" ref={titleInputRef} type="text" />
      <button className="addButton">Add</button>
    </form>
  );
}

