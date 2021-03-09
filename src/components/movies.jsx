import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import "../movies.css";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize:4,
    sortColumn: {path: 'title',order :'asc'}
  };
  componentDidMount(){
    const genres = [{_id: "",name:'All Genres'},...getGenres()];
    this.setState({movies:getMovies(),genres})
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleReset = () => {
    this.setState({ movies: getMovies() });
  };
  handlePageChange = page => {
    this.setState({currentPage:page});
  }
  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre , currentPage: 1})
  }
  handleSort = sortColumn => {
    this.setState({sortColumn});
  }
  getPagedData = () => {
    const { pageSize,currentPage,selectedGenre,movies:allMovies,sortColumn} = this.state;
    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted= _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
    const movies = paginate(sorted,currentPage,pageSize);
    return { totalCount : filtered.length,data:movies};
  } 
  render() {
    const { length: count } = this.state.movies;
    const { pageSize,currentPage,sortColumn} = this.state;
    if (count === 0)
      return (
        <div>
          <span>There are no movies in the database </span>
          <button
            onClick={() => this.handleReset()}
            className="btn btn-warning m-2"
          >
            Reset
          </button>
        </div>
    );
    const {totalCount , data:movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
        <span>Showing {totalCount} movies in the database </span>
        <button
          onClick={() => this.handleReset()}
          className="btn btn-warning m-2"
        >
          Reset
        </button>
        <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleClick} onDelete={this.handleDelete} onSort={this.handleSort} />
        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Movies;
