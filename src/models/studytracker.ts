// Mô hình Môn học
export interface Subject {
    id: number;
    name: string;
  }
  
  // Mô hình Tiến độ học tập
  export interface StudyProgress {
    id: number;
    subjectId: number;
    date: string;
    duration: number; // Thời lượng học (phút)
    content: string;
    notes?: string;
  }
  
  // Mô hình Mục tiêu học tập
  export interface StudyGoal {
    subjectId: number;
    dailyTarget: number; // Mục tiêu học mỗi ngày (phút)
    monthlyTarget: number; // Mục tiêu tháng (giờ)
    completedHours: number; // Giờ đã học từ StudyProgress
  }
  