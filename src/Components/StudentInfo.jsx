import React from "react";

export default function StudentInfo({ studentName, setStudentName }) {
  return (
    <div className="student-info">
      <label>Student Name: </label>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
}