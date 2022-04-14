import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesList from '../components/ExpensesList';
import './Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      functionToTransferData: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  transferFormData = (func) => {
    this.setState({
      functionToTransferData: func,
    });
  }

  render() {
    const { functionToTransferData } = this.state;
    return (
      <div>
        <Header />
        <ExpenseForm transferFormData={ this.transferFormData } />
        <ExpensesList functionToTransferData={ functionToTransferData } />
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
