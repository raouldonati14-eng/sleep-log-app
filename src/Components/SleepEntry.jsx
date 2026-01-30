import React from "react";

function SleepEntry({ sleepData, setSleepData, selectedDay, setSelectedDay }) {
  // Handle input changes for bedtime/wake-up
  function handleChange(day, field, value) {
    const updatedEntry = { ...sleepData[day], [field]: value };

    // Auto-calculate hours slept if both times are filled
    if (updatedEntry.bedtime && updatedEntry.wakeup) {
      const [bedH, bedM] = updatedEntry.bedtime.split(":").map(Number);
      const [wakeH, wakeM] = updatedEntry.wakeup.split(":").map(Number);

      let hours = wakeH + wakeM / 60 - (bedH + bedM / 60);
      if (hours < 0) hours += 24; // handle past midnight
      updatedEntry.hours = hours.toFixed(2);
    } else {
      updatedEntry.hours = "";
    }

    setSleepData({ ...sleepData, [day]: updatedEntry });
  }

  return (
    <div className="SleepEntry">
      <h3>Sleep Entry</h3>
      <label>
        Select Day:
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {Object.keys(sleepData).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>

      <div className="inputs">
        <label>
          Bedtime:
          <input
            type="time"
            value={sleepData[selectedDay].bedtime || ""}
            onChange={(e) => handleChange(selectedDay, "bedtime", e.target.value)}
          />
        </label>

        <label>
          Wake-up:
          <input
            type="time"
            value={sleepData[selectedDay].wakeup || ""}
            onChange={(e) => handleChange(selectedDay, "wakeup", e.target.value)}
          />
        </label>

        <label>
          Hours Slept:
          <input type="text" value={sleepData[selectedDay].hours || ""} readOnly />
        </label>
      </div>
    </div>
  );
}

export default SleepEntry;