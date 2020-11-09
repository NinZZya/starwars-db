import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { UserOperation, UserSelector } from '../../store/redux/user';
import { DispatchAsync, State, AuthData} from '../../constants/types';
import { UserStatus } from '../../constants/constants';


interface LoginScreenProp {
  onLogin: (authData: AuthData) => void;
  error: string;
  userStatus: UserStatus;
}

interface LoginScreenState {
  login: string;
  password: string;
}

class LoginScreen extends PureComponent<LoginScreenProp, LoginScreenState> {
  constructor(props: LoginScreenProp) {
    super(props);

    this.state = {
      login: '',
      password: '',
    }
  }

  render() {
    const { userStatus, error, onLogin } = this.props;
    const { login, password } = this.state;
    const isError = userStatus === UserStatus.AUTH_ERROR;

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


const mapStateToProps = (state: State) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  error: UserSelector.getError(state),
});


const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  onLogin: (authData: AuthData) => {
    dispatch(UserOperation.loginAsync(authData));
  },
});


export { LoginScreen };
export default connect(mapStateToProps, mapDispatchToPorops)(LoginScreen);
