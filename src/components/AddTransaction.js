import React, { useState } from 'react';

function AddTransaction({ addTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addTransaction({
      title,
      amount: parseFloat(amount),
      isRecurring,
      lastDate: null, // Track the last date the recurring expense was applied
    });

    setTitle('');
    setAmount('');
    setIsRecurring(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
          Recurring Daily
        </label>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
