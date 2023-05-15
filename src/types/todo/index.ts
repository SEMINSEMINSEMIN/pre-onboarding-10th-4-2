export type TodoItemType = {
  title: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

type SetTodosType = React.Dispatch<React.SetStateAction<TodoItemType[]>>;
type SetFocusType = () => void;

export type InputTodoPropsType = {
  setTodos: SetTodosType;
  setFocus: SetFocusType;
};

export type TodoListPropsType = {
  todos: TodoItemType[];
  setTodos: SetTodosType;
  setInpFocus: SetFocusType;
};

export type TodoItemPropsType = {
  id: string;
  title: string;
  setTodos: SetTodosType;
  setInpFocus: SetFocusType;
};
