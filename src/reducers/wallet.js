import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    if (state.expenses) {
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
      };
    }
    return {
      ...state,
      expenses: [action.payload.expense],
      totalValue: action.payload.convertedExpense,
    };
  case REQUEST_CURRENCIES:
    return { isFetching: true, ...state };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: Object.keys(action.payload), isFetching: false };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense, index) => index !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
