import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onDelete={() => onDelete(index)}
          onEdit={(newText) => onEdit(index, newText)}
        />
      ))}
    </div>
  );
};

export default TodoList;
