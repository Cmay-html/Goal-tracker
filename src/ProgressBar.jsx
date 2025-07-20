import React from "react";

function ProgressBar({ saved, target }) {
  const percent = Math.min((saved / target) * 100, 100) || 0;

  return (
    <div className="progress-wrapper">
      <div className="progress-bar" style={{background: "#eee", borderRadius: "8px", height: "20px", width: "100%", overflow: "hidden"}}>
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
            background: "#4caf50",
            height: "100%",
            transition: "width 0.4s",
            borderRadius: "8px 0 0 8px"
          }}
        />
      </div>
      <p>{Math.round(percent)}% saved (${saved} of ${target})</p>
    </div>
  );
}

export default ProgressBar;
