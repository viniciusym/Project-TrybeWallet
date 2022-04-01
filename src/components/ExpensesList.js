import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import convertExpense from '../convertExpense/convertExpense';
import { deleteExpenses } from '../actions';

class ExpensesList extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              value,
              description,
              currency,
              method,
              tag,
              id,
              exchangeRates,
            } = expense;
            const { ask, name } = exchangeRates[currency];
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ name }</td>
                <td>{ Number(ask).toFixed(2) }</td>
                <td>{ convertExpense(expense) }</td>
                <td>Real</td>
                <td>
                  <button type="button">
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => deleteExpense(id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    );
  }
}

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseId) => dispatch(deleteExpenses(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
