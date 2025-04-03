import { Course } from './course';

const STORAGE_KEY = 'courses_data';

export const getCourses = (): Course[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveCourses = (courses: Course[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

export const addCourse = (course: Course) => {
  const courses = getCourses();
  courses.push(course);
  saveCourses(courses);
};

export const updateCourse = (updatedCourse: Course) => {
  let courses = getCourses();
  courses = courses.map(course => 
    course.id === updatedCourse.id ? updatedCourse : course
  );
  saveCourses(courses);
};

export const deleteCourse = (id: string) => {
  let courses = getCourses();
  courses = courses.filter(course => course.id !== id);
  saveCourses(courses);
};
