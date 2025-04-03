import React, { useState } from "react";
import { GuessGame } from "@/models/randomnumber";
import { generateRandomNumber, checkGuess } from "@/services/RandomNum";

const GuessNumber: React.FC = () => {
  // Khởi tạo state cho trò chơi
  const [game, setGame] = useState<GuessGame>({
    targetNumber: generateRandomNumber(),
    attemptsLeft: 10,
    guessHistory: [],
    message: "Hãy nhập số bạn đoán!",
  });

  const [currentGuess, setCurrentGuess] = useState<string>("");

  // Xử lý khi người chơi đoán
  const handleGuess = () => {
    const guess = parseInt(currentGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setGame((prev) => ({ ...prev, message: "Vui lòng nhập số từ 1 đến 100!" }));
      return;
    }

    const newHistory = [...game.guessHistory, guess];
    const newAttemptsLeft = game.attemptsLeft - 1;
    const resultMessage = checkGuess(guess, game.targetNumber);

    if (resultMessage.includes("Chúc mừng")) {
      setGame({ ...game, message: resultMessage, guessHistory: newHistory });
    } else if (newAttemptsLeft === 0) {
      setGame({
        ...game,
        message: `❌ Bạn đã hết lượt! Số đúng là ${game.targetNumber}.`,
        attemptsLeft: 0,
        guessHistory: newHistory,
      });
    } else {
      setGame({
        ...game,
        attemptsLeft: newAttemptsLeft,
        guessHistory: newHistory,
        message: resultMessage,
      });
    }

    setCurrentGuess(""); // Reset input sau mỗi lượt đoán
  };

  // Chơi lại
  const handleRestart = () => {
    setGame({
      targetNumber: generateRandomNumber(),
      attemptsLeft: 10,
      guessHistory: [],
      message: "Hãy nhập số bạn đoán!",
    });
    setCurrentGuess("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎮 Trò Chơi Đoán Số</h1>

      <p>{game.message}</p>
      <p>Lượt còn lại: {game.attemptsLeft}</p>

      {game.attemptsLeft > 0 && !game.message.includes("Chúc mừng") ? (
        <>
          <input
            type="number"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            placeholder="Nhập số (1-100)"
          />
          <button onClick={handleGuess} style={{ marginLeft: "10px" }}>
            Đoán
          </button>
        </>
      ) : (
        <button onClick={handleRestart}>🔄 Chơi lại</button>
      )}

      <h3>Lịch sử các lượt đoán:</h3>
      <ul>
        {game.guessHistory.map((guess, index) => (
          <li key={index}>Lượt {index + 1}: {guess}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuessNumber;
