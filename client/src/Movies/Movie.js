import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = (event, id) => {
    event.preventDefault()

    window.confirm('Do you want to delete this forever?')
    console.log(this.state)
    const deleted = this.state.movie

    // this.setState(this.state.movie.filter(film => film.id !== id))

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(`Movie has been deleted.`)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
        this.setState([ ...this.state.movie, deleted])
      })
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div key={this.state.movie.id}>
          <Link to={`/update-movie/${this.state.movie.id}`} className='edit-button'>Edit</Link>
        </div>
        <div className='delete-button' onClick={(event) => this.handleDelete(event, this.state.movie.id)}>Delete</div>
      </div>
    );
  }
}
