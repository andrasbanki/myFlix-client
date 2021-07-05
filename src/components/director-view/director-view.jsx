import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  render() {
    const { director } = this.props;

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >
        <Card.Body>
          <Card.Title style={{fontSize: 28}}>{director.Name}</Card.Title>
          <Card.Text >{director.Bio}</Card.Text>
          <Card.Text >{director.Birthday}</Card.Text>
          <Link to ={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}