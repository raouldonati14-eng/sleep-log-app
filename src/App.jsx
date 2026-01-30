import React, { useState } from "react";
import "./styles/app.css";

// Components
import Header from "./Components/Header";
import ChallengeEntry from "./Components/ChallengeEntry";
import StudentInfo from "./Components/StudentInfo";
import Summary from "./Components/Summary";

function App() {
  const [studentName, setStudentName] = useState("");
  const [challengeData, setChallengeData] = useState({
    Day1: { feelings: "" },
    Day2: { feelings: "" },
    Day3: { feelings: "" },
    Day4: { feelings: "" },
    Day5: { feelings: "" },
  });
  const [finalThoughts, setFinalThoughts] = useState({
    success: "",
    comments: "",
  });
  const [completionGrade, setCompletionGrade] = useState(0);

  // Update challenge data
  const updateDay = (day, value) => {
    const newData = { ...challengeData, [day]: { feelings: value } };
    setChallengeData(newData);
    setCompletionGrade(calculateCompletionGrade(newData, finalThoughts));
  };

  // Update final thoughts
  const updateFinalThoughts = (field, value) => {
    const newThoughts = { ...finalThoughts, [field]: value };
    setFinalThoughts(newThoughts);
    setCompletionGrade(calculateCompletionGrade(challengeData, newThoughts));
  };

  // Calculate completion grade
  const calculateCompletionGrade = (entries, final) => {
    const allDaysFilled = Object.values(entries).every(
      (day) => day.feelings && day.feelings.trim() !== ""
    );
    const finalFilled =
      final.success !== "" && final.comments && final.comments.trim() !== "";
    return allDaysFilled && finalFilled ? 10 : 0;
  };

  // Download CSV
  const downloadChallengeCSV = () => {
    const rows = [["Student", "Day", "Feelings"]];
    Object.entries(challengeData).forEach(([day, entry]) => {
      rows.push([studentName || "Unknown", day, entry.feelings || ""]);
    });

    // Add final thoughts
    rows.push(["Final Thoughts - Success?", "", finalThoughts.success]);
    rows.push(["Final Thoughts - Comments", "", finalThoughts.comments]);

    // Add completion grade
    rows.push(["Completion Grade", "", completionGrade]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "give_up_challenge.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <Header title="Give-Up Something Challenge" />

      <StudentInfo studentName={studentName} setStudentName={setStudentName} />

      {/* Challenge entries for 5 days */}
      {["Day1", "Day2", "Day3", "Day4", "Day5"].map((day) => (
        <ChallengeEntry
          key={day}
          day={day}
          value={challengeData[day].feelings}
          onChange={(val) => updateDay(day, val)}
        />
      ))}

      {/* Final Thoughts */}
      <Summary
        finalThoughts={finalThoughts}
        updateFinalThoughts={updateFinalThoughts}
      />

      {/* Completion Grade */}
      <div className="completion-grade">
        <h3>Completion Grade: {completionGrade} / 10</h3>
      </div>

      {/* Download CSV */}
      <div className="download-section">
        <button onClick={downloadChallengeCSV}>
          Download Challenge Log (CSV)
        </button>
      </div>
    </div>
  );
}

export default App;
