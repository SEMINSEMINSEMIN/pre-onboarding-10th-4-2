import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  Ref,
} from "react";

import { createTodo } from "../api/todo";
import { InputTodoPropsType } from "../types/todo";
import { searchRecommendation } from "../api/search";

const InputTodo = forwardRef<HTMLInputElement, InputTodoPropsType>(
  ({ setTodos, setFocus }, ref: Ref<HTMLInputElement>) => {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setFocus();
    }, [setFocus]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        try {
          e.preventDefault();
          setIsLoading(true);

          const trimmed = inputText.trim();
          if (!trimmed) {
            return alert("Please write something");
          }

          // Search API 작동 확인용 코드 시작: 추후 삭제 예정
          const { data: recommendData } = await searchRecommendation(
            "lorem",
            1
          );
          console.info(recommendData.result);
          // Search API 작동 확인용 코드 끝

          const newItem = { title: trimmed };
          const { data } = await createTodo(newItem);

          if (data) {
            return setTodos((prev) => [...prev, data]);
          }
        } catch (error) {
          console.error(error);
          alert("Something went wrong.");
        } finally {
          setInputText("");
          setIsLoading(false);
          setFocus();
        }
      },
      [inputText, setTodos, setFocus]
    );

    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        {!isLoading ? (
          <button className="input-submit" type="submit" aria-label="Add Item">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <FaSpinner className="spinner" aria-label="Loading" role="status" />
        )}
      </form>
    );
  }
);

export default React.memo(InputTodo);
