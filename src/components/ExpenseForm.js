import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              name="currencies"
              id="currencies"
            >
              { currencies && currencies.map((currency) => (
                <option key={ currency }>
                  { currency }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              name="method"
              id="method"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
            <select
              name="category"
              id="category"
              data-testid="tag-input"
            >
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="tansporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
