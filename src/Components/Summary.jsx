import React from "react";

const Summary = ({ finalThoughts, updateFinalThoughts }) => {
  return (
    <div className="Summary">
      <h3>Final Thoughts</h3>

      <label>Were you successful in your challenge? (Yes / No)</label>
      <input
        type="text"
        value={finalThoughts.success}
        onChange={(e) => updateFinalThoughts("success", e.target.value)}
        placeholder="Yes or No"
      />

      <label>Document how hard or easy this was for you</label>
      <textarea
        value={finalThoughts.comments}
        onChange={(e) => updateFinalThoughts("comments", e.target.value)}
        placeholder="Write your thoughts here..."
      />
    </div>
  );
};

export default Summary;