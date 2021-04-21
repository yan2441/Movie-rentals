
import React, { Component } from "react";
import Like from './common/like';
import Pagination from './common/pagination';
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";

class Movies extends Component{
  state = {
    movies:getMovies(),
    pageSize: 4,
    currentPage:1
  };

  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies }); 
  };

  handleDelete = movie =>{
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({movies});
  };

  handlePageChange = page => {
    this.setState({ currentPage : page });
  }


  render(){
    const { length: count } = this.state.movies;
    const {pageSize , currentPage , movies:allMovies} = this.state;

    

    if(count === 0)
      return <p className="m-3">there is no movies in database</p>;

    const movies = paginate(allMovies , currentPage ,pageSize)

    return (
      <React.Fragment>
        <p className="m-3">showing {count} movies in the database</p>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Genra</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie =>(
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>

                <td>
                  <Like liked={movie.liked} 
                  onClick={() => this.handleLiked(movie)}/>
                </td>
                <td><button onClick={()=> this.handleDelete(movie)}
                className="btn btn-danger btn-sm">Delate</button></td>
              </tr>
              ))}
          </tbody>
        </table>
        <Pagination 
        itemsCount={count} 
        pageSize={pageSize} 
        onPageChange={this.handlePageChange}
        currentPage={currentPage}/>
      </React.Fragment>
    );
  };
}

export default Movies;