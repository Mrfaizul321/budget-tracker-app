import React from 'react';

function TransactionList({ transactions, deleteTransaction, editTransaction }) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.title} - ${transaction.amount} 
            <button onClick={() => editTransaction(index)}>Edit</button>
            <button onClick={() => deleteTransaction(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
