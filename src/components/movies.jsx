
import React, { Component } from "react";
import Pagination from './common/pagination';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component{
  state = {
    movies:[],
    genres:[],
    pageSize: 4,
    currentPage:1,
    searchQuery:"", 
    selectedGenre:null,
    sortColumn: { path:'title', order: 'asc'}
  };

  componentDidMount(){
    const genres = [{_id:'' ,name: 'All Genres'} , ...getGenres()]

    this.setState({movies:getMovies() , genres});
  }

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

  handleGenreSelect = genre =>{
    this.setState({searchQuery:"" ,selectedGenre:genre ,currentPage :1 })
  }

  handleSearch = query => {
    this.setState({ searchQuery:query, selectedGenre:null ,currentPage :1 })
  }

  handleSort = sortColumn =>{
    this.setState({ sortColumn });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render(){
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if(count === 0) return <p className="m-3">there is no movies in database</p>;

    const {totalCount ,data} = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2 m-5">
          <ListGroup 
          items= {this.state.genres}
          onItemSelect= {this.handleGenreSelect}
          selectedItme={ this.state.selectedGenre}
          />
        </div>
        <div className="col">
        <Link 
        to="/movies/new"
        className="btn btn-primary">New Movie</Link>
        <p className="m-3">showing {totalCount} movies in the database</p>
        <SearchBox 
        value={searchQuery} 
        onChange={this.handleSearch}/>
        <MoviesTable
        movies={data}
        sortColumn={sortColumn}
        onLike={this.handleLiked}
        onDelete={this.handleDelete}
        onSort={this.handleSort}
        />
        <Pagination 
        itemsCount={totalCount} 
        pageSize={pageSize} 
        onPageChange={this.handlePageChange}
        currentPage={currentPage}/>
        </div>
      </div>
    );
  };
}

export default Movies;