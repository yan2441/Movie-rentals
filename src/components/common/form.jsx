import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = { 
    data : {},
    errors : {}
   }

   validate = () =>{

    const result = Joi.validate(this.state.data , this.schema , { abortEarly :false});
    if (!result.error) return null ;

    const errors = {}
    for (let item of result.error.details)
        errors[item.path[0]] = item.message;
    return errors;
    
  }

  validateProperty =(input) =>{
    const obj = { [input.name] : input.value }
    const schema = { [input.name] : this.schema[input.name] }
    const {error} = Joi.validate(obj , schema) ;
    
    return error ? error.details[0].message : null;
  }
  

  handleSubmit = e => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({errors : errors || {}});
    if (errors) return;


    // call server
    this.doSubmit(); 
  };

  handleChange = e =>{
    //live validation 
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage
    else delete errors[e.currentTarget.name];

    //update input field
    const data = {...this.state.data};
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({data ,errors});
  };

  renderButton(label){
    return(
      <button 
        disabled={this.validate()}
        className="btn btn-primary">{label}</button>
    )
  }

  renderInput(name ,label ,type = 'text'){
    return(<Input
        type={type}
        name= {name}
        value= {this.state.data[name]}
        label= {label}
        onChange={this.handleChange}
        error={this.state.errors[name]}
        />)
  }

  renderSelect(name ,label , options){
    const {data , errors} = this.state;
  
    return (
      <Select
      name={name}
      value={data[name]}
      label={label}
      options={options}
      onChange={this.handleChange}
      error={errors[name]}
      />
    );
  }
}
 
export default Form;