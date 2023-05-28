import { TodoHighLightedType } from "../../types/todo";
import "./TodoHighlighted.css";

const TodoHighLighted: React.FC<TodoHighLightedType> = ({
  originText,
  target,
}) => {
  const regex = new RegExp(`(${originText})`, "gi");
  const chunks = target.split(regex);
  const newName = chunks.map((chunk, index) => {
    const isChunkSame = chunk.toLowerCase() === originText.toLowerCase();
    return (
      <span
        key={index}
        className={`span-chunk ${isChunkSame ? "highlighted" : ""}`}
      >
        {chunk}
      </span>
    );
  });

  return <>{newName}</>;
};

export default TodoHighLighted;
