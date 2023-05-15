import React from "react";
import { TodoDropDownPropsType } from "../types/todo";

const TodoDropDown: React.FC<TodoDropDownPropsType> = ({
  recommendData,
  handleDropDownClick,
}) => {
  if (recommendData) {
    const { result, total } = recommendData;
    const recommendList = result.map((item: string, idx: number) => (
      <li key={idx} onClick={() => handleDropDownClick(item)}>
        {item}
      </li>
    ));

    return total ? <ul>{recommendList}</ul> : <div>no recommendation</div>;
  }

  return <div></div>;
};

export default TodoDropDown;
