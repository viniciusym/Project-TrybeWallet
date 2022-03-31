export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const fetchingCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (payload) => ({
  type: RECEIVE_CURRENCIES,
  payload,
});

export function fetchCurrencies() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(fetchingCurrencies());
    const response = await fetch(endpoint);
    const data = await response.json();
    delete data.USDT;
    dispatch(receiveCurrencies(Object.keys(data)));
  };
}

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});
