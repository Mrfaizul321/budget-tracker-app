import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import SetBalance from './components/SetBalance';
import CategoryManager from './components/CategoryManager';
import IncomeManager from './components/IncomeManager';
import BudgetManager from './components/BudgetManager';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [initialBalance, setInitialBalance] = useState(null);
  const [balance, setBalance] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [totalDeducted, setTotalDeducted] = useState(0);

  useEffect(() => {
    setTransactions([]);
    setInitialBalance(null);
    setBalance(null);
    setTotalDeducted(0);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('initialBalance', initialBalance);
    localStorage.setItem('balance', balance);
    localStorage.setItem('totalDeducted', totalDeducted);
  }, [transactions, categories, income, budgets, initialBalance, balance, totalDeducted]);

  const addTransaction = (transaction) => {
    if (editingTransaction !== null) {
      const updatedTransactions = transactions.map((t, index) =>
        index === editingTransaction ? transaction : t
      );

      const oldAmount = transactions[editingTransaction].amount;
      const newAmount = transaction.amount;
      const updatedBalance = balance + oldAmount - newAmount;

      setTransactions(updatedTransactions);
      setBalance(updatedBalance);
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, transaction]);
      setBalance((prevBalance) => prevBalance - transaction.amount);
      setTotalDeducted((prevTotal) => prevTotal + transaction.amount);
    }
  };

  const editTransaction = (index) => {
    setEditingTransaction(index);
  };

  const deleteTransaction = (index) => {
    const deletedTransaction = transactions[index];
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
    setBalance((prevBalance) => prevBalance + deletedTransaction.amount);
  };

  const setInitialBalanceHandler = (newBalance) => {
    setInitialBalance(newBalance);
    setBalance(newBalance);
  };

  const isBalanceSet = initialBalance !== null;

  const handleSave = () => {
    const dataToSave = {
      transactions,
      categories,
      income,
      budgets,
      initialBalance,
      balance,
      totalDeducted,
    };
    const fileName = prompt('Enter the name of the file:');
    if (fileName) {
      localStorage.setItem(fileName, JSON.stringify(dataToSave));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setTransactions([]);
      setCategories([]);
      setIncome([]);
      setBudgets([]);
      setInitialBalance(null);
      setBalance(null);
      setTotalDeducted(0);
    }
  };

  return (
    <div className="App">
      <Header balance={balance} />
      {!isBalanceSet && <SetBalance setInitialBalance={setInitialBalanceHandler} />}
      {isBalanceSet && (
        <>
          <h2>Initial Balance: ${initialBalance}</h2>
          <h2>Remaining Balance: ${balance}</h2>
          <h2>Total Deducted: ${totalDeducted}</h2>
          <AddTransaction
            categories={categories}
            addTransaction={addTransaction}
            editingTransaction={editingTransaction !== null ? transactions[editingTransaction] : null}
          />
          <TransactionList
            transactions={transactions}
            editTransaction={editTransaction}
            deleteTransaction={deleteTransaction}
          />
        </>
      )}
      <CategoryManager categories={categories} setCategories={setCategories} />
      <IncomeManager income={income} setIncome={setIncome} setBalance={setBalance} />
      <BudgetManager
        budgets={budgets}
        setBudgets={setBudgets}
        categories={categories}
        transactions={transactions}
      />
      <div>Total Expenses: ${totalDeducted}</div>
      <button onClick={handleSave} className="save-button">Save</button>
      <button onClick={handleDeleteAll} className="delete-button">Delete All</button>
    </div>
  );
}

export default App;
