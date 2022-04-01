const convertExpense = (expense) => {
  const { value, exchangeRates, currency } = expense;
  const { ask } = exchangeRates[currency];
  return (value * ask).toFixed(2);
};

export default convertExpense;
