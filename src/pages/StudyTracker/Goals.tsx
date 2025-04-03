import React, { useState, useEffect } from 'react';
import { getSubjects, getGoals, setGoal, getProgress } from '@/services/StudyService';
import { Subject, StudyGoal, StudyProgress } from '@/models/studytracker';

const Goals: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [dailyTarget, setDailyTarget] = useState<number>(60); // Mặc định 60 phút/ngày
  const progress = getProgress();

  useEffect(() => {
    setSubjects(getSubjects());
    setGoals(getGoals());
  }, []);

  const handleAddGoal = (subjectId: number) => {
    const completedMinutes = progress
      .filter((p) => p.subjectId === subjectId)
      .reduce((sum, p) => sum + p.duration, 0);

    setGoal({
      subjectId,
      dailyTarget,
      monthlyTarget: 30 * (dailyTarget / 60), // Mục tiêu tháng = mỗi ngày * 30
      completedHours: completedMinutes / 60,
    });
    setGoals(getGoals());
  };

  return (
    <div>
      <h1>🎯 Thiết lập Mục tiêu Học tập</h1>

      <h2>📅 Thêm Mục tiêu Hàng ngày</h2>
      {subjects.map((subject) => (
        <div key={subject.id}>
          <h3>{subject.name}</h3>
          <input
            type="number"
            value={dailyTarget}
            onChange={(e) => setDailyTarget(Number(e.target.value))}
          />
          <button onClick={() => handleAddGoal(subject.id)}>Thêm Mục tiêu</button>
        </div>
      ))}

      <h2>🏆 Trạng Thái Mục tiêu</h2>
      <ul>
        {goals.map((goal) => {
          const subject = subjects.find((s) => s.id === goal.subjectId);
          const percent = ((goal.completedHours * 60) / goal.dailyTarget) * 100;

          return (
            <li key={goal.subjectId}>
              {subject?.name}: {goal.completedHours.toFixed(1)} giờ / Mục tiêu: {goal.dailyTarget} phút
              <span style={{ marginLeft: '10px', color: percent >= 100 ? 'green' : 'red' }}>
                {percent >= 100 ? '✅ Hoàn thành' : '❌ Chưa đạt'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Goals;
