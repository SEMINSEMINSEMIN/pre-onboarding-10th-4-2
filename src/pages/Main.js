import { useEffect, useState } from "react";

import Header from "../components/Header";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { getTodoList } from "../api/todo";
import useFocus from "../hooks/useFocus";

const Main = () => {
  const [todoListData, setTodoListData] = useState([]);
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
