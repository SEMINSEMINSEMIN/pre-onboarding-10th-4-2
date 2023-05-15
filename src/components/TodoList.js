import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos, setInpFocus }) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          setTodos={setTodos}
          setInpFocus={setInpFocus}
        />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
