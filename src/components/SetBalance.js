import React, { useState } from 'react';

function SetBalance({ setInitialBalance, isBalanceSet }) {
  const [newBalance, setNewBalance] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newBalance) return;

    setInitialBalance(parseFloat(newBalance));
    setNewBalance('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Set Balance</label>
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          disabled={isBalanceSet}
        />
      </div>
      <button type="submit" disabled={isBalanceSet}>Update Balance</button>
    </form>
  );
}

export default SetBalance;
