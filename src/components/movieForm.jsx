import React from 'react';

const MovieForm = ({match , history}) => {
  return <div>
    <h1>movie form {match.params.id}</h1>
    <button className="btn btn-primary btn-lg" onClick={() => history.push('/movies')}>save</button>
  </div>;
}
 
export default MovieForm;