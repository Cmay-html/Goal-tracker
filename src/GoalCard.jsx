import React from "react";
import ProgressBar from "./ProgressBar";


function GoalCard({ goal, onEdit, onDelete }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  const percent = Math.min((savedAmount / targetAmount) * 100, 100);

  return (
     <div className="card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Target: ${targetAmount.toFixed(2)}</p>
      <p>Saved: ${savedAmount.toFixed(2)}</p>

      <div className="progress" >
        <ProgressBar saved={savedAmount} target={targetAmount} />
      </div>

      <p>Deadline: {deadline}</p>

    
      <button className='edit-btn' onClick={() => onEdit(goal)} >
        Edit
      </button>
      <button className='delete-btn' onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default GoalCard;
