import React, { Component } from 'react';

class LoginForm extends Component {

  state = {
    account : { username : "", password:""}
  }

  handleSubmit = e => {
    e.preventDefault();

    // call server 
  }

  handleChange = e =>{
    const account = {...this.state.account};
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({account});
  };


  render() { 
    return ( 
    <div>
      <h1>login</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <lable htmlFor="username">Username</lable>
          <input 
          value={this.state.account.username}
          onChange={this.handleChange} 
          name="username"
          id="username" 
          type="text" 
          className="form-control"/>
        </div>
        <div className="form-group">
          <lable htmlFor="password">Password</lable>
          <input 
          value={this.state.account.password} 
          onChange={this.handleChange} 
          id="password" 
          name="password"
          type="text" 
          className="form-control" />
        </div>
      </form>
      <button className="btn btn-primary">Login</button>
    </div> );
  }
}
 
export default LoginForm;