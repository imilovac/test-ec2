import { useEffect, useState } from "react";

import "./App.css";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

export const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(baseURL);
      setTodos(await response.json());
    }
    fetchTodos();
  }, []);

  return (
    <>
      <div className="container">
        <InputTodo setTodos={setTodos} todos={todos} />
        <ListTodos setTodos={setTodos} todos={todos} />
      </div>
    </>
  );
}

export default App;
