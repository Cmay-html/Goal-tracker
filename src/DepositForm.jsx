import React, { useState, useEffect } from "react";

function DepositForm() {
  const [goals, setGoals] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch goals");
        return res.json();
      })
      .then(setGoals)
      .catch((error) => {
        console.error(error);
        alert("Error loading goals. Please try again later.");
      });
  }, []);

  
  function handleDeposit(e) {
    e.preventDefault();
    if (!selectedId) {
      alert("Kindly select a goal.");
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid deposit amount greater than zero.");
      return;
    }

    const goal = goals.find((g) => g.id === selectedId);
    if (!goal) {
      alert("Selected goal not found.");
      return;
    }

    const updatedAmount = goal.savedAmount + depositAmount;

    
    fetch(`http://localhost:3000/goals/${selectedId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update goal");
        return res.json();
      })
      .then((updatedGoal) => {
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === selectedId ? updatedGoal : g))
        );
        setAmount(""); 
        alert("Deposit successful!");
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error making the deposit.");
      });
  }

  return (
    <form onSubmit={handleDeposit}>
      <h2>Make a Deposit</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        required
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Save</button>
    </form>
  );
}

export default DepositForm;
