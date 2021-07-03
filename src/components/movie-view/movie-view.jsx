import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {
  
  favoriteAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post('https://andrasbanki-myflixapp.herokuapp.com/users/${user}' + '/movies/' + this.props.movie._id, {},
      {headers: {Authorization: `Bearer ${token}`}}
    )
    .then((response) => {
      console.log(response);
      alert(this.props.movie.Title + ' has been added to your favorites!');
    });
  }

  favoriteRemove() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete('https://andrasbanki-myflixapp.herokuapp.com/users/${user}' + '/movies/' + this.props.movie._id, {},
      {headers: {Authorization: `Bearer ${token}`}}
    )
    .then((response) => {
      console.log(response);
      alert(this.props.movie.Title + ' has been removed from your favorites!');
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >

        <Card.Img variant="top" rounded="true" src={movie.imageUrl} />

        <Card.Body>

          <Card.Title style={{fontSize: 28}}>{movie.Title}</Card.Title>

          <Card.Text >{movie.Description}</Card.Text>

          <Link to ={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre._id}`}>
            <Button variant="link">Genre</Button>
          </Link>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" onClick={() => this.favoriteAdd(movie)}>Add to favorites</Button>
          </Link>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" onClick={() => this.favoriteRemove(movie)}>Remove from favorites</Button>
          </Link>

          <Button onClick={() => { onBackClick(null);}}>Back</Button>
          
        </Card.Body>

      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};