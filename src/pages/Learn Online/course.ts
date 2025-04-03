export interface Course {
    id: string;
    name: string;
    instructor: string;
    students: number;
    status: 'Đang mở' | 'Đã kết thúc' | 'Tạm dừng';
  }
  