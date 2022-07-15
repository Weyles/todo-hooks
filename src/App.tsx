import React from "react";
import { TodoProvider } from "./components/TodoContext";
import Todos from "./components/Todos";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="container">
        <div className="title">
          <h1>Todo App</h1>
        </div>
        <Todos />
      </div>
    </TodoProvider>
  );
};

export default App;
