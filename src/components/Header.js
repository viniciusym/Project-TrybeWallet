import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  convertExpense = (expense) => {
    const { value, exchangeRates, currency } = expense;
    const { ask } = exchangeRates[currency];
    return value * ask;
  }

  convertExpenses = (expenses) => {
    let totalValue = 0;
    expenses.forEach((expense) => {
      const expenseValue = this.convertExpense(expense);
      totalValue += expenseValue;
    });
    return totalValue.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div className="wallet-header">
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="header-currency-field">
          Câmbio: BRL
        </div>
        <div data-testid="total-field">
          Despesa total:
          { this.convertExpenses(expenses) }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
