import React, { useState, useEffect } from 'react';
import { getSubjects, addSubject, deleteSubject } from '@/services/StudyService';
import { Subject } from '@/models/studytracker';

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  const handleAdd = () => {
    if (newSubject.trim()) {
      addSubject(newSubject);
      setSubjects(getSubjects());
      setNewSubject('');
    }
  };

  const handleDelete = (id: number) => {
    deleteSubject(id);
    setSubjects(getSubjects());
  };

  return (
    <div>
      <h1>📘 Quản lý Môn học</h1>
      <input
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="Nhập tên môn học"
      />
      <button onClick={handleAdd}>Thêm Môn</button>

      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {subject.name} <button onClick={() => handleDelete(subject.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
