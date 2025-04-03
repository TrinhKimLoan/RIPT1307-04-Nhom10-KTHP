// src/pages/TodoList/index.tsx
import React, { useState, useEffect } from "react";
import { Todo } from "@/models/todolist";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/services/ToDoList";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Omit<Todo, "id" | "isEdit">>({
    name: "",
    description: "",
  });

  // Load danh sách todo khi component mount
  useEffect(() => {
    setTodos(getTodos());
  }, []);

  // Thêm todo mới
  const handleAddTodo = () => {
    if (newTodo.name.trim()) {
      const newItem: Todo = {
        id: Date.now(),
        name: newTodo.name,
        description: newTodo.description,
        isEdit: false,
      };
      addTodo(newItem);
      setTodos(getTodos()); // Cập nhật state sau khi thêm
      setNewTodo({ name: "", description: "" }); // Reset form
    }
  };

  // Chỉnh sửa todo
  const handleEditTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
      )
    );
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = (id: number, name: string, description: string) => {
    updateTodo({ id, name, description, isEdit: false });
    setTodos(getTodos());
  };

  // Xóa todo
  const handleDeleteTodo = (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa todo này không?");
    if (confirmDelete) {
      deleteTodo(id);
      setTodos(getTodos());
    }
  };
  

  return (
    <div>
      <h1>Todo List</h1>

      {/* Form thêm mới */}
      <div>
        <input
          type="text"
          placeholder="Tên công việc"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button onClick={handleAddTodo}>Thêm Todo</button>
      </div>

      {/* Danh sách todo */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isEdit ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.name}
                  onChange={(e) => (todo.name = e.target.value)}
                />
                <input
                  type="text"
                  defaultValue={todo.description}
                  onChange={(e) => (todo.description = e.target.value)}
                />
                <button
                  onClick={() =>
                    handleSaveEdit(todo.id, todo.name, todo.description)
                  }
                >
                  Lưu
                </button>
              </>
            ) : (
              <>
                <strong>{todo.name}</strong>: {todo.description}
                <button onClick={() => handleEditTodo(todo.id)}>Chỉnh sửa</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
