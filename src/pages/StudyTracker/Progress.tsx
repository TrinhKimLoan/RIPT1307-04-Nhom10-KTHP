import React, { useState, useEffect } from 'react';
import { getSubjects, getProgress, addProgress, deleteProgress } from '@/services/StudyService';
import { Subject, StudyProgress } from '@/models/studytracker';

const Progress: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [form, setForm] = useState<Partial<StudyProgress>>({});

  useEffect(() => {
    setSubjects(getSubjects());
    setProgress(getProgress());
  }, []);

  const handleAddProgress = () => {
    if (form.subjectId && form.date && form.duration && form.content) {
      addProgress({ id: Date.now(), ...form } as StudyProgress);
      setProgress(getProgress());
      setForm({});
    }
  };

  const handleDelete = (id: number) => {
    deleteProgress(id);
    setProgress(getProgress());
  };

  return (
    <div>
      <h1>⏳ Quản lý Tiến độ Học tập</h1>

      <h2>📝 Thêm Tiến độ</h2>
      <select
        value={form.subjectId || ''}
        onChange={(e) => setForm({ ...form, subjectId: Number(e.target.value) })}
      >
        <option value="">Chọn Môn học</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={form.date || ''}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="number"
        placeholder="Thời lượng (phút)"
        value={form.duration || ''}
        onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Nội dung học"
        value={form.content || ''}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={handleAddProgress}>Thêm Tiến độ</button>

      <h2>📊 Tiến độ Hiện tại</h2>
      <ul>
        {progress.map((item) => {
          const subject = subjects.find((s) => s.id === item.subjectId);
          return (
            <li key={item.id}>
              {subject?.name} - {item.date} - {item.duration} phút - {item.content}{' '}
              <button onClick={() => handleDelete(item.id)}>Xóa</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Progress;
