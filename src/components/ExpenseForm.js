import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions/index';
import getCurrencies from '../api/getCurrenries';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  convertAndAddExpense = async () => {
    const { addExpenses } = this.props;
    const { state } = this;
    const data = await getCurrencies();
    addExpenses({
      expense: {
        ...state,
        exchangeRates: data,
      } });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              onChange={ (event) => this.handleChange(event) }
              value={ currency }
            >
              { currencies && currencies.map((coin) => (
                <option key={ coin } name="currenry" value={ coin }>
                  { coin }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              value={ method }
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select
              name="tag"
              value={ tag }
              id="tag"
              data-testid="tag-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Tansporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <input
            type="button"
            value="Adicionar despesa"
            onClick={ () => {
              this.convertAndAddExpense(value, currency);
            } }
          />
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
