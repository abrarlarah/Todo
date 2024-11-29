import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, isCompleted: false }]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index, newText) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    // Toggle the completion status of the todo item
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Manage Your Todos</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add More ToDo Names Here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onDelete={() => handleDelete(index)}
            onEdit={(newText) => handleEdit(index, newText)}
            onToggleComplete={() => handleToggleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
