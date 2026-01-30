import React from "react";

function Summary({ sleepData, completionPoints }) {
  const totalHours = Object.values(sleepData).reduce(
    (sum, entry) => sum + (parseFloat(entry.hours) || 0),
    0
  );

  return (
    <div className="Summary">
      <h3>Summary</h3>
      <p>Total Hours Slept: {totalHours.toFixed(2)}</p>
      <p>Completion Points: {completionPoints} / 10</p>
    </div>
  );
}

export default Summary;
