import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesList from '../components/ExpensesList';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teste: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  teste2 = (func) => {
    this.setState({
      teste: func,
    });
  }

  render() {
    const { teste } = this.state;
    return (
      <div>
        <Header />
        <ExpenseForm teste2={ this.teste2 } />
        <ExpensesList teste={ teste } />
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
