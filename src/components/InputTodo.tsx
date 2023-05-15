import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  Ref,
} from "react";

import { createTodo } from "../api/todo";
import { searchRecommendation } from "../api/search";

import useDebounce from "../hooks/useDebounce";

import { InputTodoPropsType } from "../types/todo";

const InputTodo = forwardRef<HTMLInputElement, InputTodoPropsType>(
  ({ setTodos, setFocus }, ref: Ref<HTMLInputElement>) => {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setFocus();
    }, [setFocus]);

    const showRecommendation = useCallback(async (text: string) => {
      const { data: recommendData } = await searchRecommendation(text, 1);

      // TODO: recommendData를 드롭다운에 보여줘야 함.
      // 아래 코드 삭제 예정
      console.info(recommendData);
    }, []);

    useDebounce(inputText, showRecommendation);

    const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    };

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        try {
          e.preventDefault();
          setIsLoading(true);

          const trimmed = inputText.trim();
          if (!trimmed) {
            return alert("Please write something");
          }

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
          onChange={handleInpChange}
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
