import React from "react";
import Todo from "./Todo";
import { useTodo } from "./TodoContext";
import { useEffect } from "react";
import axios from "axios";
import AddTodo from "./AddTodo";

interface TodoInterface {
  isDone: boolean;
  id: string;
  title: string;
}

const Todos: React.FC = () => {
  const context = useTodo();

  useEffect(() => {
    axios
      .get(
        "https://todo-c8442-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const todos = [];
        for (const key in data) {
          const todo = {
            id: key,
            ...data[key],
          };
          todos.push(todo);
        }
        context.loadTodos(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [context.load]);

  return (
    <div>
      <div>
        <AddTodo />
      </div>
      <div className="todosContainer">
        {context.todos.map((todo: TodoInterface) =>
          todo.isDone === false ? (
            <div key={todo.id}>
              <Todo
                todo={todo}
                id={todo.id}
                deleteTodo={context.deleteTodo}
                handleDone={context.handleDone}
              />
            </div>
          ) : null
        )}
      </div>
      <div className="todosContainer">
        {context.todos.map((todo: TodoInterface) =>
          todo.isDone === true ? (
            <div key={todo.id}>
              <Todo
                todo={todo}
                id={todo.id}
                deleteTodo={context.deleteTodo}
                handleDone={context.handleDone}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Todos;
