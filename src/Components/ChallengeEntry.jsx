import React from "react";

const ChallengeEntry = ({ day, value, onChange }) => {
  return (
    <div className="ChallengeEntry">
      <h3>{day}</h3>
      <label>How did you feel today (mentally & physically)?</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your feelings..."
      />
    </div>
  );
};

export default ChallengeEntry;