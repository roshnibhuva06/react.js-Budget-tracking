import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../features/budgetSlice";

export const store = configureStore({
  reducer: { budget: budgetReducer }
});

// localStorage save
store.subscribe(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(store.getState().budget.transactions)
  );
});
