import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoginDisabled: true,
    };
  }

  componentDidMount() {
    this.loginValidation();
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    }, () => {
      this.loginValidation();
    });
  }

  loginValidation = () => {
    const { email, password } = this.state;
    //  emailRegex source: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript //
    const emailRegex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const minPasswordLength = 6;

    const emailValidation = email.match(emailRegex);
    const passwordValidation = password.length >= minPasswordLength;
    const validate = emailValidation && passwordValidation;
    if (validate) {
      return this.setState({
        isLoginDisabled: false,
      });
    }
    return this.setState({
      isLoginDisabled: true,
    });
  }

  login = () => {
    const { history, save } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    return save(email);
  }

  render() {
    const { email, password, isLoginDisabled } = this.state;
    return (
      <div className="login-page">
        <form className="login-form">
          <label htmlFor="email" className="login-label">
            <input
              className="login-input"
              type="text"
              name="email"
              id="email"
              value={ email }
              data-testid="email-input"
              placeholder="Email"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="password" className="login-label">
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              data-testid="password-input"
              placeholder="senha"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <input
            type="button"
            className="login-button"
            value="Entrar"
            disabled={ isLoginDisabled }
            onClick={ this.login }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  save: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  save: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
