import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import React, { useCallback, useEffect, useState, forwardRef } from "react";

import TodoDropDown from "../TodoDropDown/TodoDropDown";
import SearchIcon from "../common/SearchIcon";

import { createTodo } from "../../api/todo";
import { searchRecommendation } from "../../api/search";

import useDebounce from "../../hooks/useDebounce";

import { MAX_SUGGESTIONS } from "../../constants";
import { InputTodoPropsType, RecommendDataType } from "../../types/todo";
import "./InputTodo.css";
import SpinnerIcon from "../common/SpinnerIcon/SpinnerIcon";

const InputTodo = forwardRef<HTMLInputElement, InputTodoPropsType>(
  ({ setTodos, setFocus }, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    const recommendInit = React.useMemo(() => {
      return {
        q: "",
        page: 1,
        limit: MAX_SUGGESTIONS,
        total: 0,
        result: [],
      };
    }, []);

    const [recommendData, setRecommendData] =
      useState<RecommendDataType>(recommendInit);

    useEffect(() => {
      setFocus();
    }, [setFocus]);

    useEffect(() => {
      function handleCilckOutside(this: HTMLElement, ev: MouseEvent) {
        const target = ev.target as HTMLElement;

        !target.matches("input") && setIsDropDownVisible(false);
      }

      document.body.addEventListener("click", handleCilckOutside);

      return () => {
        document.body.removeEventListener("click", handleCilckOutside);
      };
    }, []);

    const showRecommendation = useCallback(
      async (text: string) => {
        if (text.trim()) {
          try {
            setIsSearching(true);
            const { data } = await searchRecommendation(text, 1);
            setRecommendData(data);
          } catch (err) {
            console.warn(err);
            alert("something went wrong");
          } finally {
            setIsSearching(false);
          }
        } else {
          setRecommendData(recommendInit);
        }
      },
      [recommendInit]
    );

    useDebounce(inputText, showRecommendation);

    const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      e.target.value ? setIsDropDownVisible(true) : setIsDropDownVisible(false);
    };

    const handleInpClick = (e: React.MouseEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      target.value && setIsDropDownVisible(true);
    };

    const handleDropDownClick = useCallback(
      async (item: string) => {
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
      },
      [setTodos]
    );

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
          <SearchIcon className="search-icon" />
          <input
            className="input-text"
            placeholder="Add new todo..."
            ref={ref}
            value={inputText}
            onChange={handleInpChange}
            onClick={handleInpClick}
            disabled={isLoading}
          />
          {isSearching ? (
            <SpinnerIcon ariaLabel="Searching Items" iconType="search" />
          ) : !isLoading ? (
            <button
              className="input-submit"
              type="submit"
              aria-label="Add Item"
            >
              <FaPlusCircle className="btn-plus" />
            </button>
          ) : (
            <FaSpinner
              className="spinner search"
              aria-label="Loading"
              role="status"
            />
          )}
        </form>
        {isDropDownVisible && (
          <TodoDropDown
            recommendDataState={{ recommendData, setRecommendData }}
            handleDropDownClick={handleDropDownClick}
            inpText={inputText}
          />
        )}
      </>
    );
  }
);

export default React.memo(InputTodo);
