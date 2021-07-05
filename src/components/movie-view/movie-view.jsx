import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {
  
  render() {
    const { movie } = this.props;

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >

        <Card.Img variant="top" rounded="true" src={movie.imageUrl} />

        <Card.Body>

          <Card.Title style={{fontSize: 28}}>{movie.Title}</Card.Title>

          <Card.Text >{movie.Description}</Card.Text>

          <Link to ={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director: {movie.Director.Name}</Button>
          </Link>

          <Link to={`/genres/${movie.Genre._id}`}>
            <Button variant="link">Genre: {movie.Genre.Name} </Button>
          </Link>

          <Link to={'/'}>
            <Button variant="link">Home</Button>
          </Link>
          
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