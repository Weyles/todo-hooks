import React from "react";

interface TodoInterface {
  title: string;
  isDone: boolean;
  id: any;
}

interface TodoPropsInterface {
  id: string;
  todo: TodoInterface;
  deleteTodo: any;
  handleDone: any;
}

export default function Todo(props: TodoPropsInterface) {
  const handleDelete = (id: number) => {
    props.deleteTodo(id);
  };

  const handleChange = (id: string) => {
    props.handleDone(id);
  };

  return (
    <div className="todoContainer">
      <div className="todoText">
        <div>
          <input
            onChange={() => handleChange(props.todo.id)}
            type="checkbox"
            checked={props.todo.isDone}
          />
        </div>
        <div className="todoTitle">
          {props.todo.isDone ? (
            <s>{props.todo.title}</s>
          ) : (
            <div>{props.todo.title}</div>
          )}
        </div>
      </div>
      <div>
        <button
          className="deleteButton"
          onClick={() => handleDelete(props.todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
