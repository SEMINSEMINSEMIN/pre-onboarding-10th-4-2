import React from "react";
import TodoHighLighted from "../TodoHighlighted/TodoHighlighted";
import { TodoDropListPropsType } from "../../types/todo";
import "./TodoDropList.css";

const TodoDropList: React.FC<TodoDropListPropsType> = ({
  recommendResult,
  handleItemClick,
  originText,
}) => {
  const recommendList =
    recommendResult.length && originText
      ? recommendResult.map((item: string, idx: number) => (
          <li
            key={idx}
            onClick={() => handleItemClick(item)}
            className="dropdown-list"
          >
            <TodoHighLighted originText={originText} target={item} />
          </li>
        ))
      : "";

  return <>{recommendList}</>;
};

export default React.memo(TodoDropList);
