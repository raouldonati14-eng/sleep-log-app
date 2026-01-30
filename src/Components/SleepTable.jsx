import React from "react";

function SleepTable({ sleepData }) {
  return (
    <div className="SleepTable">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Bedtime</th>
            <th>Wake-up</th>
            <th>Hours Slept</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sleepData).map(([day, entry]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{entry.bedtime || "-"}</td>
              <td>{entry.wakeup || "-"}</td>
              <td>{entry.hours || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SleepTable;