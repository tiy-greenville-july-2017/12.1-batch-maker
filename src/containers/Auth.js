import React from 'react';
import PropTypes from 'prop-types';

import BaseLayout from '../layouts/Base';
import User from '../models/user';


class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }

  componentWillMount(){
    // If the user is already logged in
    // just take them to the message screen
    if(User.current()){
      this.props.history.push('/recipe/');
    }
  }

  login = (userData) => {
    let creds = {
      username: userData.email,
      password: userData.password
    };

    User.login(creds, (user)=>{
      console.log(user);
      this.props.history.push('/recipe/');
    });
  }

  signup = (userData) => {
    let creds = {
      username: userData.email,
      password: userData.password
    };

    User.signup(creds, (user)=>{
      console.log(user);
      this.props.history.push('/recipe/');
    });
  }

  render(){
    let signupDs = "Don't have an account? Signup here!"

    return (
      <BaseLayout>
        <div className="row">
          <div className="col-md-6">
            <LoginForm formAction={this.login} title="Login" />
          </div>
          <div className="col-md-6">
            <SignupForm formAction={this.signup} title="Signup" description={signupDs}/>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

class AuthForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  _onChangeEmail = (e) => {
    this.setState({'email': e.target.value});
  }

  _onChangePassword = (e) => {
    this.setState({'password': e.target.value});
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this.props.formAction(this.state);
    this.setState({username: '', password: ''});
  }

  render(){
    return (
      <form onSubmit={this._onSubmit}>
        {this.props.title ? <h2>{this.props.title}</h2> : null}
        {this.props.description ? <p>{this.props.description}</p> : null}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input onChange={this._onChangeEmail} value={this.state.email} type="email" className="form-control" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this._onChangePassword} value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  'formAction': PropTypes.func.isRequired,
  'title': PropTypes.string,
  'description': PropTypes.string
};

class LoginForm extends AuthForm{

}

class SignupForm extends AuthForm{

}

export default AuthContainer;
