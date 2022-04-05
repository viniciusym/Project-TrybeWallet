import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EXPENSE_TO_EDIT,
  START_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  editingExpense: false,
  expenseToEdit: {},
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
  case EDIT_EXPENSE: {
    const expenseIndex = action.payload.expense.id;
    const arrayExpensesToEdit = [...state.expenses];
    arrayExpensesToEdit.splice(expenseIndex, 1, action.payload.expense);
    return {
      ...state,
      expenses: arrayExpensesToEdit,
      expenseToEdit: {},
      editingExpense: false,
    };
  }
  case START_EDITING:
    return {
      ...state,
      editingExpense: true,
    };
  case EXPENSE_TO_EDIT:
    return {
      ...state,
      expenseToEdit: action.payload,
      editingExpense: true,
    };
  default:
    return state;
  }
};

export default wallet;
