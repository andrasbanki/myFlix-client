import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  render() {
    const { userData, users } = this.props; 

    return (
      <Card border="dark" style={{ width: '30 rem', height: '90rem', margin: '5 rem' }} >
        <Card.Body>

          <Card.Title style={{fontSize: 28}}>Username: </Card.Title>
          <Card.Text >{userData.Username}</Card.Text>

          <Card.Title style={{fontSize: 28}}>Email: </Card.Title>
          <Card.Text >{userData.Email}</Card.Text>

          <Card.Title>Birthday: </Card.Title>
          <Card.Text>{userData.Birthday}</Card.Text>

          <Card.Title>Favorite Movies: </Card.Title>
          <Link to={`/users/${userData.Username}`}>
            <Button variant="outline-secondary">Profile update</Button>
          </Link>
          <Link to ={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}