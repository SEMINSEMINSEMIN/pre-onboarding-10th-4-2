import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import InputTodo from "../../components/InputTodo/InputTodo";
import TodoList from "../../components/TodoList/TodoList";
import { getTodoList } from "../../api/todo";
import useFocus from "../../hooks/useFocus";

import { TodoItemType } from "../../types/todo";
import "./Main.css";

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoItemType[]>([]);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} setFocus={setFocus} ref={ref} />
        <TodoList
          todos={todoListData}
          setTodos={setTodoListData}
          setInpFocus={setFocus}
        />
      </div>
    </div>
  );
};

export default Main;
