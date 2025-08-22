import { createSlice } from "@reduxjs/toolkit";

// load from localStorage
const loadFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  } catch {
    return [];
  }
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: { transactions: loadFromLocalStorage() },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push({ id: Date.now(), ...action.payload });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    updateTransaction: (state, action) => {
      const id = state.transactions.findIndex(t => t.id === action.payload.id);
      if (id !== -1) state.transactions[id] = action.payload;
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction } = budgetSlice.actions;
export default budgetSlice.reducer;
