import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >
        <Card.Img variant="top" rounded="true" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title style={{fontSize: 28}}>{movie.Title}</Card.Title>

          <Card.Text >{movie.Description}</Card.Text>
          <button onClick={() => { onBackClick(null);}}>Back</button>
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