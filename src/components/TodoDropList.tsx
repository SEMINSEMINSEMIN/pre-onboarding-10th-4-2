import { TodoDropListPropsType } from "../types/todo";

const TodoDropList: React.FC<TodoDropListPropsType> = ({
  recommendResult,
  handleItemClick,
  originText,
}) => {
  const recommendList = recommendResult.length
    ? recommendResult.map((item: string, idx: number) => (
        <li key={idx} onClick={() => handleItemClick(item)}>
          {item}
        </li>
      ))
    : "";

  return <>{recommendList}</>;
};

export default TodoDropList;
