import React, { useState } from "react";
import "./styles/app.css";

// Components
import Header from "./Components/Header";
import StudentInfo from "./Components/StudentInfo";
import SleepEntry from "./Components/SleepEntry";
import SleepTable from "./Components/SleepTable";
import Summary from "./Components/Summary";

// Week template
import weekTemplate from "./data/WeekTemplate";

function App() {
  const [studentName, setStudentName] = useState("");
  const [sleepData, setSleepData] = useState({ ...weekTemplate });
  const [selectedDay, setSelectedDay] = useState("Sunday");

  // Download CSV
  function downloadSleepCSV() {
    let rows = [["Student", "Day", "Bedtime", "Wake-up", "Hours Slept"]];
    Object.entries(sleepData).forEach(([day, entry]) => {
      rows.push([
        studentName || "Unknown",
        day,
        entry.bedtime || "",
        entry.wakeup || "",
        entry.hours || ""
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "weekly_sleep_log.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Calculate completion points out of 10
  function calculateCompletionPoints() {
    const totalDays = Object.keys(sleepData).length;
    const completedDays = Object.values(sleepData).filter(
      (entry) => entry.bedtime && entry.wakeup
    ).length;

    return ((completedDays / totalDays) * 10).toFixed(1);
  }

  return (
    <div className="app">
      <Header />
      <StudentInfo studentName={studentName} setStudentName={setStudentName} />

      <SleepEntry
        sleepData={sleepData}
        setSleepData={setSleepData}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <SleepTable sleepData={sleepData} />

      <Summary sleepData={sleepData} completionPoints={calculateCompletionPoints()} />

      <div className="download-section">
        <button onClick={downloadSleepCSV}>Download CSV</button>
      </div>
    </div>
  );
}

export default App;