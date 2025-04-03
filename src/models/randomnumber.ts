export interface GuessGame {
    targetNumber: number;  // Số ngẫu nhiên cần đoán
    attemptsLeft: number;  // Số lượt đoán còn lại
    guessHistory: number[]; // Lịch sử các lượt đoán
    message: string;       // Thông báo kết quả
  }
  