const getCurrencies = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export default getCurrencies;
