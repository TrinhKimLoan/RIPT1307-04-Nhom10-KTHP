import { Subject, StudyProgress, StudyGoal } from '@/models/studytracker';

// Lưu và lấy từ LocalStorage
const getData = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
const setData = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

// *** 1. Quản lý Môn học ***
export const getSubjects = (): Subject[] => getData('subjects');
export const addSubject = (name: string) => {
  const subjects = getSubjects();
  const newSubject: Subject = { id: Date.now(), name };
  setData('subjects', [...subjects, newSubject]);
};
export const deleteSubject = (id: number) => {
  const subjects = getSubjects().filter((subject: Subject) => subject.id !== id);
  setData('subjects', subjects);
};

// *** 2. Quản lý Tiến độ ***
export const getProgress = (): StudyProgress[] => getData('progress');
export const addProgress = (progress: StudyProgress) => {
  const progresses = getProgress();
  setData('progress', [...progresses, progress]);
};
export const deleteProgress = (id: number) => {
  const progresses = getProgress().filter((item: StudyProgress) => item.id !== id);
  setData('progress', progresses);
};

// *** 3. Quản lý Mục tiêu ***
export const getGoals = (): StudyGoal[] => getData('goals');
export const setGoal = (goal: StudyGoal) => {
  const goals = getGoals();
  const updatedGoals = goals.filter(g => g.subjectId !== goal.subjectId);
  setData('goals', [...updatedGoals, goal]);
};
