import React, { useEffect, useState } from "react";

function Overview() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Cmay-html/Goal-tracker/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const goalsCompleted = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;
  const today = new Date();

  return (
    <div className="overview-container">
      <h2>Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {goalsCompleted}</p>
      <ul>
        {goals.map((goal) => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
          const showWarning = daysLeft <= 30 && !isOverdue && goal.savedAmount < goal.targetAmount;

          return (
            <li key={goal.id}>
              {goal.name} – {daysLeft} days left
              {isOverdue && <span style={{ color: "red" }}> Overdue</span>}
              {showWarning && <span style={{ color: "orange" }}> Closing Soon</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;