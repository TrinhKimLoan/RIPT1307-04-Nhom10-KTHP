// src/models/todolist.ts
export interface Todo {
    id: number;            // Mã định danh duy nhất cho mỗi todo
    name: string;          // Tên công việc
    description: string;   // Mô tả công việc
    isEdit: boolean;       // Trạng thái để xác định đang chỉnh sửa hay không
  }
  
