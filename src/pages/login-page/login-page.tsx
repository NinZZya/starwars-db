import React from 'react';


const LoginPage = () => {
  return (
    <div className="signin-page">
      <form className="form-signin">
        <label htmlFor="inputLogin" className="sr-only">Login</label>
        <input type="text" id="inputLogin" className="form-control" placeholder="Login" required />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  )
};


export default LoginPage;
