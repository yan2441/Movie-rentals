import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class LoginForm extends Component {

  state = {
    account : { username : "", password:""},
    errors : {}
  }

  schema = {
    username : Joi.string().required(),
    password : Joi.string().required()
  }

  validate = () =>{

    const result =Joi.validate(this.state.account , this.schema , { abortEarly :false});

    const errors = {};

    const {account} = this.state;
    if(account.username.trim() === '')
      errors.username = 'Username is required';

    if(account.password.trim() === '')
      errors.password = 'Password is required'

    return Object.keys(errors).length === 0 ? null : errors;
    
  }

  handleSubmit = e => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({errors : errors || {}});
    if (errors) return;


    // call server 
  }

  validateProperty =(input) =>{
    if(input.name === 'username'){
      if(input.value.trim() === '') return 'Username is required !'
    }

    if(input.name === 'password'){
      if(input.value.trim() === '') return 'Password is required !'
    }

  }

  handleChange = e =>{
    //live validation 
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage
    else delete errors[e.currentTarget.name];

    //update input field
    const account = {...this.state.account};
    account[e.currentTarget.name] = e.currentTarget.value;

    this.setState({account ,errors});
  };


  render() { 
    return ( 
    <div>
      <h1>login</h1>
      <form onSubmit={this.handleSubmit}>
        <Input
        name= "username"
        label= "Username"
        value= {this.state.account.username}
        onChange={this.handleChange}
        error={this.state.errors.username}
        />
        <Input
        name= "password"
        label= "Password"
        value= {this.state.account.password}
        onChange={this.handleChange}
        error={this.state.errors.password}
        />
        <button className="btn btn-primary">Login</button>
      </form>
      
    </div> );
  }
}
 
export default LoginForm;