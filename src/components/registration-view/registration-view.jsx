import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({}); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://andrasbanki-myflixapp.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
    console.log(username, password, email, birthday);
    props.onRegisterIn(username);
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = 'Username must be at least 5 characters';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordMissing = 'Password is required';
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordError.passwordMissing = 'Password must be at least 5 characters';
    }

    if (!email.includes('.') && !email.includes('@')) {
      emailError.notEmail = 'Enter a valid email';
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        < Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      {Object.keys(usernameError).map((key) => {
        return (
          <div className ='alert' style={{ color: "red" }} key={key} >
            {usernameError[key]}
          </div>
        );
      })}
      <Form.Group controlId="formPassword">
         <Form.Label>Password:</Form.Label>
         <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      {Object.keys(passwordError).map((key) => {
        return (
          <div className ='alert' style={{ color: "red" }} key = {key}>
            {passwordError[key]}
          </div>
        );
      })}
      <Form.Group controlId="formGridEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      {Object.keys(emailError).map((key) => {
        return (
          <div className ='alert' style={{ color: "red" }} key={key}>
            {emailError[key]} 
          </div>
        );
      })}
      <Form.Group controlId="date">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      
      <Button variant="outline-secondary" type="submit" onClick={handleSubmit}>Register</Button>
      <div>
        <span>If you already have an account: </span>
        <Link to={`/`}>Login</Link>
      </div>
    </Form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onRegisterIn: PropTypes.func.isRequired,
};