import React from 'react';

const Input = ({name , label ,value ,onChange ,error}) => {
  return ( 
    <div className="form-group">
          <lable htmlFor={name}>{label}</lable>
          <input 
          value={value}
          onChange={onChange} 
          name={name}
          id={name} 
          type="text" 
          className="form-control"/>
          {error &&<div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;