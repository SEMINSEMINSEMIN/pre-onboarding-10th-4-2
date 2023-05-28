import { useCallback, useState } from "react";
import DeleteIcon from "../common/DeleteIcon/DeleteIcon";
import { deleteTodo } from "../../api/todo";
import { TodoItemPropsType } from "../../types/todo";
import "./TodoItem.css";
import SpinnerIcon from "../common/SpinnerIcon/SpinnerIcon";

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
            <DeleteIcon />
          </button>
        ) : (
          <SpinnerIcon ariaLabel="On Deleting" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
