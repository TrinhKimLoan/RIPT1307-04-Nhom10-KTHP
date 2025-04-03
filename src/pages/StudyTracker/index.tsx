// import React, { useState, useEffect } from "react";
// import {
//   getSubjects,
//   addSubject,
//   deleteSubject,
//   getProgress,
//   getGoals,
// } from "@/services/StudyService";
// import { Subject, StudyProgress, StudyGoal } from "@/models/studytracker";

// const StudyTracker: React.FC = () => {
//   const [menu, setMenu] = useState<string>(""); // Quản lý menu đang chọn
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [progress, setProgress] = useState<StudyProgress[]>([]);
//   const [goals, setGoals] = useState<StudyGoal[]>([]);
//   const [newSubject, setNewSubject] = useState<string>("");

//   useEffect(() => {
//     setSubjects(getSubjects());
//     setProgress(getProgress());
//     setGoals(getGoals());
//   }, []);

//   // Thêm Môn học
//   const handleAddSubject = () => {
//     if (newSubject.trim()) {
//       addSubject(newSubject);
//       setSubjects(getSubjects());
//       setNewSubject("");
//     }
//   };

//   // Xóa Môn học
//   const handleDeleteSubject = (id: number) => {
//     deleteSubject(id);
//     setSubjects(getSubjects());
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📚 Study Tracker</h1>

//       {/* Dropdown Menu */}
//       <div>
//         <button onClick={() => setMenu(menu === "menu" ? "" : "menu")}>
//           📖 Chọn Chức Năng ▼
//         </button>

//         {menu === "menu" && (
//           <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
//             <li>
//               <button onClick={() => setMenu("subjects")}>📘 Quản lý Môn học</button>
//             </li>
//             <li>
//               <button onClick={() => setMenu("progress")}>⏳ Tiến độ Học tập</button>
//             </li>
//             <li>
//               <button onClick={() => setMenu("goals")}>🎯 Mục tiêu Học tập</button>
//             </li>
//           </ul>
//         )}
//       </div>

//       {/* Quản lý Môn học */}
//       {menu === "subjects" && (
//         <div>
//           <h2>📘 Quản lý Môn học</h2>
//           <input
//             type="text"
//             value={newSubject}
//             onChange={(e) => setNewSubject(e.target.value)}
//             placeholder="Nhập tên môn học"
//           />
//           <button onClick={handleAddSubject}>Thêm Môn</button>

//           <ul>
//             {subjects.map((subject) => (
//               <li key={subject.id}>
//                 {subject.name}
//                 <button onClick={() => handleDeleteSubject(subject.id)}>Xóa</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Tiến độ Học tập */}
//       {menu === "progress" && (
//         <div>
//           <h2>⏳ Tiến độ Học tập</h2>
//           <ul>
//             {progress.map((item) => (
//               <li key={item.id}>
//                 Môn: {subjects.find((s) => s.id === item.subjectId)?.name} - {item.content} (
//                 {item.duration} phút)
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Mục tiêu Học tập */}
//       {menu === "goals" && (
//         <div>
//           <h2>🎯 Mục tiêu Học tập</h2>
//           <ul>
//             {goals.map((goal) => {
//               const subject = subjects.find((s) => s.id === goal.subjectId);
//               const completedPercent = (
//                 (goal.completedHours / (goal.targetHours * 60)) *
//                 100
//               ).toFixed(1);

//               return (
//                 <li key={goal.subjectId}>
//                   {subject?.name} - Mục tiêu: {goal.targetHours} giờ - Đã học:{" "}
//                   {goal.completedHours / 60} giờ ({completedPercent}%)
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudyTracker;
