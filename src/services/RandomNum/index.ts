// Sinh số ngẫu nhiên từ 1 đến 100
export const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100) + 1;
  };
  
  // Kiểm tra kết quả đoán
  export const checkGuess = (guess: number, target: number): string => {
    if (guess < target) return "Bạn đoán quá thấp!";
    if (guess > target) return "Bạn đoán quá cao!";
    return "🎉 Chúc mừng! Bạn đã đoán đúng!";
  };
  