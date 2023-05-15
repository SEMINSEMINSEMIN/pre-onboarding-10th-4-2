import React from "react";
import { TodoDropDownPropsType } from "../types/todo";

const TodoDropDown: React.FC<TodoDropDownPropsType> = ({ recommendData }) => {
  if (recommendData) {
    const { result, total } = recommendData;
    const recommendList = result.map((item: string, idx: number) => (
      <li key={idx}>{item}</li>
    ));

    return total ? <ul>{recommendList}</ul> : <div>no recommendation</div>;
  }

  return <div></div>;
};

export default TodoDropDown;
