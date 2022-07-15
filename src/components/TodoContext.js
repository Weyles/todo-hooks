import axios from "axios";
import React, { useContext, createContext, useState } from "react";

const TodoContext = createContext(null);

function useTodo() {
  const {
    load,
    AxiosRequest,
    todos,
    handleInput,
    deleteTodo,
    handleDone,
    loadTodos,
  } = useContext(TodoContext);
  return {
    load,
    AxiosRequest,
    todos,
    handleInput,
    deleteTodo,
    handleDone,
    loadTodos,
  };
}

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState("");

  const getTime = () => {
    const date = new Date();
    const timeID = date.getTime();
    return timeID;
  };

  const AxiosRequest = (todos) => {
    axios
      .post(
        "https://todo-c8442-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
        todos
      )
      .then(function (response) {
        setLoad(getTime());
        // TODO: check this
        console.log("API response -->", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadTodos = (api) => {
    setTodos(api);
  };

  const deleteTodo = (id) => {
    axios
      .delete(
        `https://todo-c8442-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
      )
      .then(function (response) {
        setLoad(getTime());
        // TODO: And this
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDone = (id) => {
    const allTodos = [...todos];

    allTodos.map((todo) => {
      if (todo.id === id) {
        Promise.all([
          axios.delete(
            `https://todo-c8442-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
          ),
          axios.post(
            "https://todo-c8442-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
            {
              title: todo.title,
              isDone: !todo.isDone,
            }
          ),
        ])
          .then(() => {
            setLoad(getTime());
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return todo;
    });
    console.log("DELETE -->", todos);
  };
  return (
    <TodoContext.Provider
      value={{ load, AxiosRequest, todos, deleteTodo, handleDone, loadTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, useTodo };
