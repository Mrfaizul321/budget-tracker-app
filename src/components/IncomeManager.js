import React, { useState } from 'react';

const IncomeManager = ({ income, setIncome, setBalance }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddIncome = () => {
    const newIncome = { amount: parseFloat(amount), description };
    setIncome([...income, newIncome]);
    setBalance((prevBalance) => prevBalance + parseFloat(amount));
    setAmount('');
    setDescription('');
  };

  return (
    <div>
      <h2>Manage Income</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddIncome}>Add Income</button>
      <ul>
        {income.map((inc, index) => (
          <li key={index}>
            {inc.description}: ${inc.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeManager;
