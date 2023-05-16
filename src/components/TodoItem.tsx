import { FaSpinner, FaTrash } from "react-icons/fa";
import { useCallback, useState } from "react";

import { deleteTodo } from "../api/todo";
import { TodoItemPropsType } from "../types/todo";

const TodoItem: React.FC<TodoItemPropsType> = ({
  id,
  title,
  setTodos,
  setInpFocus,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      setIsLoading(false);

      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong.");
    } finally {
      setInpFocus();
    }
  }, [id, setTodos, setInpFocus]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()} aria-label="Delete Item">
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner
            className="spinner"
            aria-label="On Deleting"
            role="status"
          />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
