import React, { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim()) {
      onEdit(newText.trim()); // Avoid empty or whitespace-only edits
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {/* Checkbox to toggle completion */}
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onToggleComplete}
        />
      </label>

      {/* Editable or static todo text */}
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter key
        />
      ) : (
        <span className={todo.isCompleted ? "completed" : ""}>{todo.text}</span>
      )}

      {/* Edit and Delete Buttons */}
      <div className="actions">
        {isEditing ? (
          <button onClick={handleSave} title="Save changes">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} title="Edit todo">
            ✏️
          </button>
        )}
        <button onClick={onDelete} title="Delete todo">
          ❌
        </button>
      </div>
    </div>
  );
};

// Prop type validation
TodoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
