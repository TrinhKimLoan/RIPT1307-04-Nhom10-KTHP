// src/services/todoService.ts
import { Todo } from "@/models/todolist";

// Key lưu trữ dữ liệu trong localStorage
const TODO_KEY = "todoList";

// Lấy danh sách từ localStorage
export const getTodos = (): Todo[] => {
  const todos = localStorage.getItem(TODO_KEY);
  return todos ? JSON.parse(todos) : [];
};

// Lưu danh sách todo vào localStorage
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};

// Thêm một todo mới
export const addTodo = (todo: Todo): void => {
  const todos = getTodos();
  todos.push(todo);
  saveTodos(todos);
};

// Cập nhật một todo
export const updateTodo = (updatedTodo: Todo): void => {
  const todos = getTodos().map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  saveTodos(todos);
};

// Xóa một todo
export const deleteTodo = (id: number): void => {
  const todos = getTodos().filter((todo) => todo.id !== id);
  saveTodos(todos);
};
