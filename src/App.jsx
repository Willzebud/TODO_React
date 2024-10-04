import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/tasks"; // URL de l'API

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!inputValue) return;

    const response = await axios.post(API_URL, { text: inputValue });
    setTodos([...todos, response.data]);
    setInputValue("");
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={addTodo}>Ajouter</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id, todo.completed)}>
              Toggle
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
