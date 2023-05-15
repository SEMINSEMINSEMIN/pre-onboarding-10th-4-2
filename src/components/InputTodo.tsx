import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  Ref,
} from "react";

import TodoDropDown from "./TodoDropDown";

import { createTodo } from "../api/todo";
import { searchRecommendation } from "../api/search";

import useDebounce from "../hooks/useDebounce";

import { InputTodoPropsType } from "../types/todo";

const InputTodo = forwardRef<HTMLInputElement, InputTodoPropsType>(
  ({ setTodos, setFocus }, ref: Ref<HTMLInputElement>) => {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendData, setRecommendData] = useState(null);

    useEffect(() => {
      setFocus();
    }, [setFocus]);

    const showRecommendation = useCallback(async (text: string) => {
      if (text.trim()) {
        const { data: recommendData } = await searchRecommendation(text, 1);
        setRecommendData(recommendData);
        return;
      }

      if (text.length === 0) {
        setRecommendData(null);
        return;
      }
    }, []);

    useDebounce(inputText, showRecommendation);

    const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    };

    const handleDropDownClick = async (item: string) => {
      setInputText("");
      const newItem = { title: item };
      try {
        setIsLoading(true);
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data]);
        }
      } catch (error) {
        alert("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
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
      <>
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
            <button
              className="input-submit"
              type="submit"
              aria-label="Add Item"
            >
              <FaPlusCircle className="btn-plus" />
            </button>
          ) : (
            <FaSpinner className="spinner" aria-label="Loading" role="status" />
          )}
        </form>
        <TodoDropDown
          recommendData={recommendData}
          handleDropDownClick={handleDropDownClick}
        />
      </>
    );
  }
);

export default React.memo(InputTodo);
