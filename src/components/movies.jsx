
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";


export default class Movies extends Component{
  state = {
    movies:getMovies()
  }

  handleDelete = movie =>{

  };

  render(){
    return (
      <React.Fragment>

      </React.Fragment>
    );
  };
}