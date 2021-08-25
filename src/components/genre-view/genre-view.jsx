import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {

  render() {
    const { genres } = this.props;

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >
        <Card.Body>
          <Card.Title style={{fontSize: 28}}>{genres.Name}</Card.Title>
          <Card.Text >{genres.Description}</Card.Text>
          <Link to ={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
