import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://andrasbanki-myflixapp.herokuapp.com/users/${user}` + "/favorites/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://andrasbanki-myflixapp.herokuapp.com/users/${user}` + "/favorites/" +
      this.props.movie._id,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        alert(this.props.movie.Title + " has been removed from your favorites!");
      })
  }

  showAddFavoritButton(movie, show) {
    if (show) { 
    return (
      <Link to={`/movies/${movie._id}`}>
        <Button variant="outline-success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
      </Link>
    )}
  }

  showRemoveFavoritButton(movie, show) {
    if (show) { 
    return (
      <Link to={`/movies/${movie._id}`}>
        <Button variant="outline-danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
      </Link>
    )}
  }

  render() {
    const { movie, showRemoveBtn, showAddBtn } = this.props;
    
  return (
    <Container>
      <Card border="dark" style={{ width: '12rem', height: '80rem' }} >
        <Card.Img variant="top" rounded="true" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title style={{fontSize: 28}}>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-secondary">See More</Button>
          </Link>
          {this.showAddFavoritButton(movie, showAddBtn)}
          {this.showRemoveFavoritButton(movie, showRemoveBtn)}
        </Card.Body>
      </Card>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};