import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://andrasbanki-myflixapp.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    /* then call props.onLoggedIn(username) */
    .then(response => {
      const data= response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="outline-secondary" type="submit" onClick={handleSubmit}>Submit</Button>
      <div>
        <span>If you don't have an account yet: </span>
        <Link to={`/register`}>Sign up</Link>
      </div>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};