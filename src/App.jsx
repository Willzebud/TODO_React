import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ListItems from "./assets/_components/ListItems";

function App() {
  const getTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const [todoList, setTodoList] = useState(getTodosFromLocalStorage);
  const [todo, setTodo] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo === "") {
      setShowValidation(true);
      return;
    }
    setTodoList([...todoList, { id: nanoid(), content: todo }]);
    setTodo("");
    setShowValidation(false);
  }

  return (
    <>
      <div className="h-screen bg-slate-900">
        <div className="max-w-4xl mx-auto pt-20 px-6">
          <h1 className="text-3xl text-slate-100 mb-4">TODO Wiwy</h1>
          <form onSubmit={handleSubmit} className="mb-10">
            <label htmlFor="todo-item" className="text-slate-50">
              Ajouter une tâche
            </label>
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              className="mt-block w-full rounded"
            />
            {showValidation && (
              <p className="text-red-400">Ajoute une tâche avant Bg</p>
            )}
            <button className="mt-4 py-2 bg-slate-50 rounded min-w[115px] px-10">
              Ajouter
            </button>
          </form>
          <ul>
            {todoList.length === 0 && (
              <li className="text-slate-50">
                Tu as tout accomplis Bg, rajoute une nouvelle tâche !
              </li>
            )}
            {todoList.map((item) => (
              <ListItems
                key={item.id}
                itemData={item}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
