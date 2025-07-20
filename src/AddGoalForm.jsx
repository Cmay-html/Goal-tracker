import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddGoalForm() {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
    savedAmount: 0,
    createdAt: new Date().toString().slice(0, 10),
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://my-json-server.typicode.com/Cmay-html/Goal-tracker/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => navigate("/"));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={(e) =>
          setFormData({ ...formData, targetAmount: parseFloat(e.target.value) })
        }
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;