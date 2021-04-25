
import React from 'react';

const Input = ({name , label ,error ,...rest}) => {
  return ( 
    <div className="form-group">
          <lable htmlFor={name}>{label}</lable>
          <input 
          {...rest}
          name={name}
          id={name} 
          className="form-control"/>
          {error &&<div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;