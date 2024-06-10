import React, { useState } from 'react';

const BudgetManager = ({ budgets, setBudgets, categories, transactions }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleBudgetChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSetBudget = () => {
    const newBudget = { category: selectedCategory, amount: parseFloat(budgetAmount) };
    setBudgets([...budgets, newBudget]);
    setSelectedCategory('');
    setBudgetAmount('');
  };

  const calculateSpent = (category) => {
    return transactions
      .filter((transaction) => transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  return (
    <div>
      <h2>Manage Budgets</h2>
      <select value={selectedCategory} onChange={handleBudgetChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Budget Amount"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
      />
      <button onClick={handleSetBudget}>Set Budget</button>
      <ul>
        {budgets.map((budget, index) => {
          const spent = calculateSpent(budget.category);
          return (
            <li key={index}>
              {budget.category}: Budget ${budget.amount}, Spent ${spent}
              {spent > budget.amount && <span> - Budget Exceeded!</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetManager;
