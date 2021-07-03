import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card border="dark" style={{ width: '15 rem', height: '62rem', margin: '5 rem' }} >
        <Card.Img variant="top" rounded="true" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title style={{fontSize: 28}}>{movie.Title}</Card.Title>

          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-secondary">See More</Button>
          </Link>
          </Card.Body>
      </Card>
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