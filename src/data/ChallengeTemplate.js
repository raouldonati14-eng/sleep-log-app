import React from "react";

function ChallengeEntry({ challengeData, setChallengeData, selectedDay, setSelectedDay }) {
  const days = Object.keys(challengeData);

  function handleChange(e) {
    const { name, value } = e.target;
    setChallengeData({
      ...challengeData,
      [selectedDay]: {
        ...challengeData[selectedDay],
        [name]: value,
      },
    });
  }

  return (
    <div className="ChallengeEntry">
      <h2>Day Entry</h2>

      {/* Day Selector */}
      <label>
        Select Day:
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </label>

      {/* Mental Feelings */}
      <label>
        How do you feel mentally?
        <textarea
          name="mental"
          value={challengeData[selectedDay].mental}
          onChange={handleChange}
          placeholder="Write your mental feelings..."
        />
      </label>

      {/* Physical Feelings */}
      <label>
        How do you feel physically?
        <textarea
          name="physical"
          value={challengeData[selectedDay].physical}
          onChange={handleChange}
          placeholder="Write your physical feelings..."
        />
      </label>
    </div>
  );
}

export default ChallengeEntry;
