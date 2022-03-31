import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="header-currency-field">
          Câmbio: BRL
        </div>
        <div data-testid="total-field">
          Despesa Total: 0
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
