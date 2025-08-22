import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, deleteTransaction, updateTransaction } from "./features/budgetSlice";

export default function App() {
  const transactions = useSelector(s => s.budget.transactions);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  const total = transactions.reduce((a, t) => a + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0);

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      dispatch(updateTransaction({ id: editId, text, amount: +amount }));
      setEditId(null);
    } else {
      dispatch(addTransaction({ text, amount: +amount }));
    }
    setText("");
    setAmount("");
  };

  const handleEdit = t => {
    setText(t.text);
    setAmount(t.amount);
    setEditId(t.id);
  };

  return (
    <div className="container">
      <h2>💰 Budget Tracker</h2>
      <div className="balance"><h4>Your Balance</h4><h1>₹{total}</h1></div>

      <div className="inc-exp-container">
        <div><h4>Income</h4><p className="inc">₹{income}</p></div>
        <div><h4>Expense</h4><p className="exp">₹{expense}</p></div>
      </div> 

     
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.text} <span>{t.amount > 0 ? "+" : ""}{t.amount}</span>
            <button className="edit-btn" onClick={() => handleEdit(t)}>Edit</button>
            <button className="del-btn" onClick={() => dispatch(deleteTransaction(t.id))}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editId ? "Edit Transaction" : "Add Transaction"}</h3>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Description" required />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (+/-)" required />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}
