import React from "react";

const StudentInfo = ({ studentName, setStudentName }) => {
  return (
    <div className="StudentInfo">
      <label>
        Student Name:
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your full name"
        />
      </label>
    </div>
  );
};

export default StudentInfo;