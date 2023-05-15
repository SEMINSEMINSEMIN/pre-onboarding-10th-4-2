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

type RecommendDataType = {
  q: string;
  result: string[];
  qty: number;
  total: number;
  page: number;
  limit: number;
};

export type TodoDropDownPropsType = {
  recommendData: RecommendDataType | null;
  handleDropDownClick: (item: string) => Promise<void>;
};
