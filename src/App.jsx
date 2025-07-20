import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoalList from "./GoalList";
import AddGoalForm from "./AddGoalForm";
import DepositForm from "./DepositForm";
import Overview from "./Overview";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GoalList />} />
          <Route path="/add-goal" element={<AddGoalForm />} />
          <Route path="/deposit" element={<DepositForm />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
