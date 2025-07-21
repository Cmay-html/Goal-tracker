import React, { useEffect, useState } from "react";
import GoalCard from "./GoalCard";

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null); 
  const [editForm, setEditForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
    savedAmount: 0,
    createdAt: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Cmay-html/Goal-tracker/goals")
      .then((res) => res.json())
      .then(setGoals)
      .catch(() => alert("Failed to load goals"));
  }, []);

  
  function handleDelete(id) {
    fetch(`https://my-json-server.typicode.com/Cmay-html/Goal-tracker/goals/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      })
      .catch(() => alert("Error deleting goal"));
  }

 
  function handleEdit(goal) {
    setEditingGoal(goal);
    setEditForm({
      name: goal.name,
      targetAmount: goal.targetAmount,
      category: goal.category,
      deadline: goal.deadline,
      savedAmount: goal.savedAmount,
      createdAt: goal.createdAt,
    });
    setError("");
  }

 
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  function handleEditSubmit(e) {
    e.preventDefault();

    
    if (!editForm.name || !editForm.targetAmount || !editForm.category || !editForm.deadline) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(Number(editForm.targetAmount)) || Number(editForm.targetAmount) <= 0) {
      setError("Target amount must be greater than zero.");
      return;
    }

    setError("");
    fetch(`https://my-json-server.typicode.com/Cmay-html/Goal-tracker/goals/${editingGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editForm,
        targetAmount: Number(editForm.targetAmount),
        savedAmount: Number(editForm.savedAmount),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update goal");
        return res.json();
      })
      .then((updatedGoal) => {
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
        );
        setEditingGoal(null);
      })
      .catch(() => setError("Failed to update goal. Please try again."));
  }

  return(
       <div>
      <h2>Your Goals</h2>
      <ul className="goals-list">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>

    
      {editingGoal && (
        <form onSubmit={handleEditSubmit} >
          <h3>Edit Goal</h3>
          {error && <p >{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Goal Name"
            value={editForm.name}
            onChange={handleEditChange}
            required
          />
          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={editForm.targetAmount}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editForm.category}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={editForm.deadline}
            onChange={handleEditChange}
            required
          />
          
          <br />
          <button type="submit" className="submit-button">Save Changes</button>
          <button
            type="button"
            onClick={() => setEditingGoal(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default GoalList;
