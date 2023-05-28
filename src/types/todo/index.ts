import React from "react";

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

export type RecommendDataType = {
  q: string;
  total: number;
  page: number;
  limit: number;
  result: string[];
};

type RecommendDataStateType = {
  recommendData: RecommendDataType;
  setRecommendData: React.Dispatch<React.SetStateAction<RecommendDataType>>;
};

export type TodoDropDownPropsType = {
  recommendDataState: RecommendDataStateType;
  handleDropDownClick: (item: string) => Promise<void>;
  inpText: string;
};

export type TodoDropListPropsType = {
  recommendResult: string[];
  handleItemClick: (item: string) => Promise<void>;
  originText: string | undefined;
};

export type TodoHighLightedType = {
  originText: string;
  target: string;
};
