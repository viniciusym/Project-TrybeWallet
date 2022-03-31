import { REQUEST_CURRENCIES, RECEIVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { isFetching: true };
  case RECEIVE_CURRENCIES:
    return { currencies: Object.keys(action.payload), isFetching: false };
  default:
    return state;
  }
};

export default wallet;
