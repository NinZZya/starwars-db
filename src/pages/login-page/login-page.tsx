import React, { PureComponent } from 'react';
import { IAuthData } from '../../types';


interface P {
  onLogin: (authData: IAuthData) => void;
  isError: boolean;
  error: string;
}

interface S {
  login: string;
  password: string;
}

class LoginPage extends PureComponent<P, S> {
  constructor(props: P) {
    super(props);

    this.state = {
      login: '',
      password: '',
    }
  }

  render() {
    const { isError, error, onLogin } = this.props;
    const { login, password } = this.state;

    return (
      <div className="signin-page">
        <form
          className="form-signin" onSubmit={(evt) => {
            evt.preventDefault();
            onLogin({login, password});
          }}
        >
          <label htmlFor="inputLogin" className="sr-only">Login</label>
          <input
            type="text"
            id="inputLogin"
            className="form-control"
            placeholder="Login"
            required
            onChange={(evt) => {
              evt.preventDefault();
              this.setState({login: evt.target.value});
            }}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={(evt) => {
              evt.preventDefault();
              this.setState({password: evt.target.value});
            }}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
        {
          isError ?
            <p className="error">{error}</p> :
            null
        }
      </div>
    );
  }
};


export default LoginPage;
